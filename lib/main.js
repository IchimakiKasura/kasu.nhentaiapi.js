"use strict";
const load = require("cheerio").load,
fetcher = require("./src/fetcher"),
shorter = require("./src/shorter"),
url="https://nhentai.net/"

function randrange(int) {return Math.floor(Math.random()*int)+1}
async function linkRandomizer(type,string,$){
    let web;
    try{
        web = load(await fetcher(`${url}${type}/${string}/?page=${randrange(parseInt($("a[class='last']").attr("href").replace(`/${type}/${string}/?page=`, "")))}`))
    } catch(err){
        web = load(await fetcher(`${url}${type}/${string}/?page=1`))
    }
    return web(`div.index-container>div:nth-child(${randrange(parseInt(web("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
}
//shortcutter functions
let pRCL=async(tag,string)=>{
    return load(await fetcher(`${url}${tag}/${string}/`))
};
let replacer=(str,rpl)=>{return str.replace(/ /g,rpl)};
let lId=(id)=>{return{link:`${url}g/${id}`,id:id}};

class main {
    constructor() {
        this.IsDiscord=false;
        this.blockedWords="";
        this.ReRollonFail=false;
    }
    
    /* 
    * hidden function, more like a private function
    * this type of function is only avail on Node version 14+
    */
    async #pRandDataGiver($, string, method, data, bool, tag, bool2, link){
        if(bool)throw(  `"${string}", does not exist in the ${tag} section!`)
        if(!bool2)link = await linkRandomizer(tag,string,$)
        if(!data)return lId(link);
        try{
            return data(await shorter(link,this.IsDiscord,this.ReRollonFail,string,this.blockedWords))
        } catch(e) {
            if(this.ReRollonFail){
                if(!/DISCORD ToS: REROLL DENIED/.test(e)) eval(`this.${method}(string, data)`);
                throw e
            } else throw e
        }
    }

    getID(i) {
        //transformation
        /[${url}g/]/.test(i)?i=parseInt(i.replace(`${url}g/`,"")):typeof(i)!='number'?i=parseInt(i):null;
        return {
            json: async (d) => {
                const list = await shorter(i,this.IsDiscord,null,null,this.blockedWords)
                if(d) return d(list)
                return list
            }
        }
    }

    //generate ID only. An Existing doujin ID. Doesn't give the data.
    async pRandID() {
        const $ = await pRCL("random","/")
        return $("#gallery_id").text().slice(1, 100)
    }

    //multiple arg use
    async pRandSpecificTags(string, data) {
        let page;
        try{ string = replacer(string,"+") }catch(e){}
        const $ = load(await fetcher(`${url}search/?q=${string}/`))
        if ($('div.index-container>h2').text() == "No results found") throw( `"${string}", No results!`)
        try{page = randrange(parseInt($("a[class='last']").attr("href").split("&")[1].replace("page=", "")))} catch(err){page = 1;}
        const $2 = load(await fetcher(`${url}search/?q=${string}&page=${page}`))
        const link = $2(`div.index-container>div:nth-child(${randrange(parseInt($2("div[class='container index-container']>div>a").length))})>a`).attr("href").slice(3, 100).replace("/", "")
        if (!data) {
            return lId(link);
        } else return await this.#pRandDataGiver('',string,"pRandSpecificTags",data,'','',true,link)
    }

    // If you are using 3.0.0 please add 'return'
    async pRandTag(string, data){
        return await this.pRand(string, data, "pRandTag", "tag")
    };
    async pRandParody(string, data){
        return await this.pRand(string, data, "pRandParody", "parody")
    };
    async pRandArtist(string, data){
        return await this.pRand(string, data, "pRandArtist", "artist")
    };
    async pRandGroup(string, data){
        return await this.pRand(string, data, "pRandGroup", "group")
    };

    async pRand(string, data, method, tag) {
        string = replacer(string,"-")
        const $ = await pRCL(tag,string)
        const bool = $('title').text().slice(0, 3) == "404";
        return await this.#pRandDataGiver($,string,method,data,bool,tag)
    }

    async pRandom(d) {
        const $ = await pRCL("random","/")
        const dataId = $("#gallery_id").text().slice(1, 100)
        if (!d) {
            return lId(dataId);
        } else {
            try{
                return d(await shorter(dataId, this.IsDiscord,this.ReRollonFail,null,this.blockedWords))
            } catch(e) {
                return this.pRandom(d)
            }
        }
    }

}
module.exports = main;