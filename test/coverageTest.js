"use strict";
let Parser = require("../lib/parser");
let Main = require("../dist/kasuApi");
const { connect } = require("http2");
const { log } = require("console");
const { performance } = require("perf_hooks");

/** Coverage should be 100% but the if and else statements always make the coverage low, they're just an error and hard to test.
*  File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
*----------------------------------------------------------------------------
*  kasuApi.js |   93.15 |       75 |     100 |     100 | 60, 90, 142-194
*  parser.js  |   83.61 |    70.29 |   83.33 |      90 | 70-72, 187-189, 201, 256-257, 274-277, 283-284
*  Excluding parser.js (its just a parsing so there's a lot of if/else and try/catch for error handling) totaling the kasuApi 100% coverage
*/

async function bruhMocha(callback, line) {
    let status = ''
    let result = ''
    let tag = 'no tag available'
    let start = performance.now()
    let end;
    let error = ''
    try {
        result = await callback
        end = performance.now() - start
        end = end.toFixed(2)
        status = '   ✔️  \x1b[32mpassed\x1b[0m:';
    } catch (e) {
        error = e
        status = '   ❌ \x1b[31merror\x1b[0m :';
        end = performance.now() - start
        end = end.toFixed(2)
    }
    try{
        // if results go haha error
        tag = result.tag_table.tag
        if (tag.length > 85) {
            tag = tag.substring(0, 85) + "..."
        }
    } catch {
        //burp
    }

    return {
        book: (text) => {
            log(`\n${status} \x1b[36m${text}\x1b[0m\x1b[2m [Function line: ${line}]\x1b[0m`);
            if (status.match('error')) log(`       \x1b[2mproblem: ${error}\n       time took: ${end}\x1b[0m`);
            if (status.match('passed')) log(`       \x1b[2mtags: ${tag}\n       id: ${result.id||result}\n       time took: ${end}\x1b[0m`);
        },
        page: (text) => {
            log(`\n${status} \x1b[36m${text}\x1b[0m\x1b[2m [Function line: ${line}]\x1b[0m`);
            if (status.match('error')) log(`       \x1b[2mproblem: ${error}\n       time took: ${end}\x1b[0m`);
            if (status.match('passed')) log(`       \x1b[2mTotalPages: ${result[0].TotalPage}\n       typePage: ${result[0].typePage}\n       first Array ID: ${result[1].id}\n       time took: ${end}\x1b[0m\x1b[0m`);
        },
        property: (text) => {
            log(`\n${status} \x1b[36m${text}\x1b[0m\x1b[2m [Function line: ${line}]\x1b[0m`);
            if (status.match('error')) log(`       \x1b[2mproblem: ${error}\n       time took: ${end}\x1b[0m`);
            if (status.match('passed')) log(`       \x1b[2mresults: ${result}\n       time took: ${end}\x1b[0m`);
        }
    }
}
let start, end;
(async () => {
    // nhentai.net
    log(`\nNhentai.net:`)
    log(`parser (.net):`)
    let client = connect("https://nhentai.net")
        ; (await bruhMocha(Parser.book('https://nhentai.net/g/278407', client), '146:5')).book('book')
        ; (await bruhMocha(Parser.page(5, 'https://nhentai.net/character/astolfo', client), '269:5')).page('page')
    client.close()
    log(`\nConstructor (.net): \n`)
    let api;
    start = performance.now()
    try {
        api = new Main()
        end = performance.now() - start;
        end = end.toFixed(2)
        log('   ✔️  \x1b[32mpassed\x1b[0m: \x1b[33mnew constructor\x1b[0m \x1b[2m[Function line: 9:5]\x1b[0m')
        log(`       \x1b[2mParameters:\n        connection: ${api.connection.status()}\n        url: ${api.url}\n        time took: ${end}\x1b[0m`);
    } catch {
        end = performance.now() - start;
        end = end.toFixed(2)
        log('   ❌  \x1b[31merror\x1b[0m: \x1b[33mnew constructor\x1b[0m \x1b[2m[Function 9:5]\x1b[0m')
        log(`       \x1b[2mtime took: ${end}\x1b[0m`);
    }
    try {
        api.connection.start()
        end = performance.now() - start;
        end = end.toFixed(2)
        log('\n   ✔️  \x1b[32mpassed\x1b[0m: \x1b[33mConnection start\x1b[0m \x1b[2m[Function line: 18:13]\x1b[0m')
        log(`       \x1b[2mParameters:\n        connection: ${api.connection.status()}\n        url: ${api.url}\n        time took: ${end}\x1b[0m`);
        
    } catch {
        end = performance.now() - start;
        end = end.toFixed(2)
        log('\n   ❌  \x1b[31merror\x1b[0m: x1b[33mConnection start\x1b[0m \x1b[2m[Function line: 18:13]\x1b[0m')
        log(`       \x1b[2mtime took: ${end}\x1b[0m`);
    }
    log(`\nClass methods etc (.net):`)
        ; (await bruhMocha(api.getID(228722).json(), '117:9')).book('getID')
        ; (await bruhMocha(api.pRandSpecificTags("astolfo"), '96:9')).book('pRandSpecificTags')
        ; (await bruhMocha(api.pRandom(), '148:9')).book('pRandom')
        ; (await bruhMocha(api.pRandID(), '165:9')).book('pRandID')
        ; (await bruhMocha(api.pRandTag("crossdressing"), '103:9')).book('pRandID')
        ; (await bruhMocha(api.pRandParody("kono subarashii sekai ni syukufuku o"), '104:9')).book('pRandParody')
        ; (await bruhMocha(api.pRandArtist("zinno"), '105:9')).book('pRandArtist')
        ; (await bruhMocha(api.pRandGroup("saisons"), '106:9')).book('pRandGroup')
        ; (await bruhMocha(api.pHomepage(2), '173:9')).page('pHomepage')
        ; (await bruhMocha(api.pLanguagePage("jp", 5), '178:9')).page('pLanguagePage')
        ; (await bruhMocha(api.pSearch("astolfo", 3), '196:9')).page('pSearch')
        ; (await bruhMocha(api.pTagPage("crossdressing", 1), '204:9')).page('pTagPage')
    log(`\nClass properties etc (selected) (.net):`)
        ; (await bruhMocha(api.IsDiscord = false, '12:9')).property('IsDiscord')
        ; (await bruhMocha(api.blockedWords = "", '13:9')).property('blockedWords')
        ; (await bruhMocha(api.ReRollonFail = false, '14:9')).property('ReRollonFail')
        ; (await bruhMocha(api.Ignorenone = false, '15:9')).property('Ignorenone')

    api.connection.close()

    log(`\nNhentai.to:`)
    log(`parser (.to):`)
    client = connect("https://nhentai.to")
        ; (await bruhMocha(Parser.book('https://nhentai.to/g/278407', client), '146:5')).book('book')
        ; (await bruhMocha(Parser.page(5, 'https://nhentai.to/character/astolfo', client), '269:5')).page('page')
    client.close()
    log(`\nConstructor (.to): \n`)
    start = performance.now()
    try {
        api = new Main()
        api.url = "https://nhentai.to"
        end = performance.now() - start;
        end = end.toFixed(2)
        log('   ✔️  \x1b[32mpassed\x1b[0m: \x1b[33mnew constructor\x1b[0m \x1b[2m[Function line: 9:5]\x1b[0m')
        log(`       \x1b[2mParameters:\n        connection: ${api.connection.status()}\n        url: ${api.url}\n        time took: ${end}\x1b[0m`);
    } catch {
        end = performance.now() - start;
        end = end.toFixed(2)
        log('   ❌  \x1b[31merror\x1b[0m: \x1b[33mnew constructor\x1b[0m \x1b[2m[Function 9:5]\x1b[0m')
        log(`       \x1b[2mtime took: ${end}\x1b[0m`);
    }
    try {
        api.connection.start()
        end = performance.now() - start;
        end = end.toFixed(2)
        log('\n   ✔️  \x1b[32mpassed\x1b[0m: \x1b[33mConnection start\x1b[0m \x1b[2m[Function line: 18:13]\x1b[0m')
        log(`       \x1b[2mParameters:\n        connection: ${api.connection.status()}\n        url: ${api.url}\n        time took: ${end}\x1b[0m`);
        
    } catch {
        end = performance.now() - start;
        end = end.toFixed(2)
        log('\n   ❌  \x1b[31merror\x1b[0m: x1b[33mConnection start\x1b[0m \x1b[2m[Function line: 18:13]\x1b[0m')
        log(`       \x1b[2mtime took: ${end}\x1b[0m`);
    }
    log(`\nClass methods etc (.to):`)
        ; (await bruhMocha(api.getID(228722).json(), '117:9')).book('getID')
        ; (await bruhMocha(api.pRandSpecificTags("astolfo"), '96:9')).book('pRandSpecificTags')
        ; (await bruhMocha(api.pRandom(), '148:9')).book('pRandom')
        ; (await bruhMocha(api.pRandID(), '165:9')).book('pRandID')
        ; (await bruhMocha(api.pRandTag("crossdressing"), '103:9')).book('pRandID')
        ; (await bruhMocha(api.pRandParody("kono subarashii sekai ni syukufuku o"), '104:9')).book('pRandParody')
        ; (await bruhMocha(api.pRandArtist("zinno"), '105:9')).book('pRandArtist')
        ; (await bruhMocha(api.pRandGroup("saisons"), '106:9')).book('pRandGroup')
        ; (await bruhMocha(api.pHomepage(2), '173:9')).page('pHomepage')
        ; (await bruhMocha(api.pLanguagePage("jp", 5), '178:9')).page('pLanguagePage')
        ; (await bruhMocha(api.pSearch("astolfo", 3), '196:9')).page('pSearch')
        ; (await bruhMocha(api.pTagPage("crossdressing", 1), '204:9')).page('pTagPage')
    log(`\nClass properties etc (selected) (.net):`)
        ; (await bruhMocha(api.IsDiscord = false, '12:9')).property('IsDiscord')
        ; (await bruhMocha(api.blockedWords = "", '13:9')).property('blockedWords')
        ; (await bruhMocha(api.ReRollonFail = false, '14:9')).property('ReRollonFail')
        ; (await bruhMocha(api.Ignorenone = false, '15:9')).property('Ignorenone')
    api.connection.close()
})();