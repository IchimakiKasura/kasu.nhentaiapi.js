declare module "kasu.nhentaiapi.js" {
    interface Data {
        /**ID or Code or whatever you call.*/
        id:string,
        /**Url of the selected code.*/
        url:string,
        /**titles?*/
        title: {
            /**original.*/
            origin:string,
            /**トランスレイト??? wait it's supposed to be in english cuz' it's translated.*/
            translated:string
            /**original but its full version of it.*/
            originFull:string,
            /**YES ITS FULL VERSION OF THE TRANSLATED TITLE OF IT.*/
            translatedFull:string
        },
        /**images?*/
        images: {
        /**Doujin cover image.*/
            cover:string,
        /**Array of images or the doujin.*/
            pages:Array<string>
        },
        /**tags?*/
        tag_table: {
        /**I Like konosuba*/
            parodies:string,
        /**I love megumin*/
            characters:string,
        /**what?*/
            tag:string,
        /**I don't really know about this*/
            artist:string,
        /**Can't think 1 group tag.*/
            groups:string,
        /**english ofc.*/
            languages:string,
        /**ca*/
            categories:string,
        },
        /**haha 69 pages seems cool.*/
        number_pages: number,
        /**
        Hokusai made The Dream of the Fisherman's Wife in 1814, the earliest known Tentacle hentai.

        In 1722 the government made a law banning hentai manga, which means it was common even earlier.

        Suzumi-fune is probobly the oldest hentai anime, it's from 1932.
        */
        uploaded: string
    }
    type json = (response: Data)=>any
    type returns = {
        /**Retrieve the response json object.*/
        json(data?: json):Promise<Data>
    }
    
    /**You horni user.*/
    class main {
        /**If you're using this API on discord bot enable this to true
        
        default: `false`*/
        IsDiscord:boolean
        /**Add more blocked tags into the API
        
        Example:
         ```js
        blockedWords = "crossdressing brutality penetration"
        ```
        contributer: crackheadakira*/
        blockedWords:string
        /**If you're using `IsDiscord` and don't wanna do your own retry function use this.
        
        default: `false`*/
        ReRollonFail:boolean
        /**
         No longer shows a blank or empty json object.
         
         Only used if showing json as full text.
         
         default: `false`*/
        IgnoreNone:boolean
        /**
         Add headers to the request?

         idk why I added this.
         
         default: `{ "content-type": "text/plain" }`*/
         requestHeaders:object
        /**
        `ID`ー Accepts string of numbers or just numbers. Any letter is declined.
        
        Example
        ```js
        getID(12938 | "12938" | "https://nhentai.net/g/12938")
        ```
        */
        getID(ID:string | number): returns
        /**
        `returns` a random "Existing" Doujin number
        */
        pRandID():Promise<number>
        /**
       `string`ー Any tags would do or mixed tag, see example below.
        
        `data`ー Use this if you want to get its properties like images or links etc.
        If no callback it will return a number or the selected ID.
        
        Example: 
        ```js
        // using callback can access list object
        pRandSpecificTags("konosuba aqua sole-female",data=>{data.images.cover})
        
        // no callback will return a number | ID
        pRandSpecificTags("konosuba aqua sole-female") // returns ID only
        ```
        */
        pRandSpecificTags(string?:string,data?:json):Promise<Data>
        /**
        Same as the `pRandSpecificTags` but strictly for Tag Search only.
        
        If a non-Tag entered will cause an error.
        */
        pRandTag(string?:string,data?:json):Promise<Data>
        /**Same as the `pRandSpecificTags` but strictly for Parody Search only.*/
        pRandParody(string?:string,data?:json):Promise<Data>
        /**Same as the `pRandSpecificTags` but strictly for Artist Search only.*/
        pRandArtist(string?:string,data?:json):Promise<Data>
        /**Same as the `pRandSpecificTags` but strictly for Group Search only.*/
        pRandGroup(string?:string,data?:json):Promise<Data>
        /**Same as the `pRandID` but will give you the properties of the selected random number.*/
        pRandom(data?: json):Promise<Data>
    }
    export = main;
}
