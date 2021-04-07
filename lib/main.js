const cheerio = require("cheerio")
const fetcher = require("./src/fetcher")
const shorter = require("./src/shorter")
const url = "https://nhentai.net/"

function randrange(int) {
    if (typeof (int) != 'number') {
        throw 'input value is not an integer!'
    }
    return Math.floor(Math.random() * int) + 1
}

module.exports = class main {
    constructor() { }

    getID(ID) {

        //transformation
        if (/[${url}g/]/.test(ID)) {
            ID = ID.replace(`${url}g/`, "")
            ID = parseInt(ID)
        } else {
            if (typeof (ID) != 'number') ID = parseInt(ID)
        }

        return {
            list: async (data = {}) => {
                return data(await shorter(ID))
            },
            json: async () => {
                let val = await shorter(ID)
                const json = {
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
                return json
            }
        }
    }

    //generate ID only. An Existing doujin ID
    async pRandID(int){
        const $ = cheerio.load(await fetcher(`${url}random/`))
        const dataId = $("#gallery_id").text().slice(1, 100)
        return dataId
    }

    //multiple arg use
    async pRandSpecificTags(string = '', data = {}) {
        const $ = cheerio.load(await fetcher(`${url}search/?q=${string}/`))
        if ($('div.index-container>h2').text() == "No results found") {
            throw `"${string}", No results!`
        } else {
            var page;
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
    async pRandTag(string = '', data = {}) {
        string = string.replace(/ /g, "-")
        const $ = cheerio.load(await fetcher(`${url}tag/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            throw `"${string}", does not exist in the tag section!`
        } else {
            const $2 = cheerio.load(await fetcher(`${url}tag/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/tag/${string}/?page=`, "")))}`))
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
    async pRandParody(string = '', data = {}) {
        string = string.replace(/ /g, "-")
        const $ = cheerio.load(await fetcher(`${url}parody/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            throw `"${string}", does not exist in the parodies section!`
        } else {
            const $2 = cheerio.load(await fetcher(`${url}parody/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/parody/${string}/?page=`, "")))}`))
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
    async pRandArtist(string = '', data = {}) {
        string = string.replace(/ /g, "-")
        const $ = cheerio.load(await fetcher(`${url}artist/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            throw `"${string}", does not exist in the Artists section!`
        } else {
            const $2 = cheerio.load(await fetcher(`${url}artist/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/artist/${string}/?page=`, "")))}`))
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
    async pRandGroup(string = '', data = {}) {
        string = string.replace(/ /g, "-")
        const $ = cheerio.load(await fetcher(`${url}group/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            throw `"${string}", does not exist in the Groups section!`
        } else {
            const $2 = cheerio.load(await fetcher(`${url}group/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/group/${string}/?page=`, "")))}`))
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

    async pRandom(data = {}) {
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