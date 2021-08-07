"use strict";
const fetcher = require("./fetcher");
const cheerio = require("cheerio");

async function shorter(code,IsDiscord,RRoF,string) {
    const url = `https://nhentai.net/g/${code}/`

    //await HTML data from fetcher
    const data =await fetcher(url),$=cheerio.load(data);

    //declaration of the variables
    let tags='none'
    ,title='none'
    ,titleoc='none'
    ,cover='none'
    ,parodies='none'
    ,Lang='none'
    ,Ctg='none'
    ,Artist='none'
    ,chr='none'
    ,Groups='none'
    ,pages='none'
    ,dateUploaded='none'
    ,thumbs='none'
    ,tagenum=1
    ,Ctgnum=1
    ,parodiesnum=1
    ,Langnum=1
    ,chrnum=1
    ,Artistnum=1
    ,Groupsnum=1
    ,thumbsnum=1;

    //Loads data from the HTML to the Variables
    // MULTIPLE WHILE LOOPS GONE YEY

    const tagListAr = ['parodiesnum','parodies','chrnum','chr','tagenum','tags','Artistnum','Artist','Groupsnum','Groups','Langnum','Lang','Ctgnum','Ctg','end','end'];

    let Ccounter = 1;
    for(let yeet = 0;yeet < 999;){
        if(tagListAr[yeet] == 'end') break;
        while(eval(tagListAr[yeet]) < $(`section[id="tags"]>div:nth-child(${Ccounter})>span>a`).length + 1){
            eval(tagListAr[yeet + 1] + ' += `${$(`section[id="tags"]>div:nth-child(${Ccounter})>span>a:nth-child(${eval(tagListAr[yeet])})>span[class="name"]`).text()}, `');
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
    title = $('title').text().slice(0, -38);
    parodies = parodies.slice(0, -2);
    chr = chr.slice(0, -2);
    tags = tags.slice(0, -2);
    Lang = Lang.slice(0, -2);
    Ctg = Ctg.slice(0, -2);
    Groups = Groups.slice(0, -2);
    Artist = Artist.slice(0, -2);

    // for people who use this on discord bot
    if(IsDiscord) {
        let text = "";
        let regex = /lolicon|shotacon|beastiality|torture|minigirl|blood|guro|cannibalism|shota|loli/;
        if(regex.test(tags)){
            text = "DISCORD ToS: The doujin picked has a Tag that isn't allowed on Discord\n";
            if(RRoF && regex.test(string)) text = "DISCORD ToS: REROLL DENIED\n";
        } 
        if(text) throw text;
    }

    //return the variables
    if (title=="404 - Not Found") throw (`ERROR: ID is not valid please try another ID!`);
    return {
        id:code,
        url:url,
        title:title,
        title_original:titleoc,
        cover:cover,
        tags:tags,
        artist:Artist,
        group:Groups,
        category:Ctg,
        language:Lang,
        parodies:parodies,
        pages:pages,
        characters:chr,
        uploaded:dateUploaded,
        page_pics:thumbs
    }
}
module.exports = shorter;