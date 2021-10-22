"use strict";
const { constants } = require('http2')
const { performance } = require('perf_hooks');
const { load } = require('cheerio');
const { log, error } = require('console');

    // DEBUG
    /**************/
    /****/  let Debug = false;
    /****/
    /****/  function debugIteration(string, start){
    /****/      if(Debug) log(string, +start.toFixed(2))
    /****/  }
    /**************/

class Request {

    static fetcher(url, client) {
        return new Promise((response, error)=>{
            let options = {
                [constants.HTTP2_HEADER_SCHEME]: "https",
                [constants.HTTP2_HEADER_METHOD]: constants.HTTP2_METHOD_GET,
                [constants.HTTP2_HEADER_PATH]:''
            };
            
            url = new URL(url)
            
            let str,status,SearchUrl = '';

            SearchUrl = url.pathname+url.search
            if(/\.to/.test(url.host)){
                // for nhentai.to
                options[constants.HTTP2_HEADER_PATH] = `/${SearchUrl.replace('/','')}`
            } else options[constants.HTTP2_HEADER_PATH] = SearchUrl
            if(!client) error("ERROR: No connection is made")

            client.request(options)
                .on('response', headers=>{
                    status = headers[":status"]
                    if(headers[":status"] > 300 && headers[":status"] < 400){
                        let NewLocation = headers.location.replace("https://nhentai.to/",'')
                        options[constants.HTTP2_HEADER_PATH] = `/${NewLocation}`
                        client.request(options)
                            .setEncoding('utf8')
                            .on('data', chunk => { 
                                str += chunk 
                            })
                            .on('end',()=>{
                                response(str.replace('undefined',''))
                            })
                            .end()
                    }
                })
                .setEncoding('utf8')
                .on('data', chunk => { str += chunk })
                .on('end',()=>{
                    if(status == 200){
                        response(str.replace('undefined',''))
                    }
                })
                .end()
        })
    }
}


class Parser extends Request{

    static async Shorter(url, IsDiscord, RRoF, userString, blockedWords, IgnoreNone, client){
        const data = await this.fetcher(url, client), $ = load(data),
        getText = (...param) => { return $(...param).text() }

        //#region burh WHAT THE FUCK
        let IsTo = false
        ,tags = ''
        ,title = ''
        ,titleoc = ''
        ,titleFull = ''
        ,titleocFull = ''
        ,cover = ''
        ,parodies = ''
        ,Lang = ''
        ,Ctg = ''
        ,Artist = ''
        ,chr = ''
        ,Groups = ''
        ,pages = ''
        ,dateUploaded = ''
        ,thumbs = ''
        ,tagenum = 1
        ,Ctgnum = 1
        ,parodiesnum = 1
        ,Langnum = 1
        ,chrnum = 1
        ,Artistnum = 1
        ,Groupsnum = 1
        ,thumbsnum = 1
        ,IntArrayTag = 1
        ,IntArray = 0
        ,text = ''
        ,regex = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/
        ,LoopArrayParameter = ['parodiesnum', 'parodies', 'chrnum', 'chr', 'tagenum', 'tags', 'Artistnum', 'Artist', 'Groupsnum', 'Groups', 'Langnum', 'Lang', 'Ctgnum', 'Ctg', 'end', 'end']; 
        //#endregion
    
        IsTo = /nhentai\.to/.test(url);

        if (blockedWords) {
            if (typeof (blockedWords) === "number") throw `ERROR: 'blockedWords' cannot contain such numbers, It must contain strings.`
            blockedWords = blockedWords.split(/ |,/g).filter(n=>n) // lol
            regex = new RegExp(regex.source.replace("|loli", `|loli|${blockedWords.join("|")}`));
        }

        // tag table
        for(;;) {
            if(LoopArrayParameter[IntArray] == 'end'){
                let setVar = 0;
                for(;;) {
                    if(LoopArrayParameter[setVar+1] == 'end') break;
                    eval(LoopArrayParameter[setVar+1] + "= eval(LoopArrayParameter[setVar+1]+\".slice(0,-2)||'none'\")")
                    setVar += 2
                }
                break;
            }

            if(LoopArrayParameter[IntArray] == 'Artistnum') {
                if (IsDiscord) {
                    if (regex.test(tags) || regex.test(userString)) {
                        text = "DISCORD ToS: The doujin picked has a Tag that isn't allowed on Discord\n";
                        if (RRoF && regex.test(userString)) text = "DISCORD ToS: REROLL DENIED\n";
                    }
                    if (text) throw text;
                }
            }

            for (;eval(LoopArrayParameter[IntArray]) < $(`section#tags>div:nth-child(${IntArrayTag})>span>a`).length + 1;) {
                if(!IsTo){
                    eval(LoopArrayParameter[IntArray + 1] + ' += `${getText(`section#tags>div:nth-child(${IntArrayTag})>span>a:nth-child(${eval(LoopArrayParameter[IntArray])})>span.name`)}, `');
                } else {
                    eval(LoopArrayParameter[IntArray + 1] + ' += `${getText(`section#tags>div:nth-child(${IntArrayTag})>span>a:nth-child(${eval(LoopArrayParameter[IntArray])})`)}, `');
                }
                eval(LoopArrayParameter[IntArray] + '++');
            }
            IntArrayTag += 1; IntArray += 2
        }

        //#region Thumbnails, title, pages, upload
        if(!IsTo){
            thumbs = $(`div.thumbs>div:nth-child(1)>a>img`).attr('data-src').replace('1t.jp','.jp').replace("t.","i.")
            title = getText('div#info>h1>span.pretty');
            titleoc = getText(`div#info>h2>span.pretty`);
            pages = getText(`section#tags>div:nth-child(8)>span>a`);
            dateUploaded = getText(`section#tags>div:nth-child(9)>span`);
        } else {
            thumbs = $('div.thumb-container:nth-child(1)>a>img').attr("data-src")||$(`div.thumb-container:nth-child(1)>a>img`).attr("src").replace("1t.jp",".jp")
            title = 'none'
            titleoc = 'none'
            pages = getText(`div#info>div:nth-child(4)`);
            dateUploaded = getText(`div#info>div:nth-child(5)>time`);
        }

        thumbs = thumbs.replace('undefined','');
    
        //Universal
        titleFull = getText('div#info>h1');
        titleocFull = getText(`div#info>h2`);
        cover = $('div[id="cover"]>a>img').attr('data-src')||$('div[id="cover"]>a>img').attr('src');

        //#endregion
        
        if (title == "404 - Not Found") {
            client.close()
            throw `ERROR: ID is not valid please try another ID!`;
        }
     
        let list =  {
            id: url.replace(/\D+/g,''),
            url: url,
            title: {
                origin: titleoc,
                translated: title,
                originFull: titleocFull,
                translatedFull: titleFull
            },
            images: {
                cover: cover,
                pages_source: thumbs.replace('.jpg',''),
                pages: (page)=>{
                    thumbs = thumbs.replace('.jpg','')
                    if(page > pages) return `That page doesn't exist!\n The total pages are only '${pages}'`
                    return `${thumbs}${page}.jpg`
                }
            },
            tag_table: {
                parodies: parodies,
                characters: chr,
                tag: tags,
                artist: Artist,
                groups: Groups,
                languages: Lang,
                categories: Ctg,
            },
            number_pages: pages,
            uploaded: dateUploaded
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

    static async homePage(page, url, client){
        let Newurl = `${url}?page=${page}`
        const data = await this.fetcher(Newurl,client), $ = load(data)
        let lang,title,thumbnail,total,list = []

        $(`div.index-container>div>a`).each((i,e)=>{
            lang = ''
            let Gotlang = e.parent.attribs['data-tags']
            //bruh help
            if(Gotlang.match(/\b6346 |\b 6346$/g) || Gotlang.match(/\b2 |\b 2$/g) && /\.to/.test(url)) lang += `japansese, `
            if(Gotlang.match(/\b29963 |\b 29963$/g)|| Gotlang.match(/\b10197 |\b 10197$/g) && /\.to/.test(url)) lang += `chinese, `
            if(Gotlang.match(/\b12227 |\b 12227$/g)|| Gotlang.match(/\b19 |\b 19$/g) && /\.to/.test(url)) lang += `english, `
            if(Gotlang.match(/\b17249 |\b 17249$/g)|| Gotlang.match(/\b17 |\b 17$/g) && /\.to/.test(url)) lang += `translated, `

            if(i == 0){
                list.push({
                    CurrentUrl: url.replace(/language\/.*|search\/.*|tag\/.*/,''),
                    typePage: 'homepage',
                    CurrentPage: page,
                    Total: total,
                    TotalPage: `${$(`section.pagination>a.last`).attr('href').replace(/\D+/g,'')}`
                })
            }

            for(let GetInfo of Object.entries(e.childNodes)){
                if(GetInfo[1].type == 'tag'){
                    if(GetInfo[1].name == 'div'){
                        if(GetInfo[1].children[0].data != undefined)
                            title = GetInfo[1].children[0].data
                    }
                    if(GetInfo[1].name == 'img'){
                        if(GetInfo[1].attribs['data-src'] != undefined)
                            thumbnail = GetInfo[1].attribs['data-src']
                    }
                }
            }

            list.push(
                {
                    id: +e.attribs.href.replace(/\D+/g,''),
                    title: title,
                    thumbnail: thumbnail,
                    url: `${url.replace(/language\/.*|search\/.*|tag\/.*/,'')}g/${e.attribs.href.replace(/\D+/g,'')}`,
                    languages: lang.slice(0,-2)
                }
            )
            lang = ""
            total = i+1
        })
        list[0].Total = total
        if(/language/.test(url)) list[0].typePage = 'language / '+url.replace(/https:\/\/nhentai\.(to|net)\/language|\//g,'')
        if(/search/.test(url)) list[0].typePage = 'search / '+url.replace(/https:\/\/nhentai\.(to|net)\/search|\?q=|\/|&/g,'')
        if(/tag/.test(url)) list[0].typePage = 'tag / '+url.replace(/https:\/\/nhentai\.(to|net)\/tag|\//g,'')
        return list;
    }
}

module.exports = {Parser}