export type page = [
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
            TotalPage: number,
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

export type book = {
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
    /**damn that many people ey?*/
    favorites: number,
    /**haha 69 pages seems cool.*/
    number_pages: number,
    /**
    Hokusai made The Dream of the Fisherman's Wife in 1814, the earliest known Tentacle hentai.

    In 1722 the government made a law banning hentai manga, which means it was common even earlier.

    Suzumi-fune is probobly the oldest hentai anime, it's from 1932.
    */
    uploaded: string,
    /**ONLY AVAILABLE ON THE NHENTAI.NET DOMAIN, DOES NOT EXIST IN NHENTAI.TO.*/
    MoreLikeThis: page
}