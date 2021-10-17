<!-- official changelog will only store upto 5 versions -->
<!-- go to the "CHANGELOG.history.md" to check all the changes -->
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

# 3.0.0

## Update
- cleaned the codes to reduce the file size.
- all JS files are now minified when installing through `npm install`.
- Added `blockedWords` for `IsDiscord`.</br>
example:
```js
    api.blockedWords = "crossderssing gore etc"
    // or "crossderssing,gore,etc" or "crossderssing gore,etc"
```

# 2.9.2
Hotfix and code update

- reduced the file size again by cleaning the codes.
- `pRandom` is now fixed from giving `link is not defined` error message.
- last 2.9.0 the json object that showed on the readme is fixed and available to all pRand functions. 
- updated the `fetcher.js`.

# 2.9.0

## New Update
### Added new `IsDiscord`
* It blocks some selected tags that violate Discord rules.
If the doujin has those tags it will throw an error. So that you will need to
execute another one again until that doujin has a clean tags.
- Added the `ReRollonFail` bool for this specific new feature.
- this feature is credited to [crackheadakira](https://github.com/crackheadakira)
`getID()` update:
- the function `list()` is now removed so you can now only use 1 function `json()`
this will cause changes on some codes that uses `list()` like `data.cover` is now `data.images.cover` see more on the [README](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/blob/main/README.md) page 
- You can now download the mini file version of this 2.9 [here](https://github.com/IchimakiKasura/kasu.nhentaiapi.js/releases/tag/2.9.0)

- Problem right now after publishing 2.9:<br>
the function `pRandom` has something weird saying `link is not defined` this will be fixed soon