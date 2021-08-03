const fetcher = require("./fetcher")
const cheerio = require("cheerio")

async function shorter(code) {
    const url = `https://nhentai.net/g/${code}/`

    //await HTML data from fetcher
    const data =await fetcher(url),$=cheerio.load(data);

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
    ,dateUploaded
    , thumbs=''
    , tagenum=1
    , Ctgnum=1
    , parodiesnum=1
    , Langnum=1
    , chrnum=1
    , Artistnum=1
    , Groupsnum=1
    , thumbsnum=1;

    //Loads data from the HTML to the Variables
    // MULTIPLE WHILE LOOPS GONE YEY

    const newArray = ['parodiesnum','parodies','chrnum','chr','tagenum','tags','Artistnum','Artist','Groupsnum','Groups','Langnum','Lang','Ctgnum','Ctg','end','end']

    let Ccounter = 1;
    for(let yeet = 0;yeet < 999;){
        if(newArray[yeet] == 'end') break;
        while(eval(newArray[yeet]) < $(`section[id="tags"]>div:nth-child(${Ccounter})>span>a`).length + 1){
            eval(newArray[yeet + 1] + " += " + '`${$(`section[id="tags"]>div:nth-child(${Ccounter})>span>a:nth-child(${eval(newArray[yeet])})>span[class="name"]`).text()}, `')
            eval(newArray[yeet]+'++');
        }
        Ccounter += 1;
        yeet += 2;
    }

    while (thumbsnum < $(`div.thumbs>div>a`).length + 1) {
        thumbs += `${$(`div.thumbs>div:nth-child(${thumbsnum})>a>img`).attr("data-src")} `
        thumbsnum++
    }

    thumbs = thumbs.split(" ")
    dateUploaded = $(`section[id="tags"]>div:nth-child(9)>span`).text()
    pages = $(`section[id="tags"]>div:nth-child(8)>span>a`).text()
    titleoc = $(`div#info>h2>span.pretty`).text()
    cover = $('div[id="cover"]>a>img').attr('data-src')
    title = $('title').text().slice(0, -38)
    parodies = parodies.slice(0, -2) || "none"
    chr = chr.slice(0, -2) || "none"
    tags = tags.slice(0, -2) || "none"
    Lang = Lang.slice(0, -2) || "none"
    Ctg = Ctg.slice(0, -2) || "none"
    Groups = Groups.slice(0, -2) || "none"
    Artist = Artist.slice(0, -2) || "none"

    //return the variables
    if (title=="404 - Not Found") {
        console.error(`ERROR: ID is not valid please try another ID!`)
    } else return {
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