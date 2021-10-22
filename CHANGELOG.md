<!-- official changelog will only store upto 5 versions -->
<!-- go to the "CHANGELOG.history.md" to check all the changes -->
# 3.5.1
- IF YOU HAVE A FAST AF INTERNET PLS CAN U SLOW?<BR>
On my travis.ci build on 3.5.0 It has a status code 429 which stands for "too many request" so do not request TOO MUCH or TOO MANY if you have a fast internet. I don't know how to fix this yet but I will find a way soon.
# 3.5.0
## New Update
- Class constructor changed.
- New properties Added:
    - url
    - connection

- New methods Added:
    - pHomepage
    - pLanguagePage
    - pSearch
    - pTagPage

-> [See the Documentation for more info](https://ichimakikasura.github.io/kasu.nhentaiapi.js/)

**Removed** request headers property:<br>
> Module's fetcher is now changed from `https` to `http2` which no longer require `keepAlive` which is also made the module performance better*

### Code rebuild!
The `fecther` and `shorter` is now one piece and named `parser.js`.<br>
Code rebuild also improve some performance*.

Definition is also more friendly to be able to access properties, methods and more.
>![](https://user-images.githubusercontent.com/80595346/138507052-91cc4737-99de-4c77-888e-b6a8e2518e8c.png)
![](https://user-images.githubusercontent.com/80595346/138507326-99124b4a-2e83-49c7-aed1-6e1f4e51fb17.png)
![](https://user-images.githubusercontent.com/80595346/138507826-0901a67f-bd49-42dc-b18d-ce9d932e0ef0.png)
![](https://user-images.githubusercontent.com/80595346/138507546-b99afde1-8d69-4eda-9909-ef9caabffee9.png)

# 3.2.2
## Documentation Update
- Added Documentation
- New readme.md style
# 3.2.1
## Quick Fix
- [issue #3](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/issues/3) is fixed.
## Changes
- You can now see the property inside of the json's Data on the new Declaration.<br>
example of the new declaration:
<br>
<img src="https://user-images.githubusercontent.com/80595346/137313293-342282e4-fa55-475f-aa9b-47dcab9c8cc6.png" width="450px"><br>

- New property `requestHeaders`
- API's fetcher now uses `https`. If you experience slowdowns you can use `Isomorpic-fetch` again from the
previous version but you can't use the new property `requestHeaders`. check my test on some few "[fetchers](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/lib/src/bruh.log)" 

## idk
- Added `IgnoreNone`, Idk about this but it just removes the "blank/empty" tags on the Json when received. Example:
```js
// IgnoreNone = false;
// the json object will join the empty tags
    title: {
        origin: 'none'
        translated: 'example'
    }
// IgnoreNone = true;
// It'll remove the 'none' or 'blank/empty' tags in the object
    title: {
        translated: 'example'
    }
// calling the removed tag will result in an error if IgnoreNone is True.
```
# 3.0.1
## Quick patch
- version 3.0.0 code clean has some problem, putted too many `awaits` that makes it slow is now Fixed.</br>
note: `overAlltest.js` should always end with a 1min test or lower, If it exceed 1min30sec means there's something wrong in my code please do a PR.