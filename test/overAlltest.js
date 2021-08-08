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
    log(pRandData);

    //artist
    log("\nRandArtist( data ):");
    await api.pRandArtist("abara",data=>{log(data.title)})
    log("data = pRandArtist():");
    pRandData = await api.pRandArtist("abara")
    log(pRandData);

    //parody
    log("\nRandParody( data ):");
    await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    log("data = pRandParody():");
    pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
    log(pRandData);

    //group
    log("\nRandGroup( data ):");
    await api.pRandGroup("saisons",data=>{log(data.title)})
    log("data = pRandGroup():");
    pRandData = await api.pRandGroup("saisons")
    log(pRandData);
    
    //pRandom
    log("\nRandom( data ):");
    await api.pRandom(data=>{log(data.title)})
    log("data = pRandom():");
    pRandData = await api.pRandom()
    log(pRandData);

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    log("data = pRandSpecificTags():");
    pRandData = await api.pRandSpecificTags("genshin impact venti")
    log(pRandData);
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
        log(pRandData);
    }catch(e){log(e)}

    //artist
    log("\nRandArtist( data ):");
    try{
        await api.pRandArtist("abara",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandArtist():");
    try{
        pRandData = await api.pRandArtist("abara")
        log(pRandData);
    }catch(e){log(e)}

    //parody
    log("\nRandParody( data ):");
    try{
        await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandParody():");
    try{
        pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
        log(pRandData);
    }catch(e){log(e)}

    //group
    log("\nRandGroup( data ):");
    try{
        await api.pRandGroup("saisons",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandGroup():");
    try{
        pRandData = await api.pRandGroup("saisons")
        log(pRandData);
    }catch(e){log(e)}

    //pRandom
    log("\nRandom( data ):");
    try{
        await api.pRandom(data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandom():");
    try{
        pRandData = await api.pRandom()
        log(pRandData);
    }catch(e){log(e)}

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    try{
        await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandSpecificTags():");
    try{
        pRandData = await api.pRandSpecificTags("genshin impact venti")
        log(pRandData);
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
        log(pRandData);
    }catch(e){log(e)}

    //artist
    log("\nRandArtist( data ):");
    try{
        await api.pRandArtist("abara",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandArtist():");
    try{
        pRandData = await api.pRandArtist("abara")
        log(pRandData);
    }catch(e){log(e)}

    //parody
    log("\nRandParody( data ):");
    try{
        await api.pRandParody("kono subarashii sekai ni syukufuku o",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandParody():");
    try{
        pRandData = await api.pRandParody("kono subarashii sekai ni syukufuku o")
        log(pRandData);
    }catch(e){log(e)}

    //group
    log("\nRandGroup( data ):");
    try{
        await api.pRandGroup("saisons",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandGroup():");
    try{
        pRandData = await api.pRandGroup("saisons")
        log(pRandData);
    }catch(e){log(e)}

    //pRandom
    log("\nRandom( data ):");
    try{
        await api.pRandom(data=>{log(data.title)})
    }catch(e){log(e)}
    log("\ndata = pRandom()");
    try{
        pRandData = await api.pRandom()
        log(pRandData);
    }catch(e){log(e)}

    //randomSpecificTag
    log("\nRandSpecificTags( data ):");
    try{
        await api.pRandSpecificTags("genshin impact venti",data=>{log(data.title)})
    }catch(e){log(e)}
    log("data = pRandSpecificTags():");
    try{
        pRandData = await api.pRandSpecificTags("genshin impact venti")
        log(pRandData);
    }catch(e){log(e)}
//#endregion

log("\n\n------------------TEST FINISHED------------------\n\n\n")
})();
