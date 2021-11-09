using System.Security.AccessControl;
using System.Text;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Net.Http;
using System.Diagnostics;
using System;

namespace kasuNhentaiCS
{
    // objects
    namespace DataObj
    {
        internal class BookData
        {
            public string body { get; set; }
            public string time { get; set; }
            public string thumbnail { get; set; }
            public string img_source { get; set; }

        }

        [Serializable]
        public class Data
        {
            public int id { get; set; }
            public string url { get; set; }
            public _Title title { get; set; }
            public _Images images { get; set; }
            public _Tag_table tag_table { get; set; }
            public int number_pages { get; set; }
            public string uploaded { get; set; }

            public class _Title
            {
                public string origin {get; set;}
                public string translated {get; set;}
            }
            public class _Images
            {
                public string cover {get; set;}
                public string page_source {get; set;}
            }
            public class _Tag_table
            {
                public string parodies {get; set;}
                public string characters {get; set;}
                public string tag {get; set;}
                public string artist {get; set;}
                public string groups {get; set;}
                public string langugaes {get; set;}
                public string categories {get; set;}
            }

        }
    }

    internal class kasunhentaiapi
    {

        static void Log(dynamic args)
        {
            Console.WriteLine(args);
        }

        // Testing purposes
        static void Main(string[] args)
        {
            // always add this on your Main or the japanese characters will go "????"
            Console.OutputEncoding = Encoding.UTF8;
            
            // var watch = new Stopwatch();
            // watch.Start();
            // var req = Parse.book("https://nhentai.net/g/228922");
            // var data = JsonConvert.DeserializeObject<DataObj.Data>(req);
            // watch.Stop();
            // Log(watch.Elapsed);
            // Log(req);
        }
    }

    internal static class fetcher
    {
        public static string fetch(string url)
        {
            string res = "";
            int status;
            using (var client = new HttpClient())
            {
                client.DefaultRequestVersion = new Version(2, 0);
                var result = client.GetAsync(url).Result;
                status = (int)result.StatusCode;
                res = result.Content.ReadAsStringAsync().Result;
            }

            if (status != 200)
            {
                Console.WriteLine("Retry Fetch");
                return fetch(url);
            }
            else return res;
        }
    }

    internal static class Matcher
    {
        // readonly static Regex errorRegex = new(@"<h2>(0|No) [r|R]esults", RegexOptions.Compiled);

        private static string time;
        private static string thumbnail;
        private static string img_source;
        static void kagebunshin(string html)
        {
            Regex bookThumbRegex = new(@"<img.*data-src=""(?<thumbs>.*?)"".*?src="".*?"" \/>", RegexOptions.Compiled);
            Regex bookTimeRegex = new(@"<time (.*)>(?<date>.*)<\/time>", RegexOptions.Compiled);
            time = bookTimeRegex.Match(html).Groups["date"].ToString();
            thumbnail = bookThumbRegex.Match(html).Groups["thumbs"].ToString();
            img_source = thumbnail.Replace("/cover.jpg", "");
        }
        public static string BOOKnet(string url)
        {
            var html = fetcher.fetch(url);
            kagebunshin(html);
            Regex json = new(@"JSON\.parse\(""(?<parse>.*)""\)", RegexOptions.Compiled);
            string body = Regex.Unescape(Regex.Unescape(json.Match(html).Groups["parse"].ToString()));
            DataObj.BookData returnee = new()
            {
                body = body,
                time = time,
                thumbnail = thumbnail,
                img_source = img_source
            };
            return JsonConvert.SerializeObject(returnee);
        }

        public static string BOOKto(string url)
        {
            var html = fetcher.fetch(url);
            kagebunshin(html);
            Regex json = new(@"N\.gallery\((?<parse>.*?)\);", RegexOptions.Singleline);
            var body = Regex.Unescape(json.Match(html.Replace(@"[\r|\n]+| ", "")).Groups["parse"].ToString());
            DataObj.BookData returnee = new()
            {
                body = body,
                time = time,
                thumbnail = thumbnail,
                img_source = img_source
            };
            return JsonConvert.SerializeObject(returnee);
        }
    }

    // <summary>
    // A class for Book and Page.
    // </summary>
    public static class Parse
    {
        // <summary>
        // book.
        // </summary>
        public static string book(string url)
        {
            string parodies = "none";
            string chr = "none";
            string tags = "none";
            string Artist = "none";
            string Groups = "none";
            string Lang = "none";
            string Ctg = "none";
            DataObj.BookData data;
            if (Regex.IsMatch(url, @".net"))
            {
                data = JsonConvert.DeserializeObject<DataObj.BookData>(Matcher.BOOKnet(url));
            }
            else
            {
                data = JsonConvert.DeserializeObject<DataObj.BookData>(Matcher.BOOKto(url));
            }
            dynamic newBody = JsonConvert.DeserializeObject<dynamic>(data.body);

            for (int i = 0; i < newBody.tags.Count; i++)
            {
                switch (newBody.tags[i].type.ToString())
                {
                    case "tag":
                        if (tags == "none") tags = "";
                        tags += $"{newBody.tags[i].name}, ";
                        break;
                    case "character":
                        if (chr == "none") chr = "";
                        chr += $"{newBody.tags[i].name}, ";
                        break;
                    case "parody":
                        if (parodies == "none") parodies = "";
                        parodies += $"{newBody.tags[i].name}, ";
                        break;
                    case "artist":
                        if (Artist == "none") Artist = "";
                        Artist += $"{newBody.tags[i].name}, ";
                        break;
                    case "language":
                        if (Lang == "none") Lang = "";
                        Lang += $"{newBody.tags[i].name}, ";
                        break;
                    case "category":
                        if (Ctg == "none") Ctg = "";
                        Ctg += $"{newBody.tags[i].name}, ";
                        break;
                    case "group":
                        if (Groups == "none") Groups = "";
                        Groups += $"{newBody.tags[i].name}, ";
                        break;
                }
            }
            DataObj.Data returnee = new()
            {
                id = newBody.id,
                url = url,
                title = new()
                {
                    origin = newBody.title.japanese,
                    translated = newBody.title.english
                },
                images = new()
                {
                    cover = data.thumbnail,
                    page_source = data.img_source
                },
                tag_table = new()
                {
                    parodies = parodies,
                    characters = chr,
                    tag = tags,
                    artist = Artist,
                    groups = Groups,
                    langugaes = Lang,
                    categories = Ctg
                },
                number_pages = newBody.num_pages,
                uploaded = data.time
            };
            
            return JsonConvert.SerializeObject(returnee);
        }
    }
}