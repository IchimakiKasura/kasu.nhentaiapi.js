declare module "kasu.nhentaiapi.js" {
    type list={};type json={};type Data=Function;
    class main {
        /**
        * @param {} ID {Required} Accepts string of numbers or just numbers. Any letter is declined.
        * @param {} DiscordTOS {optional} automatically block/send an error if it encounter a tag that would violate discord TOS
        * @returns list function
        * @returns json function
        */
        getID:(ID:String|Number,DiscordTOS:boolean) => Promise<list|json>
        /**
        * @returns It returns a random "Existing" Doujin number
        */
        pRandID:() => Promise<Number>
        /**
        * Perhaps this is the most useful Function i've created.
        * @param {String} string {Required} spaces must be a "+" plus sign
        * @example pRandSpecificTags("konosuba+aqua+sole-female")
        * @param {Function} data {optional} Use this if you want to get its properties like images or links etc.
        * @param {} DiscordTOS {optional} automatically block/send an error if it encounter a tag that would violate discord TOS
        * @returns
        */
        pRandSpecificTags:(string:String, data: Function,DiscordTOS:boolean) => Promise<Number|Data>
        /**
        * Same as the "pRandSpecificTags" but strictly for Tag only. If a non-Tag entered will cause an error.
        * @param {} DiscordTOS {optional} automatically block/send an error if it encounter a tag that would violate discord TOS
        * @returns
        */
        pRandTag:(string:String, data: Function,DiscordTOS:boolean) => Promise<Number|Data>
        /**
        * Same as the "pRandSpecificTags" but strictly for Parody only. If a non-Parody entered will cause an error.
        * @param {} DiscordTOS {optional} automatically block/send an error if it encounter a tag that would violate discord TOS
        * @returns
        */
        pRandParody:(string:String, data: Function,DiscordTOS:boolean) => Promise<Number|Data>
        /**
        * Same as the "pRandSpecificTags" but strictly for Artist only. If a non-Artist entered will cause an error.
        * @param {} DiscordTOS {optional} automatically block/send an error if it encounter a tag that would violate discord TOS
        * @returns
        */
        pRandArtist:(string:String, data: Function,DiscordTOS:boolean) => Promise<Number|Data>
        /**
        * Same as the "pRandSpecificTags" but strictly for Group only. If a non-Group entered will cause an error.
        * @param {} DiscordTOS {optional} automatically block/send an error if it encounter a tag that would violate discord TOS
        * @returns
        */
        pRandGroup:(string:String, data: Function,DiscordTOS:boolean) => Promise<Number|Data>
        /**
        * Same as the "pRandID" but will give you the properties of the selected random number.
        * @param {} DiscordTOS {optional} automatically block/send an error if it encounter a tag that would violate discord TOS
        * @returns
        */
        pRandom:(data: Function,DiscordTOS:boolean) => Promise<Data>
    }
    export = main
}
