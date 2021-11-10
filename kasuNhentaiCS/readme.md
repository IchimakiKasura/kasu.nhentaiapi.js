# kasu.nhentaiapi.CS

I'll try implementing a C# version of my API's parser.

## Usage

### Before using Reference the `.DLL` to your `.csproj` file
Add this on the `<ItemGroup>`:<br/>
```csproj
<Reference Include="kasuNhentaiCS">
    <HintPath>-your path to-\kasu.nhentaiapi.js\kasuNhentaiCS\output\kasuNhentaiCS.dll</HintPath>
</Reference>
```
Or put the `kasuNhentaiCS.dll` in your root project and do
```csproj
<Reference Include="kasuNhentaiCS">
    <HintPath>kasuNhentaiCS.dll</HintPath>
</Reference>
```

## Example
```cs
using System;
using System.Text;
using System.Text.Json;
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
            
            // Make a Request
            string Json = Parser.book("https://nhentai.net/g/228922");

            // Deserialize to get the Properites
            BookObj Data = JsonSerializer.Deserialize<BookObj>(Json);

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
        "pages_source": "https://t.nhentai.net/galleries/1205270",
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
