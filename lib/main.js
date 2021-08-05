const cheerio = require("cheerio")
const fetcher = require("./src/fetcher")
const shorter = require("./src/shorter")
const url = "https://nhentai.net/"

function randrange(int) {if (typeof (int) != 'number') throw 'input value is not an integer!';return Math.floor(Math.random()*int)+1}

async function linkRandomizer(type,string,$){
    let web;
    try{
        web = cheerio.load(await fetcher(`${url}${type}/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/${type}/${string}/?page=`, "")))}`))
    } catch(err){
        web = cheerio.load(await fetcher(`${url}${type}/${string}/?page=1`))
    }
    return web(`div.index-container>div:nth-child(${randrange(parseInt(web("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
}

var pRCL=async(tag, string)=>{return cheerio.load(await fetcher(`${url}${tag}/${string}/`))}
let replacer=(str, rpl)=>{ return str.replace(/ /g,rpl) }

class main {
    constructor(){}

    // Only used when using this API on discord bots
    IsDiscord = false;
    // run the code again if it fails
    ReRollonFail = false;

    getID(ID) {
        //transformation
        /[${url}g/]/.test(ID) ? ID = parseInt(ID.replace(`${url}g/`,"")): typeof (ID) != 'number' ? ID = parseInt(ID) : null;
        return {
            json: async (data) => {
                let val = await shorter(ID,this.IsDiscord)
                const list = {
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
                if(data) return data(list)
                return list
            }
        }
    }

    //generate ID only. An Existing doujin ID. Doesn't give the data.
    async pRandID(){
        const $ = await pRCL("random","/")
        return $("#gallery_id").text().slice(1, 100)
    }

    //multiple arg use
    async pRandSpecificTags(string, data) {
        try{ string = replacer(string,"+") }catch(e){}
        const $ = cheerio.load(await fetcher(`${url}search/?q=${string}/`))
        if ($('div.index-container>h2').text() == "No results found") {
            throw( `"${string}", No results!`)
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
                try{
                    return data(await shorter(link, this.IsDiscord,this.ReRollonFail, string))
                } catch(e) {
                    if(this.ReRollonFail){
                        if(!/DISCORD ToS: REROLL DENIED/.test(e)){
                            return this.pRandSpecificTags(string, data)
                        } else throw e
                    } else throw e
                }
            }
        }
    }

    //one arg use | spelling sensitive
    async pRandTag(string, data) {
        string = replacer(string,"-")
        const $ = await pRCL("tag",string)
        if ($('title').text().slice(0, 3) == "404") {
            throw( `"${string}", does not exist in the tag section!`)
        } else {
          const link = await linkRandomizer('tag',string,$)
            if (data == null) {
                return { link: `${url}g/${link}`,id: link }
            } else {
                try{
                    return data(await shorter(link, this.IsDiscord,this.ReRollonFail, string))
                } catch(e) {
                    if(this.ReRollonFail){
                        if(!/DISCORD ToS: REROLL DENIED/.test(e)){
                            console.log("retry..")
                            return this.pRandTag(string, data)
                        } else throw e
                    } else throw e
                }
            }
        }
    }

    //one arg use | spelling sensitive
    async pRandParody(string, data) {
        string = replacer(string,"-")
        const $ = await pRCL("parody",string)
        if ($('title').text().slice(0, 3) == "404") {
            throw( `"${string}", does not exist in the parodies section!`)
        } else {
            const link = await linkRandomizer('parody',string,$)
            if (data == null) {
                return { link: `${url}g/${link}`,id: link }
            } else {
                try{
                    return data(await shorter(link, this.IsDiscord,this.ReRollonFail, string))
                } catch(e) {
                    if(this.ReRollonFail){
                        if(!/DISCORD ToS: REROLL DENIED/.test(e)){
                            return this.pRandParody(string, data)
                        } else throw e
                    } else throw e
                }
            }
        }
    }

    //one arg use | spelling sensitive
    async pRandArtist(string, data) {
        string = replacer(string,"-")
        const $ = await pRCL("artist",string)
        if ($('title').text().slice(0, 3) == "404") {
            throw( `"${string}", does not exist in the Artists section!`)
        } else {
            const link = await linkRandomizer('artist',string,$)
            if (data == null) {
                return { link: `${url}g/${link}`,id: link }
            } else {
                try{
                    return data(await shorter(link, this.IsDiscord,this.ReRollonFail, string))
                } catch(e) {
                    if(this.ReRollonFail){
                        if(!/DISCORD ToS: REROLL DENIED/.test(e)){
                            return this.pRandArtist(string, data)
                        } else throw e
                    } else throw e
                }
            }
        }
    }

    //one arg use | spelling sensitive
    async pRandGroup(string, data) {
        string = replacer(string,"-")
        const $ = await pRCL("group",string)
        if ($('title').text().slice(0, 3) == "404") {
            throw( `"${string}", does not exist in the Groups section!`)
        } else {
            const link = await linkRandomizer('group',string,$)
            if (data == null) {
                return { link: `${url}g/${link}`,id: link }
            } else {
                try{
                    return data(await shorter(link, this.IsDiscord,this.ReRollonFail, string))
                } catch(e) {
                    if(this.ReRollonFail){
                        if(!/DISCORD ToS: REROLL DENIED/.test(e)){
                            return this.pRandGroup(string, data)
                        } else throw e
                    } else throw e
                }
            }
        }
    }

    async pRandom(data) {
        const $ = await pRCL("random","/")
        const dataId = $("#gallery_id").text().slice(1, 100)
        if (!data) {
            return { link: `${url}g/${dataId}`,id: dataId }
        } else {
            try{
                return data(await shorter(link, this.IsDiscord,this.ReRollonFail, string))
            } catch(e) {
                if(this.ReRollonFail){
                    if(!/DISCORD ToS: REROLL DENIED/.test(e)){
                        return this.pRandom(string, data)
                    } else throw e
                } else throw e
            }
        }
    }

}

module.exports = main;