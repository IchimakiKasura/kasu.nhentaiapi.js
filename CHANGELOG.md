# 2.7.6

Quick Patch 

* ``main.d.ts`` is finally fixed, I don't know how to use typescript but adding them so functions have meanings or 
how they work. I don't know? Im not an expert.

# 2.7.5

Quick Hotfix Patch 

* removed the ``console.log`` on the ``pRandSpecificTags()``.

# 2.7.4

Patch update

* updated: README.md
* FIXED: ``pRandSpecificTags()``. if the nhentai page has 0 it causes an error because it can't compute to randomize it fixed by adding a ``try`` and ``catch``.
* added Throw error when the given ID is invalid to make it easier to create custom errors using `try and catch`

# 2.7.3

Patch update

* updated: README.md
* added my self-made discord bot called "nhentai-roulette" using this api.

# 2.7.2

Quick Hotfix Patch 

* FIXED: ``main.js`` url is accidentally put to ``${url}`` instead of the link.

# 2.7.0

Minor update

* Fixed some typos on the [readme.md](https://github.com/IchimakiKasura/kasu.nhentaiap.js#readme)
* ``Randrange.js`` is too short so it has been removed but the contents has been transfered to the ``main.js``
* added few more testing on ``test.js`` to make sure everything works.
* added changelog :>

# 2.5.4 

Update

* added github repos :> correct my codes! or add more?

# 2.5.2

Patch update

* Fixed some typos on the [readme.md](https://github.com/IchimakiKasura/kasu.nhentaiap.js#readme)

# 2.5.0

Not really a major update but why not

* Fixed the ``.json()`` where the page array is ``undefined``
* added ``d.ts`` idk what that does but yeah you should see what kinda of function does 

# 2.0.0

Not really a major update but why not

* some new stuff

# 1.0.3

Patch update

* Fixed ``.json()`` data picture pages call
```js
//old
data.BASE.IMAGES.THUMBS[0]
//new
data.base.images.page_pic[0]
```

# 1.0.1

Patch update

* Fixed some typos on the [readme.md](https://github.com/IchimakiKasura/kasu.nhentaiap.js#readme)


# 1.0.0

The Creation

* added tons