"use strict";
const load = require("cheerio").load,
    fetcher = require("./src/fetcher"),
    shorter = require("./src/shorter"),
    performance = require('perf_hooks').performance,
    url = "https://nhentai.net/"

    // DEBUG
    /**************/
    /****/  let Debug = true;
    /****/
    /****/  function debugIteration(string, start){
    /****/      if(Debug) console.log(string, +start.toFixed(2))
    /****/  }
    /**************/

function randrange(int) { return ((Math.random() * int) + 1) << 0; }
function replacer(str, rpl){ return str.replace(/ /g, rpl); };

class main {

    constructor() {
        this.IsDiscord = false;
        this.blockedWords = "";
        this.ReRollonFail = false;
        this.IgnoreNone = false;
        this.requestHeaders;
    }
    //shortcutter functions
    async #pRCL(tag, string) { return load(await fetcher(`${url}${tag}/${string}/`, this.requestHeaders)); }

    /* 
    * hidden function, more like a private function
    * this type of function is only avail on Node version 14+
    * 
    * update on the version 3.2.1
    * 
    * Help! the 3.0.1 test run was ok, it run 0:59 or more and now it's getting like
    * 1:38+ times.
    */
    async #pRandDataGiver($, string, data, bool, tag, bool2) {

        /****************/
        /****/ var start = performance.now()
        /****************/

        let link;
        if (bool) throw (`"${string}", does not exist in the ${tag} section!`);

        let web,page;
        try{
            page = randrange(+$("a[class='last']").attr("href").replace(`/${tag}/${string}/?page=`, ""))
            if(bool2) page = randrange(+$("a[class='last']").attr("href").split("&")[1].replace("page=", ""))
        }catch(err){ 
            page = 1 
        }
        if(bool2){
            web = load(await fetcher(`${url}search/?q=${string}&page=${page}`, this.requestHeaders));
        } else web = load(await fetcher(`${url}${tag}/${string}/?page=${page}`, this.requestHeaders))
        link = web(`div.index-container>div:nth-child(${randrange(+web("div.index-container>div>a").length)})>a`).attr("href").slice(3, 100).replace("/", "")

        let dlink = undefined;
        try {
            dlink = await shorter(link, this.IsDiscord, this.ReRollonFail, string, this.blockedWords, this.IgnoreNone, this.requestHeaders);

            /****************/
            /****/ debugIteration('(MAIN.js / pRandDataGiver) took to iterate: ', performance.now() - start)
            /****************/

            if(data) return data(dlink);
            return dlink
        } catch(e) {
            if(this.ReRollonFail){

                /****************/
                /****/ debugIteration('(MAIN.js / pRandDataGiver / reroll) took to iterate: ', performance.now() - start)
                /****************/

                if(!/DISCORD ToS: REROLL DENIED/.test(e)) return this.#pRandDataGiver($, string, data, bool, tag, bool2, link);
                throw e
            } else throw e
        }
    }

    getID(link) {

        /****************/
        /****/ var start = performance.now();
        /****************/

        //transformation
        /[${url}g/]/.test(link) ? link = +link.replace(`${url}g/`, "").replace('/','') : typeof (link) != 'number' ? link = +link : null;
        return {
            json: async (data) => {
                const list = await shorter(link, this.IsDiscord, null, null, this.blockedWords,this.IgnoreNone, this.requestHeaders);

                /****************/
                /****/ debugIteration('(MAIN.js / getID) took to iterate: ', performance.now() - start)
                /****************/

                if (data) return data(list);
                return list
            }
        }
    }

    //generate ID only. An Existing doujin ID. Doesn't give the data.
    async pRandID() {

        /****************/
        /****/ var start = performance.now()
        /****************/

        const $ = await this.#pRCL("random", "");

        /****************/
        /****/ debugIteration('(MAIN.js / pRandDataGiver / reroll) took to iterate: ', performance.now() - start)
        /****************/

        return $("#gallery_id").text().slice(1, 100);
    }

    //multiple arg use
    async pRandSpecificTags(string, data) {
        try { string = replacer(string, "+") } catch (e) { }
        const $ = load(await fetcher(`${url}search/?q=${string}/`, this.requestHeaders));
        if ($('div.index-container>h2').text() == "No results found") throw `"${string}", No results!`;
        return this.#pRandDataGiver($, string, data, false, '', true);
    }

    // whole pRandTag except the pRandSpecific
    pRandTag(string, data) { return this.#pRand(string, data, "tag") };
    pRandParody(string, data) { return this.#pRand(string, data, "parody") };
    pRandArtist(string, data) { return this.#pRand(string, data, "artist") };
    pRandGroup(string, data) { return this.#pRand(string, data, "group") };

    async #pRand(string, data, tag) {
        string = replacer(string, "-");
        const $ = await this.#pRCL(tag, string);
        const bool = $('title').text().slice(0, 3) == "404";
        return this.#pRandDataGiver($, string, data, bool, tag);
    }

    async pRandom(data) {
        /****************/
        /****/ var start = performance.now()
        /****************/
        const $ = await this.#pRCL("random", "");
        const dataId = $("#gallery_id").text().slice(1, 100);
        let list = undefined;
        try {
            list = await shorter(dataId, this.IsDiscord, this.ReRollonFail, null, this.blockedWords,this.IgnoreNone, this.requestHeaders);
            /****************/
            /****/ debugIteration('(MAIN.js / pRandData) took to iterate: ', performance.now() - start)
            
            /****************/
            if (data) return data(list);
            return list
        } catch (e) {
            return this.pRandom(data);
        }
    }
}
module.exports = main;