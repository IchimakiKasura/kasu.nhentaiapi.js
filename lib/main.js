const cheerio = require("cheerio")
const fetcher = require("./src/fetcher")
const shorter = require("./src/shorter")
const url = "https://nhentai.net/"

// i won't use the throw instead i'll use the console error :>
function randrange(int) {
    if (typeof (int) != 'number') console.error('input value is not an integer!');return Math.floor(Math.random()*int)+1
}

async function linkRandomizer(type,string,$){
    let web;
    try{
        web = cheerio.load(await fetcher(`${url}${type}/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/${type}/${string}/?page=`, "")))}`))
    } catch(err){
        web = cheerio.load(await fetcher(`${url}${type}/${string}/?page=1`))
    }
    return web(`div.index-container>div:nth-child(${randrange(parseInt(web("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
}

class main {
    constructor(){}

    getID(ID) {

        //transformation
        if (/[${url}g/]/.test(ID)) {
            ID = parseInt(ID.replace(`${url}g/`,""))
        } else {
            if (typeof (ID) != 'number') ID = parseInt(ID)
        }

        return {
            list: async (data = {}) => {
                return data(await shorter(ID))
            },
            json: async () => {
                let val = await shorter(ID)
                try{
                    return {
                        base: {
                            id: val.id,
                            url: val.url,
                            title: {
                                origin: val.title_original,
                                translated: val.title
                            },
                            images: {
                                cover: val.cover,
                                pages: val.page_pics
                            },
                            tag_table: {
                                parodies: val.parodies,
                                characters: val.characters,
                                tag: val.tags,
                                artist: val.artist,
                                groups: val.group,
                                languages: val.language,
                                categories: val.category,
                            },
                            number_pages: val.pages,
                            uploaded: val.uploaded
                        }
                    }
                } catch(e){
                    // Avoiding "Unhandled promise rejections" so It's not my code having problem its urs :D
                }
            }
        }
    }

    //generate ID only. An Existing doujin ID
    async pRandID(){
        const $ = cheerio.load(await fetcher(`${url}random/`))
        return $("#gallery_id").text().slice(1, 100)
    }

    //multiple arg use
    async pRandSpecificTags(string, data) {
        try{ string = string.replace(/ /g,"+") }catch(e){}
        const $ = cheerio.load(await fetcher(`${url}search/?q=${string}/`))
        if ($('div.index-container>h2').text() == "No results found") {
            console.error( `"${string}", No results!`)
        } else {
            let page;
            try{
                page = randrange(parseInt($("a[class='last']").attr("href").split("&")[1].replace("page=", "")))
            } catch(err){
                page = 1
            }
            const $2 = cheerio.load(await fetcher(`${url}search/?q=${string}&page=${page}`))
            const link = $2(`div.index-container>div:nth-child(${randrange(parseInt($2("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
            if (data == null) {
                return {
                    link: `${url}g/${link}`,
                    id: link
                }
            } else {
                return data(await shorter(link))
            }
        }
    }

    //one arg use | spelling sensitive
    async pRandTag(string, data) {
        string = string.replace(/ /g, "-")
        const $ = cheerio.load(await fetcher(`${url}tag/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            console.error( `"${string}", does not exist in the tag section!`)
        } else {
          const link = await linkRandomizer('tag',string,$)
            if (data == null) {
                return {
                    link: `${url}g/${link}`,
                    id: link
                }
            } else {
                return data(await shorter(link))
            }
        }
    }

    //one arg use | spelling sensitive
    async pRandParody(string, data) {
        string = string.replace(/ /g, "-")
        const $ = cheerio.load(await fetcher(`${url}parody/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            console.error( `"${string}", does not exist in the parodies section!`)
        } else {
            const link = await linkRandomizer('parody',string,$)
            if (data == null) {
                return {
                    link: `${url}g/${link}`,
                    id: link
                }
            } else {
                return data(await shorter(link))
            }
        }
    }

    //one arg use | spelling sensitive
    async pRandArtist(string, data) {
        string = string.replace(/ /g, "-")
        const $ = cheerio.load(await fetcher(`${url}artist/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            console.error( `"${string}", does not exist in the Artists section!`)
        } else {
            const link = await linkRandomizer('artist',string,$)
            if (data == null) {
                return {
                    link: `${url}g/${link}`,
                    id: link
                }
            } else {
                return data(await shorter(link))
            }
        }
    }

    //one arg use | spelling sensitive
    async pRandGroup(string, data) {
        string = string.replace(/ /g, "-")
        const $ = cheerio.load(await fetcher(`${url}group/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            console.error( `"${string}", does not exist in the Groups section!`)
        } else {
            const link = await linkRandomizer('group',string,$)
            if (data == null) {
                return {
                    link: `${url}g/${link}`,
                    id: link
                }
            } else {
                return data(await shorter(link))
            }
        }
    }

    async pRandom(data) {
        const $ = cheerio.load(await fetcher(`${url}random/`))
        const dataId = $("#gallery_id").text().slice(1, 100)
        if (!data) {
            return {
                link: `${url}g/${dataId}`,
                id: dataId
            }
        } else {
            return data(await shorter(dataId))
        }
    }

}

module.exports = main;