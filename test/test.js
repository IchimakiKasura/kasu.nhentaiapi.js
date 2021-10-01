"use strict";
const API = require("../lib/main.min.js")
const exec = require("child_process").exec;
let api = new API();

const date = (ms) => {return new Date(ms).toISOString().substr(14, 5)}

const log = (...string)=>{
    return console.log(...string);
}
let execPromise=(command, name)=>{
    return new Promise(function(resolve, reject) {
        exec(command, (e,s,st) => {
            resolve(name+" done");
        });
    });
}
// excess test are removed after build only important remains
(async ()=>{
let start = new Date().getTime()
    log(`   testing '.js' files: main.js`)
    console.log(await execPromise("node lib/main.js",'main.js'))
    log(`   testing '.js' files: fetcher.js`)
    console.log(await execPromise("node lib/src/fetcher.js",'fetcher.js'))
    log(`   testing '.js' files: shorter.js`)
    console.log(await execPromise("node lib/src/shorter.js",'shorter.js'))
    const test = await api.getID(177013).json()
    log(`\ngetID().json():\n`)
    log(test)
    //should show a whole json
    log(`\n==========================================================\n`)

    api.IsDiscord = true;
    // pRand Test
    log(`pRandSpecificTags:\n`)
    try{
        await api.pRandSpecificTags("konosuba aqua sole-female",data=>{log(data)})
    }catch(e){log(e)}

    log(`\n==========================================================\n`)

    api.ReRollonFail = true;
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
let end = new Date().getTime()
log(`---------the test took '${date(end - start)}' to finish---------`)
log(`NOTE: TIME DOES NOT START UNTIL THE JAVASCRIPT IS STARTED`)
})();
