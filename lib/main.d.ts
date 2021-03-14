// help
export = main;
declare class main {
    getID(ID?:string|number): {
        list: (data: {}) => Promise<any>;
        json: () => Promise<{
            base: {
                id: number;
                url: string;
                title: {
                    origin: string;
                    translated: string;
                };
                images: {
                    cover: string;
                    pages: string;
                };
                tag_table: {
                    parodies: string;
                    characters: string;
                    tag: string;
                    artist: string;
                    groups: string;
                    languages: string;
                    categories: string;
                };
                number_pages: string;
                uploaded: string;
            };
        }>;
    };
    pRandSpecificTags(string: string, data?: {}): Promise<any>;
    pRandTag(string: string, data?: {}): Promise<any>;
    pRandParody(string: string, data?: {}): Promise<any>;
    pRandArtist(strin?: string, data?: {}): Promise<any>;
    pRandGroup(string: string, data?: {}): Promise<any>;
    pRandom(data: {}): Promise<any>;
}
