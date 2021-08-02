<div align="center">
<h1 style="font-weight:1000">N-hentai API</h1>
<p>

[![stable version](https://img.shields.io/badge/stable%20version-2.8.0-brightgreen?style=for-the-badge)](https://npmjs.com/package/kasu.nhentaiapi.js)
[![Build Status](https://img.shields.io/travis/IchimakiKasura/kasu.nhentaiapi.js.svg?style=for-the-badge)](https://travis-ci.com/IchimakiKasura/kasu.nhentaiapi.js)
[![badge 1](https://img.shields.io/badge/unofficial%20nhentai%20API-gray?style=for-the-badge) ](https://nhentai.net/g/177013)
[![discord bot](https://img.shields.io/badge/Try%20the%20DiscordBot%20-gray?style=for-the-badge)](https://discord.com/api/oauth2/authorize?client_id=816244016282599454&permissions=162816&scope=bot)
</div>

The "N-hentai-api" is a fast and easy to use api for connecting to [nhentai.net]("https://nhentai.net/") data.
* Fast
* Easy
* Reliable* :>

### Install

To install "N-hentai-api" type these:

```
npm i kasu.nhentaiapi.js
```

## Examples

### How to use n-hentai-api

to get the basic info about the ID/Doujin:

```js
const API = require('kasu.nhentaiapi.js');
const api = new API();

// number | strings can do
ID = 228922 //or "228922" or "https://nhentai.net/g/228922"

// for list func
api.getID(ID).list(data=>{

    data.id;            // 228922
    data.url;           // https://nhentai.net/g/228922
    data.title;         // EROGROS Vol. 2
    data.title_original // エログロス Vol.2
    data.cover;         // https://t.nhentai.net/galleries/1205270/cover.jpg
    data.page_pics[0];  // https://t.nhentai.net/galleries/1205270/1t.jpg
    //theres more
    //tags, artist, groups, catergory, language, parodies, pages, characters, uploaded
})

// for json func
async function json(){
    const val = await api.getID(ID).json()
    console.table(val)
    // {
    //   id: {      
    //     id: 228922,
    //     url: 'https://nhentai.net/g/228922/',
    //     title: { ORIGIN: 'エログロス Vol.2', TRANSLATED: 'EROGROS Vol. 2' },
    //     images: { 
    //       cover: 'https://t.nhentai.net/galleries/1205270/cover.jpg'
    //       pages: [Array]
    //     },
    //     tag_table: {
    //       parodies: 'none',
    //       characters: 'none',
    //       tag: <censored> sorry can't show it here,
    //       artists: 'uziga waita, horihone saizou, momoiro manjiru, tksn, faith, zero punch, hayami kuro, ai7n, senmu',
    //       groups: 'none',
    //       languages: 'japanese',
    //       categories: 'manga'
    //     },
    //     number_pages: '244',
    //     uploaded: '2 years, 1 month ago'
    //   }
    // }

    val.base.url // https://nhentai.net/g/228922/
}

// or you can do this on the json
api.getID(ID).json().then(data=>{
    data.base.url // https://nhentai.net/g/228922/
})
```

## Modules

### getID(``id|string``)

The ``id`` can be a string or a number or even the link itself.
``getID()`` has functions ``list(<fn>)`` and ``json()``.

NOTE:
``json()`` calls are different from the ``list()``:
```js
// json
data.base.images.pages[0]
// list
data.page_pics[0]
```

### pRandom

Generate random ID based on the website's button 'Random'.
use:
```js
// gives random number
await api.pRandom()

// you can get the random number's data
await api.pRandom(data=>{
    data.cover
})
```

### pRand's

* pRandTag
* pRandParody
* pRandArtist
* pRandGroup
* pRandSpecificTags

Tag,Parody,Artist,Group shares the same function it generate random ID based on the Given Tag
NOTE: It only accepts 1 tag.
```js
//returns a link
await pRandtag().link

//returns a ID
await pRandtag().id

//get data of the random generated ID of the given tag
await pRandtag(data=>{
    data.cover
})
```

Getting multiple tags? you'll need the ``pRandSpecificTags()``.

It uses the Nhentai Searchbar functionality but
every spaces needs to have ``+`` if the sentence has 2 words like "sole female" it needs ``-`` as a spacing "sole-female".

Example:
```js
//getting only the ID
const val = await api.pRandSpecificTags("konosuba+aqua+sole-female")
console.log(val) //random ID of the given tags

//gets the data of the given tags
const val = await api.pRandSpecificTags("konosuba+aqua+sole-female", data=>{
    data.id
    data.title
    data.cover
})
```

## updates

[CHANGELOG](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/CHANGELOG.md)

This is my First self-made API please enjoy using it!
crediting me will be an appreciation!

# LICENSE 
[MIT LICENSE](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/README.md)