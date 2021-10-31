"use strict";
const { constants, connect } = require("http2");
const { log } = require("console")

let Debug = false;
class fetcher {
    static options = {
        [constants.HTTP2_HEADER_SCHEME]: 'https',
        [constants.HTTP2_HEADER_METHOD]: constants.HTTP2_METHOD_GET,
        [constants.HTTP2_HEADER_PATH]: ''
    }
    static sleep(int) {
        /* istanbul ignore next */
        return new Promise((resolve) => {
            setTimeout(resolve, int);
        })
    }
    static parseURLtoPath(url) {
        /* istanbul ignore next */
        let parsedURL = new URL(url)
        let path = parsedURL.pathname + parsedURL.search;
        if (parsedURL.host.match(/\.to/)) {
            if (path.match(/search/)) path = `/${path.replace(/\//g, '')}`
        }
        return path;
    }
    static retry(client) {
        /* istanbul ignore next */
        return new Promise((resolve) => {
            let str = '';
            let status = '';
            client.request(this.options).
                on('response', async (res) => {
                    status = res[':status'];
                    if (Debug) log(`[LN32] fetch retry status: ${status}`);
                    if (status > 410) {
                        await this.sleep(res[':retry-after']);
                        resolve(await this.retry(client));
                    }
                    if (status > 300 && status < 400) {
                        this.options[constants.HTTP2_HEADER_PATH] = res.location;
                        resolve(await this.retry(client));
                    }
                }).
                setEncoding('utf8').
                on('data', (chunk) => { str += chunk }).
                on('end', () => {
                    if (status == 200) {
                        if (Debug) log(`[LN46] fetch retry success`);
                        resolve(str.replace('undefined', ''));
                    }
                }).end()
        })
    }
    static fetcher(url, client) {
        /* istanbul ignore next */
        let path = this.parseURLtoPath(url);
        let str = '';
        let status = '';
        this.options[constants.HTTP2_HEADER_PATH] = path;
        return new Promise((resolve, error) => {
            /* istanbul ignore next */
            if (!client) error("ERROR: No connection is made");
            client.request(this.options).
                on('response', async (header) => {
                    status = header[':status'];
                    if (Debug) log(`[LN62] fetch status: ${status}`);
                    if (status == 404) error(`No results were found!`);
                    if (status > 410) {
                        if (Debug) log(`[LN65] fetch status: RETRY-AFTER ${header[':retry-after']}`);
                        await this.sleep(header[':retry-after']);
                        resolve(await this.retry(client));
                    }
                    if (status > 300 && status < 400) {
                        this.options[constants.HTTP2_HEADER_PATH] = header.location.replace('https://nhentai.to', '');
                        resolve(await this.retry(client));
                    }
                }).
                setEncoding('utf8').
                on('data', (chunk) => { str += chunk }).
                on('end', () => {
                    if (status == 200) {
                        if (Debug) log(`[LN78] fetch success`);
                        resolve(str.replace('undefined', ''));
                    }
                }).end()
        })
    }
}
class Matcher extends fetcher {
    /* istanbul ignore next */
    static bookThumbRegex = /<img.*data-src="(?<thumbs>.*?)".*?src=".*?" \/>/;
    static bookTimeRegex = /<time (.*)>(?<date>.*)<\/time>/;
    static errorRegex = /<h2>(0|No) [r|R]esults/;
    static kageBunshinJutsu(html) {
    /* istanbul ignore next */
        let time = html.match(this.bookTimeRegex).groups.date;
        let thumbnail = html.match(this.bookThumbRegex).groups.thumbs;
        let img_source = thumbnail.replace("/cover.jpg", "");
        return {
            time,
            thumbnail,
            img_source
        }
    }
    // nhentai.net
    static async BOOKInfoMatcherNET(url, client) {
        /* istanbul ignore next */
        let html = await this.fetcher(url, client);
        let body = JSON.parse(JSON.parse(`"${html.match(/JSON\.parse\("(?<parse>.*)"\)/).groups.parse}"`));
        let { time, img_source, thumbnail } = this.kageBunshinJutsu(html)
        return {
            body,
            time,
            img_source,
            thumbnail
        }
    }
    // nhentai.to
    static async BOOKInfoMatcherTO(url, client) {
        /* istanbul ignore next */
        let html = await this.fetcher(url, client);
        let body = JSON.parse(html.replace(/[\r|\n]+| /g, '').match(/N\.gallery\((?<parse>.*?)\);/s).groups.parse.slice(0,-2)+"}");
        let { time, img_source, thumbnail } = this.kageBunshinJutsu(html);
        return {
            body,
            time,
            img_source,
            thumbnail
        }
    }
    //universal Page
    static async PageInfoMatcher(url, client) {
        /* istanbul ignore next */
        let html = await this.fetcher(url, client);
        if (html.match(this.errorRegex)) throw `No results were found`;
        let totalPage = '';
        try {
            totalPage = html.match(/page=(?<page>.*?)"/g).slice(-1)[0].replace(/\D+/g,'');
        } catch (e) {
            totalPage = 1;
        }
        let body = html.match(/<div class="gallery".*?caption">.*?</gs);
        return {
            body,
            totalPage
        }
    }
}
class Parser extends Matcher {
    static tagRegex = /https:\/\/nhentai\.(to|net)|\/language|\/tag|\/character|\/artist|\/parody|\/group|\/category|\//g
    static URLregex = /language\/.*|tag\/.*|character\/.*|artist\/.*|parody\/.*|group\/.*|category\/.*|(search\/|search\?q=).*|\?q=.*/
    static blockedRegex = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/
    static async book(url, client, options) {
        if (Debug) log(`[LN147] book is called`);
        // This is bruh momento, I hate this eslint but also fixes my shit problems
        let Artist = '';
        let blockedWords = '';
        let chr = '';
        let Ctg = '';
        let data = '';
        let Groups = '';
        let IgnoreNone = false;
        let img_source = '';
        let includeBottom = false;
        let IsDiscord = '';
        let Lang = '';
        let parodies = ''
        let RRoF = false;
        let tags = '';
        let text = '';
        let Thumbnail = '';
        let Time = '';
        let userString = '';
        if (options) {
            /* istanbul ignore if */
            userString = options.search;
            IgnoreNone = options["Ignore None"];
            blockedWords = options["Censored Words"];
            IsDiscord = options.Discord;
            RRoF = options["ReRoll on fail"];
            includeBottom = options["Include More"]
        }
        if (blockedWords) {
            /* istanbul ignore if */
            if (typeof (blockedWords) === "number") throw `ERROR: 'blockedWords' cannot contain such numbers, It must contain strings.`;
            blockedWords = blockedWords.split(/ |,/g).filter((n)=>n);
            this.blockedRegex = new RegExp(this.blockedRegex.source.replace("|loli", `|loli|${blockedWords.join("|")}`));
        }
        try {
            let book = '';
            if (/\.net/.test(url)) {
                book = await this.BOOKInfoMatcherNET(url, client);
            } else book = await this.BOOKInfoMatcherTO(url, client);
            data = book.body;
            Time = book.time;
            img_source = book.img_source;
            Thumbnail = book.thumbnail;
        } catch (e) {
            return e;
        }
        for (let i = 0; i < data.tags.length; i++) {
            /* istanbul ignore next */
            switch (data.tags[i].type) {
                case "tag":
                    tags += `${data.tags[i].name}, `;
                    if (IsDiscord) {
                        /* istanbul ignore if */
                        if (this.blockedRegex.test(tags) || this.blockedRegex.test(userString)) {
                            text = "DISCORD ToS: The doujin picked has a Tag that isn't allowed on Discord\n";
                            if (RRoF && this.blockedRegex.test(userString)) text = "DISCORD ToS: REROLL DENIED\n";
                        }
                        if (text) throw text;
                    }
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
            }
        }
        if (parodies) parodies = parodies.slice(0, -2);
        if (chr) chr = chr.slice(0, -2);
        if (tags) tags = tags.slice(0, -2);
        if (Artist) Artist = Artist.slice(0, -2);
        if (Groups) Groups = Groups.slice(0, -2);
        if (Lang) Lang = Lang.slice(0, -2);
        if (Ctg) Ctg = Ctg.slice(0, -2);
        if (/random/.test(url)) url = url.replace('random', 'g/') + data.id
        let list = {
            id: data.id,
            url: url,
            title: {
                origin: data.title.japanese.replace(/\[.*?\]|\(.*?\)/g, '').trim(),
                translated: data.title.english.replace(/\[.*?\]|\(.*?\)/g, '').trim(),
                originFull: data.title.japanese,
                translatedFull: data.title.english
            },
            images: {
                cover: Thumbnail,
                pages_source: img_source,
                pages: (page) => {
                    if (page > data.num_pages) return `That page doesn't exist!\n The total pages are only '${data.num_pages}'`
                    return `${img_source}/${page}.jpg`
                }
            },
            tag_table: {
                parodies: parodies || 'none',
                characters: chr || 'none',
                tag: tags || 'none',
                artist: Artist || 'none',
                groups: Groups || 'none',
                languages: Lang || 'none',
                categories: Ctg || 'none'
            },
            favorites: data.num_favorites || 'none',
            number_pages: data.num_pages,
            uploaded: Time
        }
        if (IgnoreNone) {
            for (let keys of Object.entries(list)) {
                if (typeof (keys[1]) === "object") {
                    for (let yet of Object.entries(list.keys[0])) {
                        if (yet[1] == "none") delete list.keys[0].yet[0];
                    }
                }
            }
        }
        if (includeBottom && /\.net/.test(url)) {
            const page = await this.page(1, url, client);
            list.MoreLikeThis = page;
        }
        if (Debug) log(`[LN266] return data from book`);
        return list;
    }
    static async page(page, url, client) {
        if (Debug) log(`[LN270] page is called`);
        if (!page || page == 0) page = 1;
        let pageURL = `${url}?page=${page}`;
        if (/search/.test(url)) pageURL = `${url}&page=${page}`
        let PageInfo = await this.PageInfoMatcher(pageURL, client);
        let data = PageInfo.body;
        let totalpage = +PageInfo.totalPage;
        let list = [
            {
                CurrentUrl: url,
                typePage: 'homepage',
                CurrentPage: page,
                Total: data.length,
                TotalPage: totalpage
            }
        ]
        data.forEach((element)=>{
            let id = +element.match(/href="\/g\/(.*?)\/"/)[1];
            let Lang = element.match(/data-tags="(.*?)"/)[1].split(' ');
            let languages = '';
            Lang.forEach((elem)=>{
                if (/\.net/.test(url)) {
                    switch (elem) {
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
                    switch (elem) {
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
            list.push({
                id: id,
                title: element.match(/caption">(.*?)</)[1],
                thumbnail: element.match(/data-src="(.*?)"/)[1],
                url: `${url.replace(this.URLregex, '')}g/${id}`,
                languages: languages.slice(0, -2)
            })
        });
        let tags = [
                'language', 
                'tag', 
                'character', 
                'artist', 
                'parody', 
                'group', 
                'category'
        ]
        for (let i = 0; i < tags.length; i++) {
            if (new RegExp(tags[i]).test(url)) list[0].typePage = `${tags[i]} / ${url.replace(this.tagRegex, '')}`;
        }
        if (/search/.test(url)) list[0].typePage = 'search / ' + url.replace(/https:\/\/nhentai\.(to|net)\/search|\?q=|\/|&/g, '');
        if (Debug) log(`[LN336] returning data from page`);
        return list;
    }
    
}
module.exports = Parser;

// Prototype / feature | KASU'S NHENTAI CLI
const process = require("process");
const help = `
nhentai [tag | code/ID] [options]

    options:
        --book          Set "Type" to book. (default
                        If no type setted)
        --page          Set "Type" to page. (Will default
                        if it detects the tags)
        --block         Add some filter?
                        (only work if --discord added).
        --dicord        enable discord. (Will stop the
                        process if a tag that is in
                        the list. Originally for
                        module. CLI is still a
                        prototype).
        --raw           show the full [Object].
                        (Not applicable on --page)
        --url           only https://nhentai.net
                        and https://nhentai.to are
                        accepted.
        help            show help.

    example for .net (book)
    nhentai 228922 --raw
    example for .to (book)
    nhentai 228922 --raw --url https://nhentai.to

    example for .net (page)
    nhentai tag/crossdresing --raw --page 1
    example for .to (page)
    nhentai characters/astolfo --raw --url https://nhentai.to --page 3
`;
(async()=>{
    let argument = process.argv.slice(2);
    if(/confirm|build/.test(argument)) {
        argument = argument.slice(1)
        if(argument == []) log(help)
    } else return log('must run on the shell'); // what am i doing lol. I know you'll remove this ffs
    if (argument[0] == "help") {
        log(help)
        process.exit(0)
    }
    if (argument.length) {
        let discord = false;
        let url = `https://nhentai.net`;
        let censored = "";
        let type = "";
        let page = 0;
        let raw = false;
        let input = "";
        // search for options
        argument.forEach((options,i)=>{
            switch(options){
                case "--book":
                    type = "book";
                    break;
                case "--page":
                    type = "page";
                    page = +argument[i+1]
                    break;
                case "--block":
                    censored = argument[i+1];
                break;
                case "--url":
                    url = argument[i+1];
                    if(!/https:\/\/nhentai\.(to|net)/.test(url)) {
                        log("Invalid url");
                        process.exit(1);
                    }
                    break;
                case "--raw":
                    raw = true;
                    break;
                case "--discord":
                    discord = true;
                    break;
                }
            })
        if (!type) {
            let ar = +argument.join().replace(/\D+/g,'');
            if (/[0-9]/.test(ar) & ar != 0){
                log('  ⚠️  "--type" not declared setting default: "book"')
                type = "book"
            } else {
                log('  ⚠️  "--type" not declared setting default: "page"')
                type = "page"
            }
        }
        if(type == "book") input = `${url}/g/${argument[0]}`;
            else input = `${url}/${argument[0]}`
        const client = connect(url);
        if (type == "book") {
            try{
                let resultBook = await Parser.book(input, client, {
                    "Censored Words": censored,
                    Discord: discord,
                })
                if (raw) {
                    log(resultBook)
                } else {
                    log(`
    ID:                 ${resultBook.id}
    🔗:                 ${resultBook.url}

    TITLE JAPANESE:     ${resultBook.title.originFull}
    TITLE ENGLISH:      ${resultBook.title.translatedFull}

    THUMBNAIL/COVER:    ${resultBook.images.cover}
    IMAGE SOURCE:       ${resultBook.images.page_source}

    PARODIES:           ${resultBook.tag_table.parodies}
    CHARACTERS:         ${resultBook.tag_table.characters}
    TAGS 🔞:            ${resultBook.tag_table.tag}
    ARTISTS:            ${resultBook.tag_table.artist}
    GROUPS:             ${resultBook.tag_table.groups}
    LANGUAGES:          ${resultBook.tag_table.languages}
    CATEGORIES:         ${resultBook.tag_table.categories}

    FAVORITES:          ${resultBook.favorites}
    📃:                 ${resultBook.number_pages}
    📅:                 ${resultBook.uploaded}
                    `)
                }
            } catch (e) {
                log('  ❗  Invalid ID')
                process.exit(1)
            }
        } else {
            if(raw) log('  ⚠️  "--page" declared! "--raw" is still wip on page command')
            try{
                let resultBook = await Parser.page(page, input, client)
                log(resultBook)
            } catch (e) {
                log('  ❗  Page number input is above the searched total pages!\n  ❗  Invalid input.')
                process.exit(1)
            }
        }
        client.close()
    }
})();