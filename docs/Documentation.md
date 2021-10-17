<center>

# API Documentation
-=Documentation for the kasu.[nhentai](https://nhentai.net)api.js version 3.2.1=-
</center>

- [Overview](#api-documentation)
    - [install](#get-started)
    - [Basic use](#basics)

- [kasu.nhentaiapi.js](#kasu.nhentaiapi.js)
    - [Class](#kasu.nhentaiapi.js)
        - [Properties](#property-classes)
            - [class.IsDiscord](#isdiscord-boolean)
            - [class.blockedWords](#blockedwords-string)
            - [class.ReRollonFail](#rerollonfail-boolean)
            - [class.IgnoreNone](#ignorenone-boolean)
            - [class.requestHeaders](#requestheaders-object)
        - [Methods](#method-classes)
            - [class.getID](#getidstring)
            - [class.pRandID](#prandid)
            - [class.pRandSpecificTags](#prands)
            - [class.pRandTag](#prands)
            - [class.pRandParody](#prands)
            - [class.pRandArtist](#prands)
            - [class.pRandGroup](#prands)
            - [class.pRandom](#prandom-fn-)

    - [Json Object](#json-object)

---
## Get started
```
npm i kasu.nhentaiapi.js
```
## Basics
```js
const Example = require('kasu.nhentaiapi.js');
const ExampleApi = new Example(); // name any you want "api, kasu, nhentai, ..." 

//          ----number | strings can do----
const ID = 228922 //or "228922" or "https://nhentai.net/g/228922"
async function json(){
    const val = await ExampleApi.getID(ID).json()
    val.url
    // OR
    ExampleApi.getID(ID).json(data=>{data.url})
    // OR
    (await ExampleApi.getID(ID).json()).url
    // result: https://nhentai.net/g/228922/
}
```
---

# `kasu.nhentaiapi.js`
## Property classes
### `IsDiscord` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_
- If you're using this API on your DiscordBot Enabling this will block some tags that is inappropriate or violates DiscordTOS.
- default bool set is `false`.

### `blockedWords` _[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)_
- Add more tags that will be blocked.
```js
    blockedWords = "crossdressing brutality penetration"
```

### `ReRollonFail` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_
- If you're using [`IsDiscord`](#isdiscord-boolean) and don't wanna do your own retry function use this.
- note: By enabling this it might slow down the process unless if you have a fast internet or processor.
- default bool set is `false`.

### `IgnoreNone` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_
- Ignore showing empty / none tags on the json object.
- default bool set is `false`.
```js
// false
{
    "tag": "none",
    "parodies": "konosuba"
}
// true
{
    "parodies": "konosuba"
}
```

### `requestHeaders` _[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)_
- default header is `{ "content-type": "text/plain; charset=utf-8" }`

## Method classes
### `getID(string)`
- `string` can be a string or a number or even the link itself. Example of this method can be seen on the [Basics](#basics)
- [returns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) a [`json object`](#json-object).

### `pRandID()`

### `pRandSpecificTags( string, fn )`
- It uses the [Nhentai](https://nhentai.net) Searchbar functionality.
- [returns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) a [`json object`](#json-object).
```js
//gets the data of the given tags
await api.pRandSpecificTags("konosuba aqua sole female", data=>{
    /* data.[json object] */
})
```

## pRand's
### &nbsp; &nbsp; `pRandTag( tag fn )`
### &nbsp; &nbsp; `pRandParody( tag, fn )`
### &nbsp; &nbsp; `pRandArtist( tag, fn )`
### &nbsp; &nbsp; `pRandGroup( tag, fn )`

- [Tag](https://nhentai.net/tag), [Parody](https://nhentai.net/parody), [Artist](https://nhentai.net/artist), [Group](https://nhentai.net/group) shares the same function it generate random ID based on the Given Tag. <br/>
NOTE: It only accepts 1 tag/name that **exist** on the [Nhentai](https://nhentai.net) database.
- [returns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) a [`json object`](#json-object).
```js
//returns a link | id
await pRandtag("<name of the tag>").link | .id
//get data of the random generated ID of the given tag
await pRandtag("<name of the tag>", data=>{
    /* data.[json object] */
})
```

### `pRandom( fn )`
- Generate random ID based on the website's button 'Random'.
- [returns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) a [`json object`](#json-object).
```js
// gives random number
await api.pRandom()
// you can get the random number's data
await api.pRandom(data=>{
    data.images.cover
})
```

---
## Json Object
This object is also used on `pRand's` data functions.
```json
{
    "id": 228922,
    "url": "https://nhentai.net/g/228922/",
    "title": { 
        "origin": "エログロス Vol.2",
        "translated": "EROGROS Vol. 2",
        "originFull": "[アンソロジー] エログロス Vol.2 [DL版]",
        "translatedFull": "[Anthology] EROGROS Vol. 2 [Digital]"
    },
    "images": { 
        "cover": "https://t.nhentai.net/galleries/1205270/cover.jpg",
        "pages": [
            "https://t.hentain.net/galleries/1205270/1t.jpg"
            "https://t.hentain.net/galleries/1205270/2t.jpg"
            "and 242 more"
        ]
    },
    "tag_table": {
        "parodies": "none",
        "characters": "none",
        "tag": "<censored> sorry can't show it here",
        "artists": "uziga waita, horihone saizou, momoiro manjiru, tksn, faith, zero punch, hayami kuro, ai7n, senmu",
        "groups": "none",
        "languages": "japanese",
        "categories": "manga"
    },
    "number_pages": "244",
    "uploaded": "2 years, 1 month ago"
}
```













