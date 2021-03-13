const fetcher = require("./fetcher")
const cheerio = require("cheerio")

module.exports = async function shorter(code) {
    let url = `https://nhentai.net/g/${code}/`

    //await HTML data from fetcher
    let data = await fetcher(url)
    const $ = cheerio.load(data)

    //declaration of the variables
    let tags = ''
        , title = ''
        , titleoc = ''
        , cover = ''
        , parodies = ''
        , Lang = ''
        , Ctg = ''
        , Artist = ''
        , chr = ''
        , Groups = ''
        , pages = ''
        , dateUploaded
        , thumbs = ''
        , tagenum = 1
        , Ctgnum = 1
        , parodiesnum = 1
        , Langnum = 1
        , chrnum = 1
        , Artistnum = 1
        , Groupsnum = 1
        , thumbsnum = 1

    //Loads data from the HTML to the Variables
    //excuse the nested while func
    while (parodiesnum < $(`section[id="tags"]>div:nth-child(1)>span>a`).length + 1) {
        parodies += `${$(`section[id="tags"]>div:nth-child(1)>span>a:nth-child(${parodiesnum})>span[class="name"]`).text()}, `
        parodiesnum++
    }
    while (chrnum < $(`section[id="tags"]>div:nth-child(2)>span>a`).length + 1) {
        chr += `${$(`section[id="tags"]>div:nth-child(2)>span>a:nth-child(${chrnum})>span[class="name"]`).text()}, `
        chrnum++
    }
    while (tagenum < $(`section[id="tags"]>div:nth-child(3)>span>a`).length + 1) {
        tags += `${$(`section[id="tags"]>div:nth-child(3)>span>a:nth-child(${tagenum})>span[class="name"]`).text()}, `
        tagenum++
    }
    while (Artistnum < $(`section[id="tags"]>div:nth-child(4)>span>a`).length + 1) {
        Artist += `${$(`section[id="tags"]>div:nth-child(4)>span>a:nth-child(${Artistnum})>span[class="name"]`).text()}, `
        Artistnum++
    }
    while (Groupsnum < $(`section[id="tags"]>div:nth-child(5)>span>a`).length + 1) {
        Groups += `${$(`section[id="tags"]>div:nth-child(5)>span>a:nth-child(${Groupsnum})>span[class="name"]`).text()}, `
        Groupsnum++
    }
    while (Langnum < $(`section[id="tags"]>div:nth-child(6)>span>a`).length + 1) {
        Lang += `${$(`section[id="tags"]>div:nth-child(6)>span>a:nth-child(${Langnum})>span[class="name"]`).text()}, `
        Langnum++
    }
    while (Ctgnum < $(`section[id="tags"]>div:nth-child(7)>span>a`).length + 1) {
        Ctg += `${$(`section[id="tags"]>div:nth-child(7)>span>a:nth-child(${Ctgnum})>span[class="name"]`).text()}, `
        Ctgnum++
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
    parodies = parodies.slice(0, -2) || "none";
    chr = chr.slice(0, -2) || "none";
    tags = tags.slice(0, -2) || "none";
    Lang = Lang.slice(0, -2) || "none";
    Ctg = Ctg.slice(0, -2) || "none";
    Groups = Groups.slice(0, -2) || "none";
    Artist = Artist.slice(0, -2) || "none";

    //return the variables
    if (title == "404 - Not Found") {
        return;
    } else {
        return {
            id: code,
            url: url,
            title: title,
            title_original: titleoc,
            cover: cover,
            tags: tags,
            artist: Artist,
            group: Groups,
            category: Ctg,
            language: Lang,
            parodies: parodies,
            pages: pages,
            characters: chr,
            uploaded: dateUploaded,
            page_pics: thumbs
        }
    }
}