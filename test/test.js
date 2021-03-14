const API = require("../lib/main.js")
api = new API()

async function test() {
    const test = await api.getID(177013).json()
    console.log(`\ngetID().json():\n`)

    console.log(test)
    //should show a whole json

    //2.0.0 problem that i fixed now cuz i capitalize all of the names fuck me
    //also the array is shit thats why its always undefined
    console.log(test.base.images.pages[0])
    // https://t.nhentai.net/galleries/987560/1t.jpg
    console.log(test.base.url)
    // https://nhentai.net/g/177013/
    console.log(test.base.title.translated)
    // METAMORPHOSIS

    api.getID(177013).list(data=>{
        console.log(`\ngetID().list():\n`)
        console.log(data.page_pics[0])
        // https://t.nhentai.net/galleries/987560/1t.jpg
        console.log(data.url)
        // https://nhentai.net/g/177013/
        console.log(data.title)
        // METAMORPHOSIS
    })

}
test()