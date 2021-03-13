const API = require("../lib/main.js")
api = new API()

async function test() {
    const test = await api.getID(177013).json()

    // console.log(test)
    //2.0.0 problem that i fixed now cuz i capitalize all of the names fuck me
    //also the array is shit thats why its always undefined
    // console.log(test.base.images.pages[0])
    //https://t.nhentai.net/galleries/987560/1t.jpg

    //2.5.5? or 3.0 idk im worst at thinking what version would i pick

    console.log(await api.getPopularList())

}
test()