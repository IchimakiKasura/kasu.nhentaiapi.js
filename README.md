<div style="text-align:center">
<h1 style="font-weight:500">N-hentai API</h1>
<p>
<a href="https://npmjs.com/package/kasu.nhentaiapi.js"><img alt="npm" src="https://img.shields.io/badge/stable%20version-2.5.4-brightgreen?style=flat"></a>
<a href="https://npmjs.com/package/kasu.nhentaiapi.js"><img alt="npm" src="https://img.shields.io/badge/lib%20folder%20size-12.9kB-green?style=flat"></a>
<a href="https://nhentai.net/g/177013"><img alt="npm" src="https://img.shields.io/badge/unofficial%20nhentai%20API-gray?style=flat"></a>
</p>
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
    data.page_pics[0];     // https://t.nhentai.net/galleries/1205270/1t.jpg

})

// for json func
async function json(){
    const val = await api.getID(ID).json()
    console.table(val)
    // {
    //   BASE: {      
    //     ID: 228922,
    //     URL: 'https://nhentai.net/g/228922/',
    //     TITLE: { ORIGIN: 'エログロス Vol.2', TRANSLATED: 'EROGROS Vol. 2' },
    //     IMAGES: { 
    //       cover: 'https://t.nhentai.net/galleries/1205270/cover.jpg'
    //       pages: [Array]
    //     },
    //     TAG_TABLE: {
    //       PARODIES: 'none',
    //       CHARACTERS: 'none',
    //       TAG: <censored>,
    //       ARTISTS: 'uziga waita, horihone saizou, momoiro manjiru, tksn, faith, zero punch, hayami kuro, ai7n, senmu',
    //       GROUPS: 'none',
    //       LANGUAGES: 'japanese',
    //       CATEGORIES: 'manga'
    //     },
    //     pages: '244',
    //     uploaded: '2 years, 1 month ago'
    //   }
    // }

    val.base.url // https://nhentai.net/g/228922/
}
```

## Modules

### getID(``id|string``)

The ``id`` can be a string or a number or even the link itself.
``getID()`` has functions ``.list(<fn>)`` and ``.json()``.

Use ``.json()`` if re-defining a variable from the existing scope.
If using ``.json()`` it always need inside an async function and needs an await or else 
it wont work.

NOTE:
``.json()`` defines are different from the others like:
```js
//json
data.base.images.pages[0]
//func
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

**these modules need to be inside of the async function and use await before using them**
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

It uses the Nhentai Searchbar functionality but with a twist.
Every spaces needs to be a ``+`` and some needs ``-``.

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

* 1.0.0 - the creation
* 1.0.1 - fixed some typos
* 1.0.3 - fixed data picture pages call
* 2.0.0 - Updated the code to make it more light-weight less size
* 2.5.0 - Fixed the ``.json()`` where the page array is ``undefined`` | added ``d.ts`` idk what that does but yeah you should see what kinda of function does 
* 2.5.2 - fixed on readme.md typos

This is my First self-made API please enjoy using it!
crediting me will be an appreciation!
