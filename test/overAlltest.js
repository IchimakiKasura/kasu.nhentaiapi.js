// this test file js is ignored on the package
const API = require("../lib/kasuApi")
const exec = require("child_process").exec
let api = new API('start','https://nhentai.net',true);

const date = (ms) => {return new Date(ms).toISOString().substr(14, 5)}
const log = (...string)=>{return console.log(...string);}
function execPromise(command, name) {
    return new Promise(function(resolve, reject) {
        exec(command, (error, stdout, stderr) => {
            resolve(name+" done");
        });
    });
}
(async ()=>{
let start = new Date().getTime()
log(`   testing '.js' files: kasuApi.js`)
console.log(await execPromise("node lib/kasuApi.js",'kasuApi.js'))
log(`   testing '.js' files: parser.js`)
console.log(await execPromise("node lib/src/Parser.js",'Parser.js'))
log("\n\n------------------TEST STARTED------------------\n\n\n")

let pRandData = ""
let startNoDiscord = new Date().getTime()
//#region test with No discord
    log("       Test with no \"IsDiscord\" first:\n")

    log(`api.IsDiscord is now set to ${api.IsDiscord}`)
    log(`api.ReRollonFail is set to ${api.ReRollonFail}`)

    // basics
    log("\ngetID().json( data ):");
    await api.getID(350628).json(data=>{log(data.title)});

    log("data = getID().json():");
    let getIDdata = await api.getID(350628).json();
    log(getIDdata.title);

    // pRand functions
    log("\n     pRand functions:\n");
    log("\npRandID():");
    log(await api.pRandID())

    //tag
    log("\npRandTag( data ):");
    await api.pRandTag("crossdressing",data=>{log(data.title)})
    log("data = pRandTag():");
    pRandData = await api.pRandTag("crossdressing")
    log(pRandData.tag_table.tag);

    //artist
    log("\nRandArtist( data ):");
    await api.pRandArtist("zinno",data=>{log(data.title)})
    log("data = pRandArtist():");
    pRandData = await api.pRandArtist("zinno")
    log(pRandData.tag_table.tag);

    //parody
    log("\nRandParody( data ):");
    await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    log("data = pRandParody():");
    pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
    log(pRandData.tag_table.tag);

    //group
    log("\nRandGroup( data ):");
    await api.pRandGroup("saisons",data=>{log(data.title)})
    log("data = pRandGroup():");
    pRandData = await api.pRandGroup("saisons")
    log(pRandData.tag_table.tag);
    
    //pRandom
    log("\nRandom( data ):");
    await api.pRandom(data=>{log(data.title)})
    log("data = pRandom():");
    pRandData = await api.pRandom()
    log(pRandData.tag_table.tag);

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    log("data = pRandSpecificTags():");
    pRandData = await api.pRandSpecificTags("genshin impact venti")
    log(pRandData.tag_table.tag);
//#endregion
let endNoDiscord = new Date().getTime()
let startDiscord = new Date().getTime()
//#region test with discord
    log("\n\n====================================================\n\n")
    log("       Test with \"IsDiscord\" second:\n")
    api.IsDiscord = true
    log(`api.IsDiscord    is set to ${api.IsDiscord}`)
    log(`api.ReRollonFail is set to ${api.ReRollonFail}`)
    // basics
    log("\ngetID().json( data ):");

    try{
        await api.getID(350628).json(data=>{log(data.title)});
    }catch(e){log(e)}

    log("\ndata = getID().json():");
    try{
        const getIDdata = await api.getID(350628).json();
        log(getIDdata.title);
    }catch(e){log(e)}
    
    // pRand functions
    log("\n     pRand functions:\n");
    log("\npRandID():");
    log(await api.pRandID())

    //tag
    log("\npRandTag( data ):");
    try{
        await api.pRandTag("crossdressing",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandTag():");
    try{
        pRandData = await api.pRandTag("crossdressing")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //artist
    log("\nRandArtist( data ):");
    try{
        await api.pRandArtist("zinno",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandArtist():");
    try{
        pRandData = await api.pRandArtist("zinno")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //parody
    log("\nRandParody( data ):");
    try{
        await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandParody():");
    try{
        pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //group
    log("\nRandGroup( data ):");
    try{
        await api.pRandGroup("saisons",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandGroup():");
    try{
        pRandData = await api.pRandGroup("saisons")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //pRandom
    log("\nRandom( data ):");
    try{
        await api.pRandom(data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandom():");
    try{
        pRandData = await api.pRandom()
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    try{
        await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandSpecificTags():");
    try{
        pRandData = await api.pRandSpecificTags("genshin impact venti")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}
//#endregion
let endDiscord = new Date().getTime()
let startDiscordReRollonFail = new Date().getTime()
//#region test with discord and rerollonfail
    log("\n\n====================================================\n\n")
    log("       Test with \"IsDiscord\" with \"ReRollonFail\" third:\n")
    api.IsDiscord = true
    log(`api.IsDiscord    is set to ${api.IsDiscord}`)
    api.ReRollonFail = true
    log(`api.ReRollonFail is set to ${api.ReRollonFail}`)
    // basics
    log("\ngetID().json( data ):");

    try{
        await api.getID(350628).json(data=>{log(data.title)});
    }catch(e){log(e)}

    log("\ndata = getID().json():");
    try{
        const getIDdata = await api.getID(350628).json();
        log(getIDdata.title);
    }catch(e){log(e)}

    // pRand functions
    log("\n     pRand functions:\n");
    log("\npRandID():");
    log(await api.pRandID())

    //tag
    log("\npRandTag( data ):");
    try{
        await api.pRandTag("crossdressing",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandTag():");
    try{
        pRandData = await api.pRandTag("crossdressing")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //artist
    log("\nRandArtist( data ):");
    try{
        await api.pRandArtist("zinno",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandArtist():");
    try{
        pRandData = await api.pRandArtist("zinno")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //parody
    log("\nRandParody( data ):");
    try{
        await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandParody():");
    try{
        pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //group
    log("\nRandGroup( data ):");
    try{
        await api.pRandGroup("saisons",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandGroup():");
    try{
        pRandData = await api.pRandGroup("saisons")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //pRandom
    log("\nRandom( data ):");
    try{
        await api.pRandom(data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandom()");
    try{
        pRandData = await api.pRandom()
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    try{
        await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandSpecificTags():");
    try{
        pRandData = await api.pRandSpecificTags("genshin impact venti")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}
//#endregion
let endDiscordReRollonFail = new Date().getTime()
let startDiscordReRollonFailblockwords = new Date().getTime()
//#region test with discord and rerollonfail and custom blockedwords
    log("\n\n====================================================\n\n")
    log("       Test with \"IsDiscord\" with \"ReRollonFail\" and \"blockedWords\"fourth:\n")
    api.IsDiscord = true
    log(`api.IsDiscord    is set to ${api.IsDiscord}`)
    api.ReRollonFail = true
    log(`api.ReRollonFail is set to ${api.ReRollonFail}`)
    api.blockedWords = "crossdressing"
    log(`api.blockeWords added blocked tag: ${api.blockedWords}`)
    // basics
    log("\ngetID().json( data ):");

    try{
        await api.getID(350628).json(data=>{log(data.title)});
    }catch(e){log(e)}

    log("\ndata = getID().json():");
    try{
        const getIDdata = await api.getID(350628).json();
        log(getIDdata.title);
    }catch(e){log(e)}

    // pRand functions
    log("\n     pRand functions:\n");
    log("\npRandID():");
    log(await api.pRandID())

    //tag
    log("\npRandTag( data ):");
    try{
        await api.pRandTag("crossdressing",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandTag():");
    try{
        pRandData = await api.pRandTag("crossdressing")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //artist
    log("\nRandArtist( data ):");
    try{
        await api.pRandArtist("zinno",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandArtist():");
    try{
        pRandData = await api.pRandArtist("zinno")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //parody
    log("\nRandParody( data ):");
    try{
        await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandParody():");
    try{
        pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //group
    log("\nRandGroup( data ):");
    try{
        await api.pRandGroup("saisons",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandGroup():");
    try{
        pRandData = await api.pRandGroup("saisons")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //pRandom
    log("\nRandom( data ):");
    try{
        await api.pRandom(data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandom()");
    try{
        pRandData = await api.pRandom()
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    try{
        await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandSpecificTags():");
    try{
        pRandData = await api.pRandSpecificTags("genshin impact venti")
        log(pRandData.tag_table.tag);
    }catch(e){log(e)}
//#endregion
let endDiscordReRollonFailblockwords = new Date().getTime()
log("\n\n------------------TEST FINISHED------------------\n\n\n")
let end = new Date().getTime()
log(`---------the test took '${date(end - start)}' to finish---------`)
log(`------the No discord took '${date(endNoDiscord - startNoDiscord)}' to finish------`)
log(`-----the with discord took '${date(endDiscord - startDiscord)}' to finish-----`)
log(`--the discord and rerollonfail took '${date(endDiscordReRollonFail - startDiscordReRollonFail)}' to finish--`)
log(`--the discord and rerollonfail and custom blockwords took '${date(endDiscordReRollonFailblockwords - startDiscordReRollonFailblockwords)}' to finish--`)
log(`NOTE: TIME DOES NOT START UNTIL THE JS IS STARTED`)
api.connection.close()
})();
