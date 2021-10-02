declare module "kasu.nhentaiapi.js" {
    interface Data {
        id:string,
        url:string,
        title: {
            origin:string,translated:string
        },
        images: {
            cover:string,
            pages:Array<string>
        },
        tag_table: {
            parodies:string,
            characters:string,
            tag:string,
            artist:string,
            groups:string,
            languages:string,
            categories:string,
        },
        number_pages: number,
        uploaded: string
    }
    type json = function(Data)
    type returns = {json(data?: json): void}
    
    class main {
        /**
        * @param {} IsDiscord If you're using this API on discord bot enable this to true
        */
        IsDiscord:boolean
        /**
        * @param {} blockedWords Add more blocked tags into the API
        * @example blockedWords = "crossdressing brutality penetration"
        */
        blockedWords:string
        /**
        * @param {} ReRollonFail If you're using `IsDiscord` and don't wanna do your own retry `Func` use this.
        */
        ReRollonFail:boolean
        /**
        * @param {} ID {Required} Accepts string of numbers or just numbers. Any letter is declined.
        * @returns
        * @example
        * getID(12938).json(data=>{})
        * getID("12938").json(data=>{})
        * getID("https://nhentai.net/g/12938").json(data=>{})
        */
        getID(ID:string|number): returns
        /**
        * @returns It returns a random "Existing" Doujin number
        */
        pRandID():Promise<number>
        /**
        * Perhaps this is the most useful function i've created.
        * @param {string} string {Required} Any tags would do.
        * @param {json} data {optional} Use this if you want to get its properties like images or links etc.
        * @returns
        * @example pRandSpecificTags("konosuba aqua sole-female")
        */
        pRandSpecificTags(string?:string,data?:json):Promise<number|json>
        /**
        * Same as the "pRandSpecificTags" but strictly for Tag only. If a non-Tag entered will cause an error.
        * @returns
        */
        pRandTag(string?:string,data?:json):Promise<number|json>
        /**
        * Same as the "pRandSpecificTags" but strictly for Parody only.
        * @returns
        */
        pRandParody(string?:string,data?:json):Promise<number|json>
        /**
        * Same as the "pRandSpecificTags" but strictly for Artist only.
        * @returns
        */
        pRandArtist(string?:string,data?:json):Promise<number|json>
        /**
        * Same as the "pRandSpecificTags" but strictly for Group only.
        * @returns
        */
        pRandGroup(string?:string,data?:json):Promise<number|json>
        /**
        * Same as the "pRandID" but will give you the properties of the selected random number.
        * @returns
        */
        pRandom(data?: json):Promise<json>
    }
    export = main;
}
