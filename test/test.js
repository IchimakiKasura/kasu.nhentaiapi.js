const API = require("../lib/main.js")
api = new API();

// excess test are removed after build only important remains
(async ()=>{
    const test = await api.getID(177013).json()
    console.log(`\ngetID().json():\n`)

    console.log(test)
    //should show a whole json
    
    console.log(`\n==========================================================\n`)
    // pRand Test
    console.log(`pRandSpecificTags:\n`)
    const val = await api.pRandSpecificTags("konosuba aqua sole-female")
    console.log(val)
    console.log(`\npRandTag:\n`)
    try{
        const val2 = await api.pRandTag("lolicon",()=>{},true) // should block when DiscordTOS is true 
        console.log(val2)
    } catch(e){console.log(e)} // should show the message
    console.log(`\n==========================================================\n`)
    
    console.log(`\ngetID().list():\n`)
    api.getID(177013).list(data=>{
        console.log(data.url)
        // https://nhentai.net/g/177013/
    })


})();
