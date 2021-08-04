declare module "kasu.nhentaiapi.js" {
    type list={};type json={};type Data=Function;
    class main {
        /**
        * @param {} ID {Required} Accepts string of numbers or just numbers. Any letter is declined.
        * @returns list function
        * @returns json function
        */
        getID:(ID:String|Number) => Promise<list|json>
        /**
        * @returns It returns a random "Existing" Doujin number
        */
        pRandID:() => Promise<Number>
        /**
        * Perhaps this is the most useful Function i've created.
        * @param {String} string {Required} spaces must be a "+" plus sign
        * @example pRandSpecificTags("konosuba+aqua+sole-female")
        * @param {Function} data Use this if you want to get its properties like images or links etc.
        * @returns
        */
        pRandSpecificTags:(string:String, data: Function) => Promise<Number|Data>
        /**
        * Same as the "pRandSpecificTags" but strictly for Tag only. If a non-Tag entered will cause an error.
        * @returns
        */
        pRandTag:(string:String, data: Function) => Promise<Number|Data>
        /**
        * Same as the "pRandSpecificTags" but strictly for Parody only. If a non-Parody entered will cause an error.
        * @returns
        */
        pRandParody:(string:String, data: Function) => Promise<Number|Data>
        /**
        * Same as the "pRandSpecificTags" but strictly for Artist only. If a non-Artist entered will cause an error.
        * @returns
        */
        pRandArtist:(string:String, data: Function) => Promise<Number|Data>
        /**
        * Same as the "pRandSpecificTags" but strictly for Group only. If a non-Group entered will cause an error.
        * @returns
        */
        pRandGroup:(string:String, data: Function) => Promise<Number|Data>
        /**
        * Same as the "pRandID" but will give you the properties of the selected random number.
        * @returns
        */
        pRandom:(data: Function) => Promise<Data>
    }
    export = main
}
