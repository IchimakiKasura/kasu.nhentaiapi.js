const cheerio = require("cheerio")
const fetcher = require("./src/fetcher")
const shorter = require("./src/shorter")
const randrange = require("./src/randrange")

module.exports = class main {
    constructor() { }

    getID(ID) {

        //transformation
        if (/[https://nhentai.net/g/]/.test(ID)) {
            ID = ID.replace("https://nhentai.net/g/", "")
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

    //multiple arg use
    async pRandSpecificTags(string = '', data = {}) {
        const $ = cheerio.load(await fetcher(`https://nhentai.net/search/?q=${string}/`))
        if ($('div.index-container>h2').text() == "No results found") {
            throw `"${string}", No results!`
        } else {
            const $2 = cheerio.load(await fetcher(`https://nhentai.net/search/?q=${string}&page=${randrange(parseInt($("a[class='last']").attr("href").split("&")[1].replace("page=", "")))}`))
            const link = $2(`div.index-container>div:nth-child(${randrange(parseInt($2("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
            if (data == null) {
                return {
                    link: `https://nhentai.net/g/${link}`,
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
        const $ = cheerio.load(await fetcher(`https://nhentai.net/tag/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            throw `"${string}", does not exist in the tag section!`
        } else {
            const $2 = cheerio.load(await fetcher(`https://nhentai.net/tag/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/tag/${string}/?page=`, "")))}`))
            const link = $2(`div.index-container>div:nth-child(${randrange(parseInt($2("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
            if (data == null) {
                return {
                    link: `https://nhentai.net/g/${link}`,
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
        const $ = cheerio.load(await fetcher(`https://nhentai.net/parody/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            throw `"${string}", does not exist in the parodies section!`
        } else {
            const $2 = cheerio.load(await fetcher(`https://nhentai.net/parody/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/parody/${string}/?page=`, "")))}`))
            const link = $2(`div.index-container>div:nth-child(${randrange(parseInt($2("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
            if (data == null) {
                return {
                    link: `https://nhentai.net/g/${link}`,
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
        const $ = cheerio.load(await fetcher(`https://nhentai.net/artist/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            throw `"${string}", does not exist in the Artists section!`
        } else {
            const $2 = cheerio.load(await fetcher(`https://nhentai.net/artist/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/artist/${string}/?page=`, "")))}`))
            const link = $2(`div.index-container>div:nth-child(${randrange(parseInt($2("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
            if (data == null) {
                return {
                    link: `https://nhentai.net/g/${link}`,
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
        const $ = cheerio.load(await fetcher(`https://nhentai.net/group/${string}/`))
        if ($('title').text().slice(0, 3) == "404") {
            throw `"${string}", does not exist in the Groups section!`
        } else {
            const $2 = cheerio.load(await fetcher(`https://nhentai.net/group/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/group/${string}/?page=`, "")))}`))
            const link = $2(`div.index-container>div:nth-child(${randrange(parseInt($2("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
            if (data == null) {
                return {
                    link: `https://nhentai.net/g/${link}`,
                    id: link
                }
            } else {
                return data(await shorter(link))
            }
        }
    }

    async pRandom(data = {}) {
        const $ = cheerio.load(await fetcher(`https://nhentai.net/random/`))
        const dataId = $("#gallery_id").text().slice(1, 100)
        if (!data) {
            return {
                link: `https://nhentai.net/g/${dataId}`,
                id: dataId
            }
        } else {
            return data(await shorter(dataId))
        }
    }

}