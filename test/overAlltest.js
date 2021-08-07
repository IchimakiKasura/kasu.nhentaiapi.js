// this test file js is ignored on the package
const API = require("../lib/main.js")
api = new API();

const log = (...string)=>{
    return console.log(...string);
}

(async ()=>{
log("\n\n------------------TEST STARTED------------------\n\n\n")

    let pRandData = ""
//#region test with No discord
    log("       Test with no \"IsDiscord\" first:\n")

    log(`api.IsDiscord is now set to ${api.IsDiscord}`)
    log(`api.ReRollonFail is set to ${api.ReRollonFail}`)

    // basics
    log("\ngetID().json( data ):");
    await api.getID(350628).json(data=>{log(data.title)});
    
    log("\ndata = getID().json():");
    let getIDdata = await api.getID(350628).json();
    log(getIDdata.title.origin||getIDdata.title.translated);

    // pRand functions
    log("\n     pRand functions:\n");
    log("\npRandID():");
    log(await api.pRandID())

    //tag
    log("\npRandTag( data ):");
    await api.pRandTag("crossdressing",data=>{log(data.title)})
    log("\ndata = pRandTag()");
    pRandData = await api.pRandTag("crossdressing")
    log(pRandData.link);

    //artist
    log("\nRandArtist( data ):");
    await api.pRandArtist("abara",data=>{log(data.title)})
    log("\ndata = pRandArtist()");
    pRandData = await api.pRandArtist("abara")
    log(pRandData.link);

    //parody
    log("\nRandParody( data ):");
    await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    log("\ndata = pRandParody()");
    pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
    log(pRandData.link);

    //group
    log("\nRandGroup( data ):");
    await api.pRandGroup("saisons",data=>{log(data.title)})
    log("\ndata = pRandGroup()");
    pRandData = await api.pRandGroup("saisons")
    log(pRandData.link);
    
    //pRandom
    log("\nRandom( data ):");
    await api.pRandom(data=>{log(data.title)})
    log("\ndata = pRandom()");
    pRandData = await api.pRandom()
    log(pRandData.link);

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    log("\ndata = pRandSpecificTags()");
    pRandData = await api.pRandSpecificTags("genshin impact venti")
    log(pRandData.link);
//#endregion

//#region test with discord
    log("====================================================")
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
        log(getIDdata.title.origin||getIDdata.title.translated);
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
    log("\ndata = pRandTag()");
    try{
        pRandData = await api.pRandTag("crossdressing")
        log(pRandData.link);
    }catch(e){log(e)}

    //artist
    log("\nRandArtist( data ):");
    try{
        await api.pRandArtist("abara",data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandArtist()");
    try{
        pRandData = await api.pRandArtist("abara")
        log(pRandData.link);
    }catch(e){log(e)}

    //parody
    log("\nRandParody( data ):");
    try{
        await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandParody()");
    try{
        pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
        log(pRandData.link);
    }catch(e){log(e)}

    //group
    log("\nRandGroup( data ):");
    try{
        await api.pRandGroup("saisons",data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandGroup()");
    try{
        pRandData = await api.pRandGroup("saisons")
        log(pRandData.link);
    }catch(e){log(e)}

    //pRandom
    log("\nRandom( data ):");
    try{
        await api.pRandom(data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandom()");
    try{
        pRandData = await api.pRandom()
        log(pRandData.link);
    }catch(e){log(e)}

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    try{
        await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandSpecificTags()");
    try{
        pRandData = await api.pRandSpecificTags("genshin impact venti")
        log(pRandData.link);
    }catch(e){log(e)}
//#endregion

//#region test with discord and rerollonfail
    log("====================================================")
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
        log(getIDdata.title.origin||getIDdata.title.translated);
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
    log("\ndata = pRandTag()");
    try{
        pRandData = await api.pRandTag("crossdressing")
        log(pRandData.link);
    }catch(e){log(e)}

    //artist
    log("\nRandArtist( data ):");
    try{
        await api.pRandArtist("abara",data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandArtist()");
    try{
        pRandData = await api.pRandArtist("abara")
        log(pRandData.link);
    }catch(e){log(e)}

    //parody
    log("\nRandParody( data ):");
    try{
        await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandParody()");
    try{
        pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
        log(pRandData.link);
    }catch(e){log(e)}

    //group
    log("\nRandGroup( data ):");
    try{
        await api.pRandGroup("saisons",data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandGroup()");
    try{
        pRandData = await api.pRandGroup("saisons")
        log(pRandData.link);
    }catch(e){log(e)}

    //pRandom
    log("\nRandom( data ):");
    try{
        await api.pRandom(data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandom()");
    try{
        pRandData = await api.pRandom()
        log(pRandData.link);
    }catch(e){log(e)}

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    try{
        await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandSpecificTags()");
    try{
        pRandData = await api.pRandSpecificTags("genshin impact venti")
        log(pRandData.link);
    }catch(e){log(e)}
//#endregion

log("\n\n------------------TEST FINISHED------------------\n\n\n")
})();
