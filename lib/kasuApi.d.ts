/**Thank you for choosing this API library.*/
declare module "KasuNhentai" {
    
    /**Download Full list on github for maximum experience*/
    type tags = "39tei"|"3d"|"abortion"|"absorption"|"netorare"|"crossdressings"|"sister"|"sole-female"|"yuri"|"yaoi"|"zombie"

    interface Data {
        /**ID or Code or whatever you call.*/
        id: string,
        /**Url of the selected code.*/
        url: string,
        /**titles?*/
        title: {
            /**original.*/
            origin: string,
            /**トランスレイト??? wait it's supposed to be in english cuz' it's translated.*/
            translated: string
            /**original but its full version of it.*/
            originFull: string,
            /**YES ITS FULL VERSION OF THE TRANSLATED TITLE OF IT.*/
            translatedFull: string
        },
        /**images?*/
        images: {
            /**Doujin cover image.*/
            cover: string,
            /**Doujin image source.*/
            pages_source: string,
            /**Int specifies the image number page.*/
            pages(pages?: number): void
        },
        /**tags?*/
        tag_table: {
            /**I Like konosuba*/
            parodies: string,
            /**I love megumin*/
            characters: string,
            /**what?*/
            tag: string,
            /**I don't really know about this*/
            artist: string,
            /**Can't think 1 group tag.*/
            groups: string,
            /**english ofc.*/
            languages: string,
            /**ca*/
            categories: string,
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
    /**Idk why it named 0? pls help*/
    type PageInfo = [
        {
            /**Gives the Url.*/
            CurrentURL: string,
            /**idk*/
            typePage: string,
            /**Gives an index number of what page you are currently in.*/
            CurrentPage: number,
            /**Total arrays.*/
            Total: number,
            /**Total Pages ofc.*/
            TotalPage: string,
        }, ...{
            /**ID or Code or whatever you call.*/
            id: string,
            /**taitoru.*/
            title: string,
            /**Cover picture.*/
            thumbnail: string,
            /**It's just the combination of the currenturl with id innit.*/
            url: string,
            /**NANI TTE-*/
            languages: string,
    }[]]
    type json = (response: Data) => {}
    type returns = {
        /**Retrieve the response json object.*/
        json(data?: json): Promise<Data>
    }
    type connection = {
        /**start the connection?*/
        start(debug?: boolean): void
        /**close the connection?*/
        close(debug?: boolean): void
    } | "start"
    type _url = "https://nhentai.net" | "https://nhentai.to"
    type language = "japanese"|"japan"|"jp"|"english"|"eng"|"chinese"|"china"|"translated"
    /**You horni user.*/
    class Main {
        /**
         * `connection` has 1 inputs that can be accepted, start. Same as the connection function below. It just automatically start the connection without calling the connection property.

        `url` https://nhentai.net or https://nhentai.to

        `debug` If set to true It will show a log that shows that it is working and connected.
        */
        constructor(connection: connection, url: _url, debug: boolean)
        /**The Inputted URL will be used to connect. As of the 3.5.0 update the domain .to is now supported.
         
        https://nhentai.net or https://nhentai.to the https:// must be included.*/
        url: _url
        /**if you want to start the connection provided by the url.*/
        connection: connection
        /**If you're using this API on discord bot enable this to true
        
        default: `false`*/
        IsDiscord: boolean
        /**Add more blocked tags into the API
        
        Example:
         ```js
        blockedWords = "crossdressing brutality penetration"
        ```
        contributer: crackheadakira*/
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
        `ID`ー Accepts string of numbers or just numbers. Any letter is declined.
        
        Example
        ```js
        getID(12938 | "12938" | "https://nhentai.net/g/12938")
        ```
        */
        getID(ID: string | number): returns
        /**
        `returns` a random "Existing" Doujin number
        */
        pRandID(): Promise<number>
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
        pRandSpecificTags(string?: string, data?: json): Promise<Data>
        /**
        Same as the `pRandSpecificTags` but strictly for Tag Search only.
        
        If a non-Tag entered will cause an error.
        */
        pRandTag(string?: tags, data?: json): Promise<Data>
        /**Same as the `pRandSpecificTags` but strictly for Parody Search only.*/
        pRandParody(string?: string, data?: json): Promise<Data>
        /**Same as the `pRandSpecificTags` but strictly for Artist Search only.*/
        pRandArtist(string?: string, data?: json): Promise<Data>
        /**Same as the `pRandSpecificTags` but strictly for Group Search only.*/
        pRandGroup(string?: string, data?: json): Promise<Data>
        /**Same as the `pRandID` but will give you the properties of the selected random number.*/
        pRandom(data?: json): Promise<Data>
        /**`int` specifies the page. Shows the Homepage of the selected URL. */
        pHomepage(page?: number): Promise<PageInfo>
        /**`str` only accepts 4 string **japanese**, **english**, **chinese** and **translated** (is this even a language). it also accepts shortcuts like **jp**, **japan**, **eng**, **china**. `int` specifies the page. */
        pLanguagePage(string: language, page?: number): Promise<PageInfo>
        /**Shows some list of the searched string of `str`. `int` specifies the page. */
        pSearch(string: string, page?: number): Promise<PageInfo>
        /**Shows some list of the searched tag string of `str`. `int` specifies the page. */
        pTagePage(string: tags, page?: number): Promise<PageInfo>

    }
    export = Main;
}