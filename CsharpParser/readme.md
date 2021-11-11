# kasu.nhentaiapi.CS

I'll try implementing a C# version of my [kasu.nhentaiapi.js](https://github.com/IchimakiKasura/kasu.nhentaiapi.js) API's parser.js.

## Usage

### Before using Reference the `.DLL` to your `.csproj` file
Add this on the `<ItemGroup>`:<br/>
```csproj
<Reference Include="kasuNhentaiCS">
    <HintPath>-your path to-\output\kasuNhentaiCS.dll</HintPath>
    <HintPath>-your path to-\output\kasuNhentaiCS.Json.dll</HintPath>
</Reference>
```
Or put the `kasuNhentaiCS.dll` and `kasuNhentaiCS.Json.dll` in your root project and do
```csproj
<Reference Include="kasuNhentaiCS">
    <HintPath>kasuNhentaiCS.dll</HintPath>
    <HintPath>kasuNhentaiCS.Json.dll</HintPath>
</Reference>
```

## Example
```cs
using System;
using System.Text;
using kasuNhentaiCS;    // You don't wanna miss this

namespace Sample
{
    class SampleSample
    {
        static void Main(string[] args)
        {
            // Always do this unless you don't wanna see japanese characters will go "????"
            // when doing a "Console.WriteLine"
            Console.OutputEncoding = Encoding.UTF8;
            
            // Make a Request | async isn't supported yet.
            BookObj Data = Parser.book("https://nhentai.net/g/228922");

            // Tada!
            Console.WriteLine(Data.id);
            Console.WriteLine(Data.url);
            Console.WriteLine(Data.images.cover);
        }
    }
}

```

## Book Objects 
```json
{
    "id": 228922,
    "url": "https://nhentai.net/g/228922/",
    "title": { 
        "origin": "[アンソロジー] エログロス Vol.2 [DL版]",
        "translated": "[Anthology] EROGROS Vol. 2 [Digital]",
    },
    "images": { 
        "cover": "https://t.nhentai.net/galleries/1205270/cover.jpg",
        "pages_source": "https://i.nhentai.net/galleries/1205270",
    },
    "tag_table": {
        "parodies": "none",
        "characters": "none",
        "tag": "anal birth, balls expansion, big balls, big breasts, big penis, dickgirl on male, impregnation, lactation, shotacon, transformation, abortion, ahegao, amputee, bondage, cannibalism, collar, daughter, futanari, glasses, guro, human pet, lolicon, monster girl, necrophilia, piercing, pregnant, randoseru, ryona, sister, snuff, tentacles, anthology, group, incest, birth, urethra insertion, breast expansion, multiple breasts, torture, dick growth, yaoi",
        "artists": "uziga waita, horihone saizou, momoiro manjiru, tksn, faith, zero punch, hayami kuro, ai7n, senmu",
        "groups": "none",
        "languages": "japanese",
        "categories": "manga"
    },
    "number_pages": 244,
    "uploaded": "2 years, 1 month ago"
}
```
## Page Objects
```json
{
    "CurrentUrl": "https://nhentai.to",
    "typePage": "language / japanese",
    "CurrentPage": 1,
    "Total": 25,
    "TotalPage": 8524,
    "result":
    [
        {
            "id": 374305,
            "title":  "[LV43 (Shia)] Onee-sama, Kore ga Hoshiino (Jinrou Judgement) [Digital]",
            "thumbnail":  "https://t.dogehls.xyz/galleries/2018823/thumb.jpg",
            "url":  "https://nhentai.to/g/374305",
            "languages":  "japanese"
        },
        {
            //and more...
        }
    ]
}
```