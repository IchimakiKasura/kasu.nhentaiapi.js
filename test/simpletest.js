"use strict";
const API = require("../dist/kasuApi")
const exec = require("child_process").exec;
const api = new API('start','https://nhentai.net',true);

const date = (ms) => {return new Date(ms).toISOString().substr(14, 5)}

const log = (...string)=>{
    return console.log(...string);
}
let execPromise=(command, name)=>{
    return new Promise(function(resolve) {
        exec(command, () => {
            resolve(name+" done");
        });
    });
}

// excess test are removed after build only important remains
(async ()=>{
let start = new Date().getTime()
    api.IgnoreNone = true;
    log(`   testing '.js' files: kasuApi.js`)
    console.log(await execPromise("node lib/kasuApi.js",'kasuApi.js'))
    log(`   testing '.js' files: Parser.js`)
    console.log(await execPromise("node lib/src/shorter.js",'Parse.js'))
    const test = await api.getID("https://nhentai.net/g/228922/").json()
    log(`\ngetID().json():\n`)
    log(test)
    //should show a whole json
    log(`\n==========================================================\n`)

    api.IsDiscord = true;
    api.ReRollonFail = true;
    // pRand Test
    log(`pRandSpecificTags:\n`)
    try{
        await api.pRandSpecificTags("konosuba aqua sole-female",data=>{log(data)})
    }catch(e){log(e)}

    log(`\n==========================================================\n`)

    log(`\npRandTag: -crossdressing-\n`)
    try{
        await api.pRandTag("crossdressing",(data)=>{log(data)}) 
    }catch(e){log(e)}
    log(`\n==========================================================\n`)
    log(`\npRandTag: -lolicon-\n`)
    try{
        await api.pRandTag("lolicon",(data)=>{log(data)}) // should cause and error
    }catch(e){log(e)}
    api.blockedWords = "crossdressing"
    log(`\n==========================================================\n`)
    log(`\nAdds crossdressing to blocked Tags:`)
    log(`\npRandTag: -crossdressing-\n`)
    try{
        await api.pRandTag("crossdressing",(data)=>{log(data)}) 
    }catch(e){log(e)}
    log(`\n==========================================================\n`)
    log(`\npRandom:\n`)
    try{
        log(await api.pRandom()) 
    }catch(e){log(e)}
    log(`\n==========================================================\n`)
    log(`\npSearch:\n`)
    try{
        log(await api.pSearch("crossdressing"))
    }catch(e){log(e)}
    log(`\n==========================================================\n`)
let end = new Date().getTime()
log(`---------the test took '${date(end - start)}' to finish---------`)
log(`NOTE: TIME DOES NOT START UNTIL THE JAVASCRIPT IS STARTED`)
api.connection.close()
})();