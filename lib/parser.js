"use strict";
const { constants } = require("http2");

class fetcher
{
    // Options for the request.
    static options =
    {
        [constants.HTTP2_HEADER_SCHEME]: "https",
        [constants.HTTP2_HEADER_METHOD]: constants.HTTP2_METHOD_GET,
        [constants.HTTP2_HEADER_PATH]: ""
    }

    // If request is too fast It will sleep based on the "retry-after".
    static sleep(int)
    {
        return new Promise((resolve) =>
        {
            setTimeout(resolve, int);
        })
    }

    // Parse the url into object.
    static parseURLtoPath(url)
    {
        let parsedURL = new URL(url);
        let path = parsedURL.pathname + parsedURL.search;

        if (parsedURL.host.match(/\.to/))
        {
            if (path.match(/search/)) path = `/${path.replace(/\//g, "")}`;
        }

        return path;
    }

    // Retry the request or when Redirect occurs.
    static retry(client)
    {
        return new Promise((resolve) =>
        {
            let str = "";
            let status = "";
            
            client.request(this.options).
                on("response", async (res) =>
                {
                    status = res[":status"];
                    
                    if (status > 410)
                    {
                        await this.sleep(res[":retry-after"]);
                        resolve(await this.retry(client));
                    }

                    if (status > 300 && status < 400)
                    {
                        this.options[constants.HTTP2_HEADER_PATH] = res.location;
                        resolve(await this.retry(client));
                    }

                }).
                setEncoding("utf8").
                on("data", (chunk) =>
                {
                    str += chunk;
                }).
                on("end", ()=>
                {
                    if (status == 200)
                    {
                        resolve(str.replace("undefined", ""));
                    }
                }).end();
        })
    }

    // Request / Fetch
    static fetcher(url, client)
    {
        let path = this.parseURLtoPath(url);
        let str = "";
        let status = "";

        this.options[constants.HTTP2_HEADER_PATH] = path;

        return new Promise((resolve, error) =>
        {
            if (!client) error("ERROR: No connection is made");
            
            client.request(this.options).
                on("response", async (header) =>
                {
                    status = header[":status"];

                    if (status == 404) error("No Results were found!");
                    if (status > 410)
                    {
                        await this.sleep(header[":retry-after"]);
                        resolve(await this.retry(client));
                    }                   
                    if (status > 300 && status < 400)
                    {
                        this.options[constants.HTTP2_HEADER_PATH] = header.location.replace('https://nhentai.to', '');
                        resolve(await this.retry(client));                           
                    }
                }).
                setEncoding("utf8").
                on("data", (chunk) =>
                {
                    str += chunk;
                }).
                on("end", () =>
                {
                    if (status == 200)
                    {
                        resolve(str.replace("undefined", ""));
                    }
                }).end();
        });
    }
}

class Matcher extends fetcher
{
    static bookThumbRegex = /<img.*data-src="(?<thumbs>.*?)".*?src=".*?" \/>/;
    static bookTimeRegex = /<time (.*?)>(?<date>.*)<\/time>/;
    static errorRegex = /<h2>(0|No) [r|R]esults/;

    // KageBunshin or Shadow Clone.. It should be clone only ffs
    // the function exist because few properties are the same / clone hehe get it? im bad at jokes.
    static kageBunshinJutsu(html)
    {
        let time = html.match(this.bookTimeRegex).groups.date;
        let thumbnail = html.match(this.bookThumbRegex).groups.thumbs;
        let img_source = thumbnail.replace("/cover.jpg", "");

        return {
            time,
            thumbnail,
            img_source
        }
    }

    // Nhentai.net
    static async BOOKInfoMatcherNET(url, client)
    {
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

    // Nhentai.to
    static async BOOKInfoMatcherTO(url, client) 
    {
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
    static async PageInfoMatcher(url, client)
    {
        let html = await this.fetcher(url, client);
        let body = html.match(/<div class="gallery".*?caption">.*?</gs);
        let totalPage = '';

        if (html.match(this.errorRegex)) throw `No results were found`;
        
        try
        {
            totalPage = html.match(/page=(?<page>.*?)"/g).slice(-1)[0].replace(/\D+/g,'');
        }
        catch (e)
        {
            totalPage = 1;
        }

        return {
            body,
            totalPage
        }
    }
}

class Parser extends Matcher
{
    static tagRegex = /https:\/\/nhentai\.(to|net)|\/language|\/tag|\/character|\/artist|\/parody|\/group|\/category|\//g;
    static URLregex = /language\/.*|tag\/.*|character\/.*|artist\/.*|parody\/.*|group\/.*|category\/.*|(search\/|search\?q=).*|\?q=.*/;
    static blockedRegex = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/;

    static async book(url, client, options)
    {
        let Artist = "none";
        let blockedWords = "";
        let chr = "none";
        let Ctg = "none";
        let data = "";
        let Groups = "none";
        let IgnoreNone = false;
        let img_source = "";
        let includeBottom = false;
        let IsDiscord = "";
        let Lang = "none";
        let parodies = "none";
        let RRoF = false;
        let tags = "none";
        let text = "";
        let Thumbnail = "";
        let Time = "";
        let userString = "";

        if (options)
        {
            userString = options.search;
            IgnoreNone = options["Ignore None"];
            blockedWords = options["Censored Words"];
            IsDiscord = options.Discord;
            RRoF = options["ReRoll on fail"];
            includeBottom = options["Include More"]
        }

        if (blockedWords)
        {
            if (typeof (blockedWords) === "number") throw `ERROR: 'blockedWords' cannot contain such numbers, It must contain strings.`;

            blockedWords = blockedWords.split(/ |,/g).filter((n)=>n);
            this.blockedRegex = new RegExp(this.blockedRegex.source.replace("|loli", `|loli|${blockedWords.join("|")}`));
        }

        try
        {
            let book = "";

            if (/\.net/.test(url))
            {
                book = await this.BOOKInfoMatcherNET(url, client);
            } else 
            {
                book = await this.BOOKInfoMatcherTO(url, client);
            }
            
            data = book.body;
            Time = book.time;
            img_source = book.img_source;
            Thumbnail = book.thumbnail;
        } catch (e)
        {
            return e;
        }

        for (let i = 0; i < data.tags.length; i++)
        {
            let value = `${data.tags[i].name}`;
            switch (data.tags[i].type)
            {
                case "tag":
                    if(tags == "none")
                    {
                        tags = value;
                    }
                    else tags += `, ${value}`;

                    if (IsDiscord)
                    {
                        if (this.blockedRegex.test(tags) || this.blockedRegex.test(userString))
                        {
                            text = "DISCORD ToS: The doujin picked has a Tag that isn't allowed on Discord\n";

                            if (RRoF && this.blockedRegex.test(userString)) text = "DISCORD ToS: REROLL DENIED\n";
                        }

                        if (text) throw text;
                    }
                    break;
                case "character":
                    if(chr == "none")
                    {
                        chr = value;
                    }
                    else chr += `, ${value}`;
                    break;
                case "parody":
                    if(parodies == "none")
                    {
                        parodies = value;
                    }
                    else parodies += `, ${value}`;
                    break;
                case "artist":
                    if(Artist == "none")
                    {
                        Artist = value;
                    }
                    else Artist += `, ${value}`;
                    break;
                case "language":
                    if(Lang == "none")
                    {
                        Lang = value;
                    }
                    else Lang += `, ${value}`;
                    break;
                case "category":
                    if(Ctg == "none")
                    {
                        Ctg = value;
                    }
                    else Ctg += `, ${value}`;
                    break;
                case "group":
                    if(Groups == "none")
                    {
                        Groups = value;
                    }
                    else Groups += `, ${value}`;
                    break;
            }
        }

        if (/random/.test(url)) url = url.replace('random', 'g/') + data.id

        let list =
        {
            id: data.id,
            url: url,
            title:
            {
                origin: data.title.japanese.replace(/\[.*?\]|\(.*?\)/g, '').trim(),
                translated: data.title.english.replace(/\[.*?\]|\(.*?\)/g, '').trim(),
                originFull: data.title.japanese,
                translatedFull: data.title.english
            },
            images:
            {
                cover: Thumbnail,
                pages_source: img_source,
                pages: (page) =>
                {
                    if (page > data.num_pages) return `That page doesn't exist!\n The total pages are only '${data.num_pages}'`
                    return `${img_source.replace("t.nhentai", "i.nhentai")}/${page}.jpg`
                }
            },
            tag_table:
            {
                parodies: parodies,
                characters: chr,
                tag: tags,
                artist: Artist,
                groups: Groups,
                languages: Lang,
                categories: Ctg
            },
            favorites: data.num_favorites,
            number_pages: data.num_pages,
            uploaded: Time,
            MoreLikeThis: ''
        }

        if (IgnoreNone)
        {
            for (let keys of Object.entries(list))
            {
                if (typeof (keys[1]) === "object")
                {
                    for (let yet of Object.entries(list[keys[0]]))
                    {
                        if (yet[1] == "none") delete list[keys[0]][yet[0]];
                    }
                }
            }
        }

        if (includeBottom && /\.net/.test(url))
        {
            const page = await this.page(1, url, client);
            list.MoreLikeThis = page;
        }

        return list;
    }

    static async page(page, url, client)
    {
        if (!page || page == 0) page = 1;

        let pageURL = `${url}?page=${page}`;

        if (/search/.test(url)) pageURL = `${url}&page=${page}`
        
        let PageInfo = await this.PageInfoMatcher(pageURL, client);
        let data = PageInfo.body;
        let totalpage = +PageInfo.totalPage;

        let tags = [
            'language', 
            'tag', 
            'character', 
            'artist', 
            'parody', 
            'group', 
            'category'
        ]

        let list = [
            {
                CurrentUrl: url,
                typePage: 'homepage',
                CurrentPage: page,
                Total: data.length,
                TotalPage: totalpage
            }
        ]

        data.forEach((element) =>
        {
            let id = +element.match(/href="\/g\/(.*?)\/"/)[1];
            let Lang = element.match(/data-tags="(.*?)"/)[1].split(' ');
            let languages = '';

            Lang.forEach((elem) =>
            {
                if (/\.net/.test(url))
                {
                    switch (elem)
                    {
                        case "6346": languages += 'japaneses, ';
                            break;
                        case "29963": languages += 'chinese, ';
                            break;
                        case "12227": languages += 'english, ';
                            break;
                        case "17249": languages += 'translated, ';
                            break;
                    }
                } else
                {
                    switch (elem)
                    {
                        case "2": languages += 'japaneses, ';
                            break;
                        case "10197": languages += 'chinese, ';
                            break;
                        case "19": languages += 'english, ';
                            break;
                        case "17": languages += 'translated, ';
                            break;
                    }
                }
            });

            list.push(
            {
                id: id,
                title: element.match(/caption">(.*?)</)[1],
                thumbnail: element.match(/data-src="(.*?)"/)[1],
                url: `${url.replace(this.URLregex, '')}g/${id}`,
                languages: languages.slice(0, -2)
            });
        });

        for (let i = 0; i < tags.length; i++)
        {
            if (new RegExp(tags[i]).test(url)) list[0].typePage = `${tags[i]} / ${url.replace(this.tagRegex, '')}`;
        }

        if (/search/.test(url)) list[0].typePage = 'search / ' + url.replace(/https:\/\/nhentai\.(to|net)\/search|\?q=|\/|&/g, '');

        return list;
    }
}
module.exports = Parser;