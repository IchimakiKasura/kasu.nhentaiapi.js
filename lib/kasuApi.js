"use strict";
const Parser = require('./src/parser');
const { log, error } = require('console');
const { connect } = require('http2');

let Debug = true;
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
                else error('WARN ERROR: Connection is already made.')
            },

            close: (debug)=> {
                if(debug == true){
                    log('Connection is closed!');
                }
                if(this.#client) this.#client.close()
                else throw `ERROR: No connection is made.`
            }

        }
        if(string && string.toLowerCase() == 'start') {
            if(debug == true){
                log('Connection is started!');
                log(`Connection: ${this.url}`);
            }
            this.#client = connect(this.url)
        }
    }

    // I need more code imrpovement

    //#region PrivateVars
        #randrange(int) { return (Math.random() * int) << 0; }
        #replacer(str, rpl){ return str.replace(/ /g, rpl); };
        async #pRCL(tag, string, isSearch){
            if(!string) string= ''
            if(/\.net/.test(this.url)) {
                if(isSearch) string = `${this.url}/${tag}/?q=${string}/`
                    else string = `${this.url}/${tag}/${string}/`
            } else {
                if(isSearch) string = `${this.url}/${tag}?q=${string}`
                    else string = `${this.url}/${tag}/${string}`
            }
            return await Parser.page(1, string, this.#client)
        }
        async #pRandDataGiver(url,data,string){
            url = url // idk what the fuck it always says TotalPage undefined
            const RNG = this.#randrange(url[0].TotalPage),
            currentURL = url[0].CurrentUrl;
            let newPage = await Parser.page(RNG, currentURL, this.#client);
            newPage.shift()
            const urlRNG = this.#randrange(newPage.length);               

            try{
                let dlink = await Parser.book(newPage[urlRNG].url, this.#client, string, this.IgnoreNone, this.blockedWords, this.IsDiscord, this.ReRollonFail)
                if(data) return data(dlink);
                return dlink;
            } catch (e) {
                if(this.ReRollonFail && !/DISCORD ToS: REROLL DENIED/.test(e)){
                    return this.#pRandDataGiver(url,data,string);
                }
                throw e
            }

        }
    //#endregion
    
    //#region pull Random
        async pRandSpecificTags(string, data) {
            string = this.#replacer(string, "+");
            const exist = await this.#pRCL("search", string, true)
            if(exist) {
                return this.#pRandDataGiver(exist, data);
            } else return exist
        }
        pRandTag(string, data) { return this.#pRand(string, data, "tag") };
        pRandParody(string, data) { return this.#pRand(string, data, "parody") };
        pRandArtist(string, data) { return this.#pRand(string, data, "artist") };
        pRandGroup(string, data) { return this.#pRand(string, data, "group") };
        async #pRand(string, data, tag) {
            string = this.#replacer(string, "-");
            const exist = await this.#pRCL(tag, string)
            if(exist) {
                return this.#pRandDataGiver(exist, data, string);
            } else return exist
        }
    //#endregion

    //#region pull stuff
        getID(link){
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
                    const list = await Parser.book(`${this.url}/g/${link}/`, this.#client, null,this.IgnoreNone, this.blockedWords,this.IsDiscord,null);
    
                    if (data) return data(list);
                    return list
                }
            }
        }

        async pRandom(data){
            try{
                let dataID = await Parser.book(`${this.url}/random`, this.#client, null,this.IgnoreNone, this.blockedWords,this.IsDiscord, this.ReRollonFail);
                if(data) return data(dataID);
                return dataID;
            } catch(e){
                return this.pRandom(data);
            }
        }
        
        async pRandID(){
            let id = await Parser.book(`${this.url}/random`, this.#client, null,this.IgnoreNone);
            return id.id
        }

        async pHomepage(page){
            let data = await Parser.page(page, this.url, this.#client);
            return data;
        }
    
        async pLanguagePage(string, page){
            if(/translated|english|japanese|chinese|eng|japan|china|jp/.test(string)){
                switch(string){
                    case 'eng': string = 'english'; break;
                    case 'en': string = 'english'; break; // like bruh
                    case 'japan': string = 'japanese'; break;
                    case 'jp': string = 'japanese'; break;
                    case 'china': string = 'chinese'; break;
                }
                
                string = `${this.url}/language/${string}/`;
                let data = await Parser.page(page, string, this.#client);
                return data;
            }
            this.#client.close()
            throw `ERROR: Invalid language (except: translated) lol`
        }
    
        async pSearch(string, page){
            try { string = this.#replacer(string, "+") } catch (e) { }
            if(/\.net/.test(this.url)) string = `${this.url}/search/?q=${string}/`
             else string = `${this.url}/search?q=${string}`
            let data = await Parser.page(page, string, this.#client);
            return data;
        }
    
        async pTagPage(string, page){
            try { string = this.#replacer(string, "+") } catch (e) { }
            if(/\.net/.test(this.url)) string = `${this.url}/tag/?q=${string}/`
             else string = `${this.url}/tag/?q=${string}`
            let data = await Parser.page(page, string, this.#client);
            return data;
        }
    //#endregion
    

    //debug
    /**
     * legend: bug - 🪲, working/fine - ✔️, not working/broken-❌
     * Methods
     * getID ✔️
     * pRandom ✔️
     * pRandID ✔️
     * pRandSpecificTags ✔️
     * pRandTag ✔️
     * pRandParody ✔️
     * pRandGroup ✔️
     * pRandArtist 🪲
     * pLanguagePage ✔️
     * pSearch ✔️
     * pTagPage ✔️
     * 
     * URL domain
     * nhentai.net ✔️
     * nhentai.to ✔️
    */

}
module.exports = Main