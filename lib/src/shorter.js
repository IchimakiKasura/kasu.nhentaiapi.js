"use strict";
const fetcher = require("./fetcher"),
 { load } = require("cheerio");

async function shorter(code,IsDiscord,RRoF,string,customBlockwords) {
    const url = `https://nhentai.net/g/${code}/`,

    //await HTML data from fetcher
    data = await fetcher(url),$=load(data);

    //declaration of the variables
    let tags=''
    ,title=''
    ,titleoc=''
    ,cover=''
    ,parodies=''
    ,Lang=''
    ,Ctg=''
    ,Artist=''
    ,chr=''
    ,Groups=''
    ,pages=''
    ,dateUploaded=''
    ,thumbs=''
    ,tagenum=1
    ,Ctgnum=1
    ,parodiesnum=1
    ,Langnum=1
    ,chrnum=1
    ,Artistnum=1
    ,Groupsnum=1
    ,thumbsnum=1
    ,Ccounter = 1
    ,yeet=0;

    //Loads data from the HTML to the Variables
    // MULTIPLE WHILE LOOPS GONE YEY
    const tagListAr = ['parodiesnum','parodies','chrnum','chr','tagenum','tags','Artistnum','Artist','Groupsnum','Groups','Langnum','Lang','Ctgnum','Ctg','end','end'];
    while(yeet<999){
        if(tagListAr[yeet]=='end'){
            let setVar=0;
            while(setVar<999){
                if(tagListAr[setVar+1] == 'end') break;
                eval(tagListAr[setVar+1]+"= eval(tagListAr[setVar+1]+\".slice(0,-2)||'none'\")")
                setVar+=2
            }
            break;
        }
        while(eval(tagListAr[yeet]) < $(`section[id="tags"]>div:nth-child(${Ccounter})>span>a`).length+1){
            eval(tagListAr[yeet+1] + ' += `${$(`section[id="tags"]>div:nth-child(${Ccounter})>span>a:nth-child(${eval(tagListAr[yeet])})>span[class="name"]`).text()}, `');
            eval(tagListAr[yeet]+'++');
        }
        Ccounter += 1; yeet += 2;
    }

    while (thumbsnum < $(`div.thumbs>div>a`).length + 1) {
        thumbs += `${$(`div.thumbs>div:nth-child(${thumbsnum})>a>img`).attr("data-src")} `;
        thumbsnum++;
    }

    thumbs = thumbs.split(" ");
    dateUploaded = $(`section[id="tags"]>div:nth-child(9)>span`).text();
    pages = $(`section[id="tags"]>div:nth-child(8)>span>a`).text();
    titleoc = $(`div#info>h2>span.pretty`).text();
    cover = $('div[id="cover"]>a>img').attr('data-src');
    title = $('title').text().slice(0,-38);

    if(IsDiscord) {
        let text = "";
        let regex = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/;
        if(customBlockwords){
            if(typeof(customBlockwords) === "number") throw `ERROR: 'blockedWords' cannot contain such numbers, It must contain strings.`
            customBlockwords = customBlockwords.split(/ |,/g) // lol
            regex = new RegExp(regex.source.replace("|loli", `|loli|${customBlockwords.join("|")}`));
        }
        if(regex.test(tags)){
            if(regex.test(string)) {
                text = "DISCORD ToS: The doujin picked has a Tag that isn't allowed on Discord\n";
                if(RRoF) text = "DISCORD ToS: REROLL DENIED\n";
            }
        } 
        if(text) throw text;
    }

    if (title=="404 - Not Found") throw `ERROR: ID is not valid please try another ID!`;
    return {
        id:code,
        url:url,
        title: {
            origin:titleoc,translated:title
        },
        images: {
            cover:cover,
            pages:thumbs
        },
        tag_table: {
            parodies:parodies,
            characters:chr,
            tag:tags,
            artist:Artist,
            groups:Groups,
            languages:Lang,
            categories:Ctg,
        },
        number_pages: pages,
        uploaded: dateUploaded
    }
}
module.exports = shorter;