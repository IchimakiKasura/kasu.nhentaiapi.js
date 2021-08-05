const API = require("../lib/main.js")
api = new API();

// excess test are removed after build only important remains
(async ()=>{
    // const test = await api.getID(177013).json()
    // console.log(`\ngetID().json():\n`)
    // console.log(test)
    //should show a whole json
    console.log(`\n==========================================================\n`)

    api.IsDiscord = true;
    // pRand Test
    console.log(`pRandSpecificTags:\n`)
    await api.pRandSpecificTags("konosuba aqua sole-female",data=>{
        console.log(data.tags)
    })

    api.ReRollonFail = true;
    console.log(`\npRandTag: -crossdressing-\n`)
    await api.pRandTag("crossdressing",(data)=>{console.log(data.tags)}) 
    console.log(`\npRandTag: -lolicon-\n`)
    try{
        await api.pRandTag("lolicon",(data)=>{console.log(data.tags)}) // should cause and error
    } catch(e) {
        console.log(e)
    }

    console.log(`\n==========================================================\n`)
})();
