/**
 * Thank you for choosing this API library.
 * 
 * NOTE: you can now use `kasuNhentaiJS`
 */
declare module "kasu.nhentaiapi.js" {
    type book = import("./json").book;
    type page = import("./json").page;
    type tags = import("./tags").tags;
    type artist = import("./tags").artist;
    type parodies = import("./tags").parodies;
    type groups = import("./tags").groups;
    /**j s o n*/
    type json = (response: book) => {}
    type returns = {
        /**Retrieve the response json object.*/
        json(data?: json): Promise<book>
    }
    type connection = {
        /**start the connection?*/
        start(debug?: boolean): any|string
        /**close the connection?*/
        close(debug?: boolean): any|string
    }
    /**book*/
    type _url = "https://nhentai.net" | "https://nhentai.to"
    /**language*/
    type language = "japanese"|"japan"|"jp"|"english"|"eng"|"chinese"|"china"|"translated"
    /**You horni user.*/
    class Main {
        /**
         @param {connection} connection has 1 inputs that can be accepted, start. Same as the connection function below. It just automatically start the connection without calling the connection property.
         @param {_url} url https://nhentai.net or https://nhentai.to
         @param {boolean} debug If set to true It will show a log that shows that it is working and connected.
        */
        constructor(connection?: "start", url?: _url, debug?: boolean)
        /**The Inputted URL will be used to connect. As of the 3.5.0 update the domain .to is now supported.
         
        https://nhentai.net or https://nhentai.to the https:// must be included.*/
        url: _url
        /**if you want to start the connection provided by the url.*/
        connection: connection
        /**If you're using this API on discord bot enable this to true
        
        contributer: [crackheadakira](https://github.com/crackheadakira)

        default: `false`*/
        IsDiscord: boolean
        /**Add more blocked tags into the API
        
        Example:
         ```js
        blockedWords = "crossdressing brutality penetration"
        ```*/
        blockedWords: string
        /**If you're using `IsDiscord` and don't wanna do your own retry function use this.
        
        default: `false`*/
        ReRollonFail: boolean
        /**
         No longer shows a blank or empty json object.
         
         Only used if showing json as full text.
         
         default: `false`*/
        IgnoreNone: boolean
        /**
         @param {boolean} MoreLike If set to `**true**`, It will show the 'More Like this' section of the page. 
         @param {string|number} ID Accepts string of numbers or just numbers. Any letter is declined.
         
         Example: 
         ```js
         getID(12938 | "12938" | "https://nhentai.net/g/12938", false)
         ```
        */
        getID(ID: string | number, MoreLike?: boolean): returns
        /**
        `returns` a random "Existing" Doujin number
        */
        pRandID(): Promise<number>
        /**
         @param {string} string Any tags would do or mixed tag, see example below.
         @param {boolean} MoreLike If set to **`true`**, It will show the 'More Like this' section of the page. 
         @param {json} data Use this if you want to get its properties like images or links etc.

         If no callback it will return a number or the selected ID.

         Example: 
         ```js
         // using callback can access list object
         pRandSpecificTags("konosuba aqua sole-female",data=>{data.images.cover})
        
         // no callback will return a number | ID
         pRandSpecificTags("konosuba aqua sole-female") // returns ID only
         ```
        */
        pRandSpecificTags(string?: string, MoreLike?: boolean, data?: json): Promise<book>
        /**
         @param {tags} string [Download](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/lib/tags.d.ts) the full list on github for better search

         Same as the `pRandSpecificTags` but strictly for Tag Search only.
        
         If a non-Tag entered will cause an error.
        */
        pRandTag(string: tags, MoreLike?: boolean, data?: json): Promise<book>
        /**
         @param {parodies} string [Download](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/lib/tags.d.ts) the full list on github for better search
          
          Same as the `pRandSpecificTags` but strictly for Parody Search only.*/
        pRandParody(string: parodies, MoreLike?: boolean, data?: json): Promise<book>
        /**
         @param {artist} string [Download](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/lib/tags.d.ts) the full list on github for better search
          
         Same as the `pRandSpecificTags` but strictly for Artist Search only.*/
        pRandArtist(string: artist, MoreLike?: boolean, data?: json): Promise<book>
        /**
         @param {groups} string [Download](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/lib/tags.d.ts) the full list on github for better search
         
         Same as the `pRandSpecificTags` but strictly for Group Search only.*/
        pRandGroup(string: groups, MoreLike?: boolean, data?: json): Promise<book>
        /**Same as the `pRandID` but will give you the properties of the selected random number.*/
        pRandom(data?: json, MoreLike?: boolean): Promise<book>
        /**@param {number} page specifies the page. Shows the Homepage of the selected URL. */
        pHomepage(page?: number): Promise<page>
        /**
         * @param {langauge} string only accepts 4 `string` **japanese**, **english**, **chinese** and **translated** (is this even a language). it also accepts shortcuts like **jp**, **japan**, **eng**, **china**.
         * @param {number} page specifies the page.*/
        pLanguagePage(string: language, page?: number): Promise<page>
        /**
         * @param {string} string some list of the searched string of `string`.
         * @param {number} page specifies the page. */
        pSearch(string: string, page?: number): Promise<page>
        /**
         * @param {tags} string Shows some list of the searched tag string of `string`.
         * @param {number} page specifies the page. */
        pTagPage(string: tags, page?: number): Promise<page>

    }
    export = Main;
}

// don't think about it.
/**Thank you for choosing this API library.*/
declare module "kasuNhentaiJS" {
    type book = import("./json").book;
    type page = import("./json").page;
    type tags = import("./tags").tags;
    type artist = import("./tags").artist;
    type parodies = import("./tags").parodies;
    type groups = import("./tags").groups;
    /**j s o n*/
    type json = (response: book) => {}
    type returns = {
        /**Retrieve the response json object.*/
        json(data?: json): Promise<book>
    }
    type connection = {
        /**start the connection?*/
        start(debug?: boolean): any|string
        /**close the connection?*/
        close(debug?: boolean): any|string
    }
    /**book*/
    type _url = "https://nhentai.net" | "https://nhentai.to"
    /**language*/
    type language = "japanese"|"japan"|"jp"|"english"|"eng"|"chinese"|"china"|"translated"
    /**You horni user.*/
    class Main {
        /**
         @param {connection} connection has 1 inputs that can be accepted, start. Same as the connection function below. It just automatically start the connection without calling the connection property.
         @param {_url} url https://nhentai.net or https://nhentai.to
         @param {boolean} debug If set to true It will show a log that shows that it is working and connected.
        */
        constructor(connection?: "start", url?: _url, debug?: boolean)
        /**The Inputted URL will be used to connect. As of the 3.5.0 update the domain .to is now supported.
         
        https://nhentai.net or https://nhentai.to the https:// must be included.*/
        url: _url
        /**if you want to start the connection provided by the url.*/
        connection: connection
        /**If you're using this API on discord bot enable this to true
        
        contributer: [crackheadakira](https://github.com/crackheadakira)

        default: `false`*/
        IsDiscord: boolean
        /**Add more blocked tags into the API
        
        Example:
         ```js
        blockedWords = "crossdressing brutality penetration"
        ```*/
        blockedWords: string
        /**If you're using `IsDiscord` and don't wanna do your own retry function use this.
        
        default: `false`*/
        ReRollonFail: boolean
        /**
         No longer shows a blank or empty json object.
         
         Only used if showing json as full text.
         
         default: `false`*/
        IgnoreNone: boolean
        /**
         @param {boolean} MoreLike If set to `**true**`, It will show the 'More Like this' section of the page. 
         @param {string|number} ID Accepts string of numbers or just numbers. Any letter is declined.
         
         Example: 
         ```js
         getID(12938 | "12938" | "https://nhentai.net/g/12938", false)
         ```
        */
        getID(ID: string | number, MoreLike?: boolean): returns
        /**
        `returns` a random "Existing" Doujin number
        */
        pRandID(): Promise<number>
        /**
         @param {string} string Any tags would do or mixed tag, see example below.
         @param {boolean} MoreLike If set to **`true`**, It will show the 'More Like this' section of the page. 
         @param {json} data Use this if you want to get its properties like images or links etc.

         If no callback it will return a number or the selected ID.

         Example: 
         ```js
         // using callback can access list object
         pRandSpecificTags("konosuba aqua sole-female",data=>{data.images.cover})
        
         // no callback will return a number | ID
         pRandSpecificTags("konosuba aqua sole-female") // returns ID only
         ```
        */
        pRandSpecificTags(string?: string, MoreLike?: boolean, data?: json): Promise<book>
        /**
         @param {tags} string [Download](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/lib/tags.d.ts) the full list on github for better search

         Same as the `pRandSpecificTags` but strictly for Tag Search only.
        
         If a non-Tag entered will cause an error.
        */
        pRandTag(string: tags, MoreLike?: boolean, data?: json): Promise<book>
        /**
         @param {parodies} string [Download](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/lib/tags.d.ts) the full list on github for better search
          
          Same as the `pRandSpecificTags` but strictly for Parody Search only.*/
        pRandParody(string: parodies, MoreLike?: boolean, data?: json): Promise<book>
        /**
         @param {artist} string [Download](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/lib/tags.d.ts) the full list on github for better search
          
         Same as the `pRandSpecificTags` but strictly for Artist Search only.*/
        pRandArtist(string: artist, MoreLike?: boolean, data?: json): Promise<book>
        /**
         @param {groups} string [Download](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/lib/tags.d.ts) the full list on github for better search
         
         Same as the `pRandSpecificTags` but strictly for Group Search only.*/
        pRandGroup(string: groups, MoreLike?: boolean, data?: json): Promise<book>
        /**Same as the `pRandID` but will give you the properties of the selected random number.*/
        pRandom(data?: json, MoreLike?: boolean): Promise<book>
        /**@param {number} page specifies the page. Shows the Homepage of the selected URL. */
        pHomepage(page?: number): Promise<page>
        /**
         * @param {langauge} string only accepts 4 `string` **japanese**, **english**, **chinese** and **translated** (is this even a language). it also accepts shortcuts like **jp**, **japan**, **eng**, **china**.
         * @param {number} page specifies the page.*/
        pLanguagePage(string: language, page?: number): Promise<page>
        /**
         * @param {string} string some list of the searched string of `string`.
         * @param {number} page specifies the page. */
        pSearch(string: string, page?: number): Promise<page>
        /**
         * @param {tags} string Shows some list of the searched tag string of `string`.
         * @param {number} page specifies the page. */
        pTagPage(string: tags, page?: number): Promise<page>

    }
    export = Main;
}