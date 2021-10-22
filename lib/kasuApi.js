"use strict";
const { load } = require('cheerio'),
{ Parser } = require('./src/parser'),
{ log, error } = require('console'),
{ connect } = require('http2');

    // DEBUG
    /**************/
    /****/  let Debug = true;
    /****/
    /****/  function debugIteration(string, start){
    /****/      if(Debug) console.log(string, +start.toFixed(2))
    /****/  }
    /**************/

class Main {

    #client
    constructor(string, url ,debug) {
        this.url = url || `https://nhentai.net`;
        this.#client;
        this.IsDiscord = false;
        this.blockedWords = "";
        this.ReRollonFail = false;
        this.IgnoreNone = false;
        this.connection = {

            start: (debug)=> {
                if(debug == true){
                    log('Connection is started!');
                    log(`Connection: ${this.url}`);
                }
                if(!this.#client) this.#client = connect(this.url)
                else console.error('WARN ERROR: Connection is already made.')
            },

            close: (debug)=> {
                if(debug == true){
                    console.log('Connection is closed!');
                }
                if(this.#client) this.#client.close()
                else throw `ERROR: No connection is made.`
            }

        }
        if(string && string.toLowerCase() == 'start') {
            if(debug == true){
                conse.log('Connection is started!');
                log(`Connection: ${this.url}`);
            }
            this.#client = connect(this.url)
        }
    }

    #randrange(int) { return ((Math.random() * int) + 1) << 0; }
    #replacer(str, rpl){ return str.replace(/ /g, rpl); };

    getID(link) {

        if(/https:\/\/nhentai/.test(link)) {
            link = +link.replace(`${this.url}/g/`, "").replace('/','')
            if(!link) throw `ERROR: 

            1. You are trying to access a different domain. Please change the URL on the constructor.
            2. Entered link is Invalid.
            
            NOTE: If you are using a full link string please check if the domain matches the URL on the constructor.
            
            `
        }

        if(typeof (link) != 'number') link = +link
        return {
            json: async (data) => {
                const list = await Parser.Shorter(`${this.url}/g/${link}/`, this.IsDiscord, null, null, this.blockedWords,this.IgnoreNone, this.#client);

                if (data) return data(list);
                return list
            }
        }

    }

    async #pRandDataGiver($, string, data, isError, tag, isSpecific){

        let link, web, page, dlink;
        if(isError) throw `"${string}", does not exist in the ${tag} section!`;

        try {
            if(isSpecific) page = randrange(+$("a[class='last']").attr("href").split("&")[1].replace("page=", ""))
            else page = this.#randrange(+$("a[class='last']").attr("href").replace(`/${tag}/${string}/?page=`, ""))
        } catch(e) {
            page = 1
        }

        if(isSpecific) web = load(await Parser.fetcher(`${this.url}/search/?q=${string}&page=${page}`, this.#client));
        else web = load(await Parser.fetcher(`${this.url}/${tag}/${string}/?page=${page}`, this.#client));
        link = web(`div.index-container>div:nth-child(${this.#randrange(+web("div.index-container>div>a").length)})>a`).attr("href").slice(3, 100).replace("/", "")

        try {
            dlink = await Parser.Shorter(`${this.url}/g/${link}`, this.IsDiscord, this.ReRollonFail, string, this.blockedWords, this.IgnoreNone, this.#client)
            if(data) return data(dlink);
            return dlink;
        } catch (e) {
            if(this.ReRollonFail && !/DISCORD ToS: REROLL DENIED/.test(e)) return this.#pRandDataGiver($, string, data, isError, tag, isSpecific);
            throw e
        }
    }

    async pRandSpecificTags(string, data) {
        let $;
        try { string = this.#replacer(string, "+") } catch (e) { }
        if(/\.net/.test(this.url)){
            $ = load(await Parser.fetcher(`${this.url}/search/?q=${string}/`, this.#client))
            if ($('div.index-container>h2').text() == "No results found") { 
                this.#client.close()
                throw `"${string}", No results!`; 
            }
        };
        if(/\.to/.test(this.url)){
            $ = load(await Parser.fetcher(`${this.url}/search?q=${string}/`, this.#client))
            if ($('div#content>h2').text() == "0 Results") { 
                this.#client.close()
                throw `"${string}", No results!`; 
            }
        }
        return this.#pRandDataGiver($, string, data, false, '', true);
    }

    pRandTag(string, data) { return this.#pRand(string, data, "tag") };
    pRandParody(string, data) { return this.#pRand(string, data, "parody") };
    pRandArtist(string, data) { return this.#pRand(string, data, "artist") };
    pRandGroup(string, data) { return this.#pRand(string, data, "group") };

    async #pRCL(tag, string){
        if(!string) string= ''
        if(/\.net/.test(this.url)) {
            string = `${this.url}/${tag}/${string}/`
        } else {
            string = `${this.url}/${tag}/${string}`
            string = string.replace("random/","random")
        }
        return load(await Parser.fetcher(string, this.#client))
    }

    async #pRand(string, data, tag) {
        string = this.#replacer(string, "-");
        const $ = await this.#pRCL(tag, string)
        const bool = /404/g.test($('title').text());
        return this.#pRandDataGiver($, string, data, bool, tag, false);
    }

    async pRandom(data){
        
        const $ = await this.#pRCL('random');
        let dataId, list;
        if(/\.net/.test(this.url)) dataId = $("#gallery_id").text().slice(1, 100);
        else dataId = $(".gallerythumb").attr('href').replace(/\/g\/|\/1\//g,'');
        try {
            list = await Parser.Shorter(`${this.url}/g/${dataId}`, this.IsDiscord, this.ReRollonFail, null, this.blockedWords, this.IgnoreNone, this.#client)
            if(data) return data(list);
            return list;
        } catch(e) {
            return this.pRandom(data);
        }

    }

    async pRandID(){
        const $ = await this.#pRCL('random');
        let id;
        if(/\.net/.test(this.url)) id = $("#gallery_id").text().slice(1, 100);
        else id = $(".gallerythumb").attr('href').replace(/\/g\/|\/1\//g,'');
        return id;
    }

    async pHomepage(page){
        if(page == 0 || !page) page = 1;
        return await Parser.homePage(page,this.url,this.#client)
    }

    async pLanguagePage(string, page){
        if(/translated|english|japanese|chinese|eng|japan|china|jp/.test(string)){
            switch(string){
                case 'eng': string = 'english'; break;
                case 'japan': string = 'japanese'; break;
                case 'jp': string = 'japanese'; break;
                case 'china': string = 'chinese'; break;
            }
            if(page == 0 || !page) page = 1
            string = `${this.url}/language/${string}/`;
            return await Parser.homePage(page,string,this.#client);
        }
        this.#client.close()
        throw `ERROR: Invalid language (except: translated) lol`
    }

    async pSearch(string, page){
        try { string = this.#replacer(string, "+") } catch (e) { }
        let url;
        if(!/\.to/.test(this.url)) url = `${this.url}/search/?q=${string}&`
        else url = `${this.url}/search?q=${string}&`
        if(page == 0 || !page) page = 1
        return await Parser.homePage(page,url,this.#client);
    }

    async pTagPage(string, page){
        if(page == 0 || !page) page = 1
        string = `${this.url}/tag/${string.replace(' ','-')}/`;
        try{
            return await Parser.homePage(page,string,this.#client);
        } catch(e){
            this.#client.close()
            log(e)
            // throw `ERROR: Invalid Tag`
        }
    }

}

module.exports = Main