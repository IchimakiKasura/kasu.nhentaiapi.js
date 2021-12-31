"use strict";

class RegexComponent
{
    static bookThumbRegex = /<img(\n|.*)?src="(?<thumbs>.*?cover.*?)"/;
    static bookTimeRegex = /<time (.*?)>(?<date>.*)<\/time>/;
    static bookSourceImgRegex = /\/cover\.(jpg|png)/g;
    static errorRegex = /<h2>(0|No) [r|R]esults/;

    static bookNETFormat = /JSON\.parse\("(?<parse>.*)"\)/;

    static bookTOFormat = /N\.gallery\((?<parse>.*?)\);/s;
    static bookTOReplacer = /[\r|\n]+| /g;

    static pageFormat = /<div class="gallery".*?caption">.*?</gs;
    static pageTotalFormat = /page=(?<page>.*?)"/g;
    static pageReplacer = /https:\/\/nhentai\.(to|net)\/search|\?q=|\/|&/g;

    static tagRegex = /https:\/\/nhentai\.(to|net)|\/language|\/tag|\/character|\/artist|\/parody|\/group|\/category|\//g;
    static URLregex = /language\/.*|tag\/.*|character\/.*|artist\/.*|parody\/.*|group\/.*|category\/.*|(search\/|search\?q=).*|\?q=.*/;
    static blockedRegex = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/;
    static titleRegex = /\[.*?\]|\(.*?\)/g;
}

module.exports = RegexComponent;
