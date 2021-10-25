"use strict";
const { constants, connect } = require("http2");
const { log, error } = require("console");

let Debug = true;
class fetcher {

    static options = {
        [constants.HTTP2_HEADER_SCHEME]: 'https',
        [constants.HTTP2_HEADER_METHOD]: constants.HTTP2_METHOD_GET,
        [constants.HTTP2_HEADER_PATH]: ''
    }

    static sleep(int) {
        return new Promise((resolve, error)=>{
            setTimeout(resolve,int)
        })
    }

    static parseURLtoPath(url){
        if(Debug) log(`[LN21 parser] ${url}\n`)
        url = new URL(url)

        let path = url.pathname+url.search;

        if(url.host.match(/\.to/)){
            if(path.match(/search/)) path = `/${path.replace(/\//g,'')}`
        }

        return path;
    }

    static retry(client){
        return new Promise((resolve, error)=>{
            let str='', status;
            client.request(this.options)
                // only for the 429 req
                .on('response',async res=>{
                    status = res[':status'];
                    if(Debug) log(`[LN40 parser] retry: ${status}`)
                    if(status > 300 && status < 400) {
                        this.options[constants.HTTP2_HEADER_PATH] = res.location;
                        resolve(await this.retry(client))
                    }
                })
                // continues
                .on('data', chunk=>{ str += chunk })
                .on('end', ()=>{
                    if(status == 200) {
                        if(Debug) log(`[LN50 parser] fetch-retry: success`)
                        resolve(str.replace('undefined',''))
                    }
                }).end()
        })
    }

    static fetcher(url, client){
        let path = this.parseURLtoPath(url),
        str, status;
        this.options[constants.HTTP2_HEADER_PATH] = path;

        return new Promise((resolve, error)=>{

            if(!client) error("ERROR: No connection is made")
            client.request(this.options)
                .on('response',async header=>{
                    status = header[':status']
                    if(Debug) log(`[LN68 parser] fetch: ${status}`)

                    if(status == 404) throw(`No results were found!`)
                    // too much request will make it wait
                    // I'm still thinking to add a proxy
                    if(status > 410) {
                        await this.sleep(header[':retry-after'])
                        resolve(await this.retry(client))
                    }
                    // follow-redirects
                    if(status > 300 && status < 400) {
                        this.options[constants.HTTP2_HEADER_PATH] = header.location.replace('https://nhentai.to','');
                        resolve(await this.retry(client))
                    }
                })
                .setEncoding('utf8')
                .on('data', chunk=>{ str += chunk })
                .on('end', ()=>{
                    if(status == 200) {
                        if(Debug) log(`[LN87 parser] fetch: success`)
                        resolve(str.replace('undefined',''))
                    }
                }).end()
        })
    }
}

class Matcher extends fetcher {

    static bookThumbRegex = /<img.*data-src="(?<thumbs>.*?)".*?src=".*?" \/>/
    static bookTimeRegex = /<time (.*)>(?<date>.*)<\/time>/
    static errorRegex = /<h2>[0|No] [r|R]esults/

    // universal holy shit
    static kageBunshinJustu(html){
        let time = html.match(this.bookTimeRegex).groups['date']
        let thumbnail = html.match(this.bookThumbRegex).groups['thumbs']
        let img_source = thumbnail.replace("/cover.jpg",'')
        return {time, thumbnail, img_source}
    }

    //nhentai.net
    static async BOOKInfoMatcherNET(url, client){
        let html = await this.fetcher(url, client)
        // if(Debug) log(`[LN112 parser]: `,html)
        let body = JSON.parse(JSON.parse(`"${ html.match(/JSON\.parse\((.*)\)/)[0].replace(/JSON\.parse\("/g,'').slice(0,-2)}"`))
        let {time, img_source, thumbnail} = this.kageBunshinJustu(html)
        return { body, time, img_source, thumbnail }
    }
    static async PAGEInfoMatcherNET(url, client){
        let html = await this.fetcher(url, client)
        let totalPage
        // avoid getting error if the results have only 1 page
        try{
            totalPage = html.match(/\?page=(.*?)"/g).slice(-1)[0].replace(/\D+/g,'').slice(1)
        } catch(e) {
            totalPage = 1
        }
        let body = html.match(/<div class="gallery".*?data-tags="(.*?)"><a href="\/g\/(.*?)\/".*?data-src="(.*?)".*?caption">(.*?)</g)
        return {body, totalPage}
    }
    
    //nhentai.to
    static async BOOKInfoMatcherTO(url, client){
        let html = await this.fetcher(url, client)
        let body = JSON.parse(html.replace(/[\n|\r]+|  +/g,' ').match(/N\.gallery\({.*}\)/)[0].replace(/N\.gallery\(/,'').slice(0,-5)+"}")
        let {time, img_source, thumbnail} = this.kageBunshinJustu(html)
        return { body, time, img_source, thumbnail }
    }
    static async PAGEInfoMatcherTO(url, client){
        let html = await this.fetcher(url, client)
        let totalPage
        try{
            totalPage = html.replace(/[\n|\r]+|\B\s+|\s+\B/g,' ').match(/<\/i><\/a>.*<a href=".*?page=(.*?)"/)[0].replace(/\D+/g,'')
        } catch(e) {
            totalPage = 1
        }
        let body = html.replace(/[\n|\r]+|\B\s+|\s+\B/g,' ').match(/<div class="gallery" data-tags="(.*?)".*?href="\/g\/(.*?)\/".*?src="(.*?)".*?">(.*?)</gs)
        return {body, totalPage}
    }

}

class Parser extends Matcher {

    static tagRegex = /https:\/\/nhentai\.(to|net)|\/language|\/tag|\/character|\/artist|\/parody|\/group|\/category|\//g
    static URLregex = /language\/.*|tag\/.*|character\/.*|artist\/.*|parody\/.*|group\/.*|category\/.*|(search\/|search\?q=).*|\?q=.*/
    static blockedRegex = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/

    static async book(url, client,userString, IgnoreNone, blockedWords, IsDiscord, RRoF){
        let text;
        if (blockedWords) {
            if (typeof (blockedWords) === "number") throw `ERROR: 'blockedWords' cannot contain such numbers, It must contain strings.`
            blockedWords = blockedWords.split(/ |,/g).filter(n=>n) // lol
            this.blockedRegex = new RegExp(this.blockedRegex.source.replace("|loli", `|loli|${blockedWords.join("|")}`));
        }

        let data = ''
        let Time, img_Source, Thumbnail;

        // I know I made it worst but its better than the old one
        if(/\.net/.test(url)){
            //.NET
            try{
                const { body, time, img_source, thumbnail } = await this.BOOKInfoMatcherNET(url, client)
                data = body
                Time = time
                img_Source = img_source
                Thumbnail = thumbnail
            } catch(e){
                log(`[LN178 parser] FAILED`)
                return e
            }
        } else {
            //.TO
            try{
                const { body, time, img_source, thumbnail } = await this.BOOKInfoMatcherTO(url, client)
                data = body
                Time = time
                img_Source = img_source
                Thumbnail = thumbnail
            } catch(e){
                return e
            }
        }

        let parodies='',chr='',tags='',Artist='',Groups='',Lang='',Ctg=''

        for(let i=0;i < data.tags.length;i++){
            switch(data.tags[i].type){
                case "tag":
                    tags += `${data.tags[i].name}, `;
                    if (IsDiscord) {
                        if (this.blockedRegex.test(tags) || this.blockedRegex.test(userString)) {
                            text = "DISCORD ToS: The doujin picked has a Tag that isn't allowed on Discord\n";
                            if (RRoF && this.blockedRegex.test(userString)) text = "DISCORD ToS: REROLL DENIED\n";
                        }
                        if (text) throw text;
                    };
                 break;
                case "charachter":
                    chr += `${data.tags[i].name}, `;
                 break;
                case "parody":
                    parodies += `${data.tags[i].name}, `;
                 break;
                case "artist":
                    Artist += `${data.tags[i].name}, `;
                 break;
                case "language":
                    Groups += `${data.tags[i].name}, `;
                 break;
                case "category":
                    Lang += `${data.tags[i].name}, `;
                 break;
                case "group":
                    Ctg += `${data.tags[i].name}, `;
                 break;
            }
        }

        if(parodies) parodies = parodies.slice(0,-2)
        if(chr) chr = chr.slice(0, -2)
        if(tags) tags = tags.slice(0, -2)
        if(Artist) Artist = Artist.slice(0, -2)
        if(Groups) Groups = Groups.slice(0, -2)
        if(Lang) Lang = Lang.slice(0, -2)
        if(Ctg) Ctg = Ctg.slice(0, -2)

        if(/random/.test(url)) url = url.replace('random','g/')+data.id

        let list =  {
            id: data.id,
            url: url,
            title: {
                origin: data.title.japanese.replace(/\[.*?\]|\(.*?\)/g,'').trim(),
                translated: data.title.english.replace(/\[.*?\]|\(.*?\)/g,'').trim(),
                originFull: data.title.japanese,
                translatedFull: data.title.english
            },
            images: {
                cover: Thumbnail,
                pages_source: img_Source,
                pages: (page)=>{
                    if(page > pages) return `That page doesn't exist!\n The total pages are only '${pages}'`
                    return `${img_Source}/${page}.jpg`
                }
            },
            tag_table: {
                parodies: parodies || 'none',
                characters: chr || 'none',
                tag: tags || 'none',
                artist: Artist || 'none',
                groups: Groups || 'none',
                languages: Lang || 'none',
                categories: Ctg || 'none',
            },
            favorites: data.num_favorites||'none',
            number_pages: data.num_pages,
            uploaded: Time
        }

        if(IgnoreNone) {
            for(let keys of Object.entries(list)){
                if(typeof(keys[1]) === "object") {
                    for(let yet of Object.entries((eval(`list.${keys[0]}`)))){
                        if(yet[1] == "none") eval(`delete list.${keys[0]}.${yet[0]}`)
                    }
                }
            }
        }

        return list

    }

    static async page(page, url, client){
        if(!page||page==0) page = 1
        let data, totalpage
        let pageURL= `${url}?page=${page}`
        if(/search/.test(url)) pageURL = `${url}&page=${page}`
        if(Debug) log(pageURL)
        if(/\.net/.test(url)){
            //.NET
            try{
                const {body, totalPage} = await this.PAGEInfoMatcherNET(pageURL, client)
                data = body; totalpage = +totalPage
            } catch(e){
                return e
            }
        } else {
            //.TO
            try{
                const {body, totalPage} = await this.PAGEInfoMatcherTO(pageURL, client)
                data = body; totalpage = +totalPage
            } catch(e){
                return e
            }
        }

        let list = [
            {
                CurrentUrl: url,
                typePage: 'homepage',
                CurrentPage: page,
                Total: data.length,
                TotalPage: totalpage
            }
        ]
        
        data.forEach(element => {
            let id = +element.match(/href="\/g\/(.*?)\/"/)[1]
            let Lang = element.match(/data-tags="(.*?)"/)[1].split(' ')
            let languages = ''

            //searches for languages
            Lang.forEach(elem =>{
                if(/\.net/.test(url)){
                    switch(elem){
                        case "6346": languages += 'japansese, ';
                            break;
                        case "29963": languages += 'chinese, ';
                            break;
                        case "12227": languages += 'english, ';
                            break;
                        case "17249": languages += 'translated, ';
                            break;
                    }
                } else {
                    switch(elem){
                        case "2": languages += 'japansese, ';
                            break;
                        case "10197": languages += 'chinese, ';
                            break;
                        case "19": languages += 'english, ';
                            break;
                        case "17": languages += 'translated, ';
                            break;
                    }
                }
            })

            list.push(
                {
                    id: id,
                    title: element.match(/caption">(.*?)</)[1],
                    thumbnail: element.match(/data-src="(.*?)"/)[1] ,
                    url: `${url.replace(this.URLregex,'')}g/${id}`,
                    languages: languages.slice(0,-2)
                }
            )
        });

        let tags = ['language','tag','character','artist','parody','group','category']
        for(let i=0;i<tags.length;i++){
            if(new RegExp(tags[i]).test(url)) list[0].typePage = `${tags[i]} / ${url.replace(this.tagRegex,'')}`
        }
        if(/search/.test(url)) list[0].typePage = 'search / '+url.replace(/https:\/\/nhentai\.(to|net)\/search|\?q=|\/|&/g,'')

        return list;
    }
};


//#region 
// (async()=>{            //Debug PURPOSE
    // let client = connect('https://nhentai.to');
//     log(await Parser.page(1,'https://nhentai.net/search/?q=astolfo/&page=1',client))
//     client.close()

    // let client = connect('https://nhentai.to');
    // log(await Parser.page(1,'https://nhentai.to/character/astolfo',client))
    // client.close()
// })();
//#endregion 

module.exports = Parser