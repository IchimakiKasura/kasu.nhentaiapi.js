#!/usr/bin/env node
// Prototype / feature | KASU'S NHENTAI CLI
const process = require("process");
const { log } = require("console");
const { connect } = require("http2")
const Parser = require("../lib/parser")
const help = `
nhentai [tag | code/ID] [options]

    options:
        --book          Set "Type" to book. (default
                        If no type setted)
        --page          Set "Type" to page. (Will default
                        if it detects the tags)
        --block         Add some filter?
                        (only work if --discord added).
        --dicord        enable discord. (Will stop the
                        process if a tag that is in
                        the list. Originally for
                        module. CLI is still a
                        prototype).
        --raw           show the full [Object].
                        (Not applicable on --page)
        --url           only https://nhentai.net
                        and https://nhentai.to are
                        accepted.
        help            show help.

    example for .net (book)
    nhentai 228922 --raw
    example for .to (book)
    nhentai 228922 --raw --url https://nhentai.to

    example for .net (page)
    nhentai tag/crossdresing --raw --page 1
    example for .to (page)
    nhentai characters/astolfo --raw --url https://nhentai.to --page 3
`;
(async()=>{
    let argument = process.argv.slice(2);
    if (argument[0] == "help") {
        log(help)
        process.exit(0)
    }
    if (argument.length) {
        let discord = false;
        let url = `https://nhentai.net`;
        let censored = "";
        let type = "";
        let page = 0;
        let raw = false;
        let input = "";
        // search for options
        argument.forEach((options,i)=>{
            switch(options){
                case "--book":
                    type = "book";
                    break;
                case "--page":
                    type = "page";
                    page = +argument[i+1]
                    break;
                case "--block":
                    censored = argument[i+1];
                break;
                case "--url":
                    url = argument[i+1];
                    if(!/https:\/\/nhentai\.(to|net)/.test(url)) {
                        log("Invalid url");
                        process.exit(1);
                    }
                    break;
                case "--raw":
                    raw = true;
                    break;
                case "--discord":
                    discord = true;
                    break;
                }
            })
        if (!type) {
            let ar = +argument.join().replace(/\D+/g,'');
            if (/[0-9]/.test(ar) & ar != 0){
                log('  ⚠️  "--type" not declared setting default: "book"')
                type = "book"
            } else {
                log('  ⚠️  "--type" not declared setting default: "page"')
                type = "page"
            }
        }
        if(type == "book") input = `${url}/g/${argument[0]}`;
            else input = `${url}/${argument[0]}`
        const client = connect(url);
        if (type == "book") {
            try{
                let resultBook = await Parser.book(input, client, {
                    "Censored Words": censored,
                    Discord: discord,
                })
                if (raw) {
                    log(resultBook)
                } else {
                    log(`
    ID:                 ${resultBook.id}
    🔗:                 ${resultBook.url}

    TITLE JAPANESE:     ${resultBook.title.originFull}
    TITLE ENGLISH:      ${resultBook.title.translatedFull}

    THUMBNAIL/COVER:    ${resultBook.images.cover}
    IMAGE SOURCE:       ${resultBook.images.page_source}

    PARODIES:           ${resultBook.tag_table.parodies}
    CHARACTERS:         ${resultBook.tag_table.characters}
    TAGS 🔞:            ${resultBook.tag_table.tag}
    ARTISTS:            ${resultBook.tag_table.artist}
    GROUPS:             ${resultBook.tag_table.groups}
    LANGUAGES:          ${resultBook.tag_table.languages}
    CATEGORIES:         ${resultBook.tag_table.categories}

    FAVORITES:          ${resultBook.favorites}
    📃:                 ${resultBook.number_pages}
    📅:                 ${resultBook.uploaded}
                    `)
                }
            } catch (e) {
                log('  ❗  Invalid ID')
                process.exit(1)
            }
        } else {
            if(raw) log('  ⚠️  "--page" declared! "--raw" is still wip on page command')
            try{
                let resultBook = await Parser.page(page, input, client)
                log(resultBook)
            } catch (e) {
                log('  ❗  Page number input is above the searched total pages!\n  ❗  Invalid input.')
                process.exit(1)
            }
        }
        client.close()
    }
})();
