"use strict";
let Parser = require("../lib/parser");
let Main = require("../dist/kasuApi");
const { connect } = require("http2");
const { exec } = require('child_process');
const { log } = require("console");
const { performance } = require("perf_hooks");

// eslint-disable-next-line no-undef
const cli = process.argv.slice(2)[0]

if (cli == "build") {
    log("[BUILD CONFIRMED]\n\n")
    Parser = require("../lib/parser.min");
    Main = require("../dist/kasuApi.min");
} else log("[BUILD UNCONFIRMED]\n\n")

// haha
async function bruhMocha(callback, line) {
    let status = ''
    let result = ''
    let tag = ''
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
            if (status.match('passed')) log(`       \x1b[2mtags: ${tag}\n       id: ${result.id}\n       time took: ${end}\x1b[0m`);
        },
        page: (text) => {
            log(`\n${status} \x1b[36m${text}\x1b[0m\x1b[2m [Function line: ${line}]\x1b[0m`);
            if (status.match('error')) log(`       \x1b[2mproblem: ${error}\n       time took: ${end}\x1b[0m`);
            if (status.match('passed')) log(`       \x1b[2mTotalPages: ${result[0].TotalPage}\n       typePage: ${result[0].typePage}\n       first Array ID: ${result[1].id}\n       time took: ${end}\x1b[0m\x1b[0m`);
        }
    }
}
let execPromise = (command, name) => {
    return new Promise(function (resolve) {
        exec(command, (e, s) => {
            if (s) resolve(`   ❌  \x1b[31merror\x1b[0m: ${name}`);
            resolve(`   ✔️  \x1b[32mpassed\x1b[0m: ${name}`);
        });
    });
}
(async () => {
    log(`Eslint:\n`)
    let start = performance.now()
    log(await execPromise("call node_modules/.bin/eslint lib/kasuApi.js", 'kasuApi.js'))
    let end = performance.now() - start
    end = end.toFixed(2)
    log(`       \x1b[2mtime took: ${end}\x1b[0m`);
    start = performance.now()
    log(await execPromise("call node_modules/.bin/eslint lib/src/parser.js", 'Parser.js'))
    end = performance.now() - start
    end = end.toFixed(2)
    log(`       \x1b[2mtime took: ${end}\x1b[0m`);

    // nhentai.net
    log(`\nNhentai.net:`)
    log(`parser (.net):`)
    let client = connect("https://nhentai.net")
        ; (await bruhMocha(Parser.book('https://nhentai.net/g/278407', client), '206:18')).book('book')
        ; (await bruhMocha(Parser.page(5, 'https://nhentai.net/character/astolfo', client), '397:18')).page('page')
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
        log('\n   ✔️  \x1b[32mpassed\x1b[0m: \x1b[33mConnection start\x1b[0m \x1b[2m[Function line: 19:13]\x1b[0m')
        log(`       \x1b[2mParameters:\n        connection: ${api.connection.status()}\n        url: ${api.url}\n        time took: ${end}\x1b[0m`);
        
    } catch {
        end = performance.now() - start;
        end = end.toFixed(2)
        log('\n   ❌  \x1b[31merror\x1b[0m: x1b[33mConnection start\x1b[0m \x1b[2m[Function line: 19:13]\x1b[0m')
        log(`       \x1b[2mtime took: ${end}\x1b[0m`);
    }
    log(`\nClass methods etc (selected) (.net):`)
        ; (await bruhMocha(api.getID(228722).json(), '128:9')).book('getID')
        ; (await bruhMocha(api.pRandSpecificTags("astolfo"), '105:15')).book('pRandSpecificTags')
        ; (await bruhMocha(api.pRandom(), '160:15')).book('pRandom')
        ; (await bruhMocha(api.pHomepage(2), '187:15')).page('pHomepage')
        ; (await bruhMocha(api.pLanguagePage("jp", 5), '192:15')).page('pLanguagePage')
        ; (await bruhMocha(api.pSearch("astolfo", 3), '215:15')).page('pSearch')
        ; (await bruhMocha(api.pTagPage("crossdressing", 1), '226:15')).page('pTagPage')
    api.connection.close()

    // nhentai.to
    log(`\nNhentai.to:`)
    log(`parser (.to):`)
    client = connect("https://nhentai.to")
        ; (await bruhMocha(Parser.book('https://nhentai.to/g/278407', client), '206:18')).book('book')
        ; (await bruhMocha(Parser.page(5, 'https://nhentai.to/character/astolfo', client), '397:18')).page('page')
    client.close()
    log(`\nConstructor (.to): \n`)
    start = performance.now()
    try {
        api = new Main('start', "https://nhentai.to")
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
    log(`\nClass methods etc (selected) (.to):`)
        ; (await bruhMocha(api.getID(228722).json(), '128:9')).book('getID')
        ; (await bruhMocha(api.pRandSpecificTags("astolfo"), '105:15')).book('pRandSpecificTags')
        ; (await bruhMocha(api.pRandom(), '160:15')).book('pRandom')
        ; (await bruhMocha(api.pHomepage(2), '187:15')).page('pHomepage')
        ; (await bruhMocha(api.pLanguagePage("jp", 5), '192:15')).page('pLanguagePage')
        ; (await bruhMocha(api.pSearch("astolfo", 3), '215:15')).page('pSearch')
        ; (await bruhMocha(api.pTagPage("crossdressing", 1), '226:15')).page('pTagPage')
    api.connection.close()
})();