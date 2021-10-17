"use strict";
const fetcher = require("./fetcher"),
load = require("cheerio").load,
performance = require('perf_hooks').performance

    // DEBUG
    /**************/
    /****/  let Debug = true;
    /****/
    /****/  function debugIteration(string, start){
    /****/      if(Debug) console.log(string, +start.toFixed(2))
    /****/  }
    /**************/


async function shorter(code, IsDiscord, RRoF, string, customBlockwords, IgnoreNone, requestHeaders) {
    var start = performance.now()
    const url = `https://nhentai.net/g/${code}`,
    
        //await HTML data from fetcher
        data = await fetcher(url,requestHeaders), $ = load(data),

        //shortcut for the $("").text()
        getText = (...args) => {return $(...args).text()}

        // console.log(data)
        
        // console.log($.html())
    //declaration of the variables
    let tags = ''
        , title = ''
        , titleoc = ''
        , titleFull = ''
        , titleocFull = ''
        , cover = ''
        , parodies = ''
        , Lang = ''
        , Ctg = ''
        , Artist = ''
        , chr = ''
        , Groups = ''
        , pages = ''
        , dateUploaded = ''
        , thumbs = ''
        , tagenum = 1
        , Ctgnum = 1
        , parodiesnum = 1
        , Langnum = 1
        , chrnum = 1
        , Artistnum = 1
        , Groupsnum = 1
        , thumbsnum = 1
        , Ccounter = 1
        , yeet = 0
        ,text = ""
        ,regex = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/;

        if (customBlockwords) {
            if (typeof (customBlockwords) === "number") throw `ERROR: 'blockedWords' cannot contain such numbers, It must contain strings.`
            customBlockwords = customBlockwords.split(/ |,/g).filter(n=>n) // lol
            regex = new RegExp(regex.source.replace("|loli", `|loli|${customBlockwords.join("|")}`));
        }

    //Loads data from the HTML to the Variables
    //haha eval go brr
    const tagListAr = ['parodiesnum', 'parodies', 'chrnum', 'chr', 'tagenum', 'tags', 'Artistnum', 'Artist', 'Groupsnum', 'Groups', 'Langnum', 'Lang', 'Ctgnum', 'Ctg', 'end', 'end'];
    
    /****************/
    /****/var starttag = performance.now()
    /****************/

    for(;;) {

        // end the loop
        if (tagListAr[yeet] == 'end') {
            let setVar = 0;
            for(;;) {
                if (tagListAr[setVar + 1] == 'end') break;
                eval(tagListAr[setVar + 1] + "= eval(tagListAr[setVar+1]+\".slice(0,-2)||'none'\")")
                setVar += 2
            }
            break;
        }
        
        // check the tags so it can re-roll fast af no more waiting other tags
        if(tagListAr[yeet] == 'Artistnum'){
            if (IsDiscord) {
                if (regex.test(tags) || regex.test(string)) {
                    text = "DISCORD ToS: The doujin picked has a Tag that isn't allowed on Discord\n";
                    if (RRoF && regex.test(string)) text = "DISCORD ToS: REROLL DENIED\n";

                    /****************/
                    /****/ debugIteration('(SHORTER.js / discord) took to iterate: ', performance.now() - start)
                    /****************/
                    
                }
                if (text) throw text;
            }
        }

        while (eval(tagListAr[yeet]) < $(`section[id="tags"]>div:nth-child(${Ccounter})>span>a`).length + 1) {
            eval(tagListAr[yeet + 1] + ' += `${getText(`section[id="tags"]>div:nth-child(${Ccounter})>span>a:nth-child(${eval(tagListAr[yeet])})>span[class="name"]`)}, `');
            eval(tagListAr[yeet] + '++');
        }
        Ccounter += 1; yeet += 2;
    }
    
    $(`div.thumbs>div>a`).each((i)=>{
        thumbs += `${$(`div.thumbs>div:nth-child(${i+1})>a>img`).attr("data-src")} `;
    })
    
    //#region GetText
    thumbs = thumbs.split(" ").filter(n => n);
    dateUploaded = getText(`section[id="tags"]>div:nth-child(9)>span`);
    pages = getText(`section[id="tags"]>div:nth-child(8)>span>a`);
    title = getText('div#info>h1>span.pretty');
    titleoc = getText(`div#info>h2>span.pretty`);
    titleFull = getText('div#info>h1');
    titleocFull = getText(`div#info>h2`);
    cover = $('div[id="cover"]>a>img').attr('data-src');
    //#endregion

    /****************/
    /****/ debugIteration('(SHORTER.js / Sorting tag) took to iterate: ', performance.now() - starttag)
    /****************/

    if (title == "404 - Not Found") throw `ERROR: ID is not valid please try another ID!`;

    let list =  {
        id: code,
        url: url,
        title: {
            origin: titleoc,
            translated: title,
            originFull: titleocFull,
            translatedFull: titleFull
        },
        images: {
            cover: cover,
            pages: thumbs
        },
        tag_table: {
            parodies: parodies,
            characters: chr,
            tag: tags,
            artist: Artist,
            groups: Groups,
            languages: Lang,
            categories: Ctg,
        },
        number_pages: pages,
        uploaded: dateUploaded
    }

    // idk it kinda annoys me seeing the tags empty
    if(IgnoreNone) {
        for(let keys of Object.entries(list)){
            if(typeof(keys[1]) === "object") {
                for(let yet of Object.entries((eval(`list.${keys[0]}`)))){
                    if(yet[1] == "none") eval(`delete list.${keys[0]}.${yet[0]}`)
                }
            }
        }
    }

    /****************/
    /****/ debugIteration('(SHORTER.js) took to iterate: ', performance.now() - start)
    /****************/

    return list
}
module.exports = shorter;