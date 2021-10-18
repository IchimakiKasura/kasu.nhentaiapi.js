<!-- <style>
    body{
        background-image: url("https://wallpaperaccess.com/full/2725825.jpg"); 
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style> -->
<div align="center">

# API Documentation
-=Documentation for the kasu.[nhentai](https://nhentai.net)api.js=-
</div>

<details>
    <summary><a href="#apidocumentation">Overview</a></summary>

- [install](#get-started)
- [Basic use](#basics)
</details>

<details>
    <summary><a href="#⠀constructor⠀" title="module">kasu.nhentaiapi.js</a></summary>

- [Class](#⠀constructor⠀ "main")
    - [Properties](#⠀property-classes⠀ "Class Properties")
        - [class.IsDiscord](#⠀isdiscord-boolean⠀ "IsDiscord")
        - [class.blockedWords](#⠀blockedwords-string⠀ "blockedWords")
        - [class.ReRollonFail](#⠀rerollonfail-boolean⠀ "ReRollonFaile")
        - [class.IgnoreNone](#⠀ignorenone-boolean⠀ "IgnoreNone")
        - [class.requestHeaders](#⠀requestheaders-object⠀ "requestHeaders")
    - [Methods](#⠀method-classes⠀ "Class Method")
        - [class.getID](#⠀getidstring⠀ "getID()")
        - [class.pRandID](#⠀prandid⠀ "pRandID()")
        - [class.pRandSpecificTags](#⠀prandspecifictags-string-fn-⠀ "pRandSpecificTags()")
        - [pRand](#prands "pRand")
            - [class.pRandTag](#⠀prandtag-tag-fn-⠀ "pRandTag()")
            - [class.pRandParody](#⠀prandparody-tag-fn-⠀ "pRandParody()")
            - [class.pRandArtist](#⠀prandartist-tag-fn-⠀ "pRandAtist()")
            - [class.pRandGroup](#⠀prandgroup-tag-fn-⠀ "pRandGroup()")
        - [class.pRandom](#⠀prandom-fn-⠀ "pRandom()")
</details>

<details>
  <summary><a href="#json-object" title="json">Json Object</a></summary>

- [Interface](#interface)
  </details>

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

# `⠀Constructor⠀`
# Property classes
### `⠀IsDiscord⠀` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_
- If you're using this API on your DiscordBot Enabling this will block some tags that is inappropriate or violates DiscordTOS.
- default bool set is `false`.

### `⠀blockedWords⠀` _[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)_
- Add more tags that will be blocked.
```js
    blockedWords = "crossdressing brutality penetration"
```

### `⠀ReRollonFail⠀` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_
- If you're using [`IsDiscord`](#isdiscord-boolean) and don't wanna do your own retry function use this.
- note: By enabling this it might slow down the process unless if you have a fast internet or processor.
- default bool set is `false`.

### `⠀IgnoreNone⠀` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_
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

### `⠀requestHeaders⠀` _[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)_
- default header is `{ "content-type": "text/plain; charset=utf-8" }`

<br/>

# Method classes
### `⠀getID(string)⠀`
- `string` can be a string or a number or even the link itself. Example of this method can be seen on the [Basics](#basics)
- [returns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) a [`json object`](#json-object).

### `⠀pRandID()⠀`
- Generate random ID based on the website's button 'Random'.
- [returns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) an ID only!

### `⠀pRandSpecificTags( string, fn )⠀`
- It uses the [Nhentai](https://nhentai.net) Searchbar functionality.
- [returns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) a [`json object`](#json-object).
```js
//gets the data of the given tags
await api.pRandSpecificTags("konosuba aqua sole female", data=>{
    /* data.[json object] */
})
```

### pRand's
### &nbsp; &nbsp; `⠀pRandTag( tag fn )⠀`
### &nbsp; &nbsp; `⠀pRandParody( tag, fn )⠀`
### &nbsp; &nbsp; `⠀pRandArtist( tag, fn )⠀`
### &nbsp; &nbsp; `⠀pRandGroup( tag, fn )⠀`

- [Tag](https://nhentai.net/tags), [Parody](https://nhentai.net/parodies), [Artist](https://nhentai.net/artists), [Group](https://nhentai.net/groups) shares the same function it generate random ID based on the Given Tag. <br/>
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

### `⠀pRandom( fn )⠀`
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
<br/>

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
        "tag": "<censored> sorry can't show on github",
        "artists": "uziga waita, horihone saizou, momoiro manjiru, tksn, faith, zero punch, hayami kuro, ai7n, senmu",
        "groups": "none",
        "languages": "japanese",
        "categories": "manga"
    },
    "number_pages": "244",
    "uploaded": "2 years, 1 month ago"
}
```

## Interface
NOTE: Some of it is literally nonsense because this is what is in the declaration file.

### `⠀id⠀` : [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- ID or Code or whatever you call.
<br/><br/>

### `⠀url⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- Url of the selected code.
<br/><br/>

### `⠀title⠀` : [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- titles?
#### ⠀⠀- `⠀origin⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• original
#### ⠀⠀- `⠀translated⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• トランスレイト??? wait it's supposed to be in english cuz' it's translated.
#### ⠀⠀- `⠀originFull⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• original but its full version of it.
#### ⠀⠀- `⠀translatedFull⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• YES ITS FULL VERSION OF THE TRANSLATED TITLE OF IT.
<br/><br/>

### `⠀images⠀` : [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- images?
#### ⠀⠀- `⠀cover⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• Doujin cover image.
#### ⠀⠀- `⠀pages⠀` : [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
⠀⠀⠀⠀• Array of images or the doujin.
<br/><br/>

### `⠀tag_table⠀` : [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- tags?
#### ⠀⠀- `⠀parodies⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• I Like konosuba
#### ⠀⠀- `⠀characters⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• I love megumin
#### ⠀⠀- `⠀tag⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• what?
#### ⠀⠀- `⠀artist⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• I don't really know about this
#### ⠀⠀- `⠀groups⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• Can't think 1 group tag.
#### ⠀⠀- `⠀languages⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• english ofc.
#### ⠀⠀- `⠀categories⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
⠀⠀⠀⠀• ca
<br/><br/>

### `⠀number_pages⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- haha 69 pages seems cool.
<br/><br/>

### `⠀uploaded⠀` : [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- Hokusai made The Dream of the Fisherman's Wife in 1814, the earliest known Tentacle hentai.<br/>
In 1722 the government made a law banning hentai manga, which means it was common even earlier.<br/>
Suzumi-fune is probobly the oldest hentai anime, it's from 1932.<br/>