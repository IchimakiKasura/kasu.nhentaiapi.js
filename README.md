<div align="center">
<img src="https://i.redd.it/fkg9yip5yyl21.png" height="50" title="nhentai"/><h1 style="font-weight:1000">N-hentai API</h1>
<p>

[![stable version](https://img.shields.io/badge/stable%20version-3.0.1-brightgreen?style=for-the-badge)](https://npmjs.com/package/kasu.nhentaiapi.js)
[![Build Status](https://img.shields.io/travis/IchimakiKasura/kasu.nhentaiapi.js.svg?style=for-the-badge)](https://travis-ci.com/IchimakiKasura/kasu.nhentaiapi.js)
![minified](https://img.shields.io/badge/-minified%20-gray?style=for-the-badge "^3.0.0 versions are now already MINIFIED!")<br/>
<img src="https://img.shields.io/badge/-Astolfo--chan%20is%20very%20happy%20that%20you%20are%20well%20cultured%20to%20use%20this-ff1100?style=for-the-badge" title="unofficial api of nhentai"/>
</div>

The "N-hentai-api" is a fast and easy to use api for connecting to [nhentai.net]("https://nhentai.net/") data.
* Fast
* Easy to use
* Reliable* :>
* >! Discord friendly?
### Install
To install "N-hentai-api" type these:
```
npm i kasu.nhentaiapi.js
```
## Examples
### How to use n-hentai-api
To get the basic info about the ID/Doujin:

```js
const API = require('kasu.nhentaiapi.js');
const api = new API(); // name any you want "api, kasu, nhentai, ..." 

//          ----number | strings can do----
ID = 228922 //or "228922" or "https://nhentai.net/g/228922"
async function json(){
    const val = await api.getID(ID).json()
    val.url // https://nhentai.net/g/228922/
}
api.getID(ID).json().then(data=>{
    data.url // https://nhentai.net/g/228922/
})
```
## Modules
### getID(``id|string``)
The ``id`` can be a string or a number or even the link itself.
``getID()`` has function ``json()``.
- ### ``Json``:
```json
// This object is also used on pRand's data functions.
{
    "id": 228922,
    "url": "https://nhentai.net/g/228922/",
    "title": { 
        "origin": "エログロス Vol.2",
        "translated": "EROGROS Vol. 2"
    },
    "images": { 
        "cover": "https://t.nhentai.net/galleries/1205270/cover.jpg",
        "pages": [
            "https://t.hentain.net/galleries/1205270/1t.jpg"
            "https://t.hentain.net/galleries/1205270/2t.jpg"
            // < and so on and on.. >
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
### pRandom()
Generate random ID based on the website's button 'Random'.
use:
```js
// gives random number
await api.pRandom()
// you can get the random number's data
await api.pRandom(data=>{
    data.images.cover
})
```
### pRand's
* pRandTag(`tag`, `function`)
* pRandParody(`tag`, `function`)
* pRandArtist(`tag`, `function`)
* pRandGroup(`tag`, `function`)
* pRandSpecificTags(`tag`, `function`)
* pRandom(`function`)
Tag,Parody,Artist,Group shares the same function it generate random ID based on the Given Tag. <br/>
NOTE: It only accepts 1 tag/name that **exist** on the nhentai database.
```js
//returns a link | id
await pRandtag("<name of the tag>").link | .id
//get data of the random generated ID of the given tag
await pRandtag("<name of the tag>", data=>{/* data.[json object] */})
```
The ``pRandSpecificTags()`` uses the Nhentai Searchbar functionality.
Example:
```js
//gets the data of the given tags
const val = await api.pRandSpecificTags("konosuba aqua sole female", data=>{/* data.[json object] */})
```
### IsDiscord `boolean`
- default bool set is `false`.
<br/>
If you're using this API on your DiscordBot Enabling this will block some tags that is inappropriate or violates DiscordTOS.

### blockedWords `string`
- you can add your own blocked tags here.
### ReRollonFail `boolean`
- note: By enabling this it might slow down the process unless if you have a fast internet.
# Updates
[CHANGELOG](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/CHANGELOG.md)
# LICENSE 
[MIT LICENSE](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/README.md)
<hr>
<p align="center">
Enjoy using it! crediting me will be an appreciation!<br/>
<a href="https://github.com/IchimakiKasura/kasu.nhentaiapi.js" title="Star it!">Star</a> it if you like it!<br/>
<img src="https://raw.githubusercontent.com/IchimakiKasura/IchimakiKasura/main/astorufo.png" title="Created by Ichimaki" height="60"/>