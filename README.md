<div align="center">
<img src="https://i.redd.it/fkg9yip5yyl21.png" height="140px" title="nhentai"/>
<h1>N-hentai API</h1>
<p>

[![stable version](https://img.shields.io/badge/stable%20version-3.2.2-brightgreen?style=for-the-badge)](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/CHANGELOG.md#321)
[![Downloads](https://img.shields.io/npm/dt/kasu.nhentaiapi.js.svg?maxAge=3600&style=for-the-badge)](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/CHANGELOG.md#321)
[![Build Status](https://img.shields.io/travis/IchimakiKasura/kasu.nhentaiapi.js.svg?style=for-the-badge)](https://app.travis-ci.com/IchimakiKasura/kasu.nhentaiapi.js)
![minified](https://img.shields.io/badge/-minified%20-gray?style=for-the-badge "^3.0.0 versions are now already MINIFIED!")<br/>
![lol](https://img.shields.io/badge/-Astolfo--chan%20is%20very%20happy%20that%20you%20are%20well%20cultured%20to%20use%20this-ff1100?style=for-the-badge "unofficial api of nhentai")
</div>

The "N-hentai-api" is a fast and easy to use api for connecting to [nhentai.net]("https://nhentai.net/") data.
* Fast*
* Easy to use
* Reliable* :>
* > Discord friendly?

### Install
To install "N-hentai-api" type these:
```
npm i kasu.nhentaiapi.js
```
## Examples
### How to use n-hentai-api
To get the basic info about the ID/Doujin:
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
<div align="center">

<h3> (≧▽≦*) Other Informations (≧▽≦*)</h3>

[![](https://user-images.githubusercontent.com/80595346/137737347-4585f4d6-a590-43e5-af3e-1a3b489886f6.png)](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/LICENSE "MIT Licence")<br/>
[![](https://user-images.githubusercontent.com/80595346/137737333-90ca92bc-5d01-4119-b5c4-d76a4867946d.png)](https://ichimakikasura.github.io/kasu.nhentaiapi.js/ "API Documentation")<br/>
[![](https://user-images.githubusercontent.com/80595346/137737338-26bd22d1-370f-4521-858e-5abd34b8fade.png)](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/CHANGELOG.md "Update History")
<hr>
Enjoy using it! crediting me will be an appreciation!<br/>
<a href="https://github.com/IchimakiKasura/kasu.nhentaiapi.js" title="Star it!">Star</a> it if you like it!<br/>
<img src="https://raw.githubusercontent.com/IchimakiKasura/IchimakiKasura/main/astorufo.png" title="Created by Ichimaki" height="60"/>