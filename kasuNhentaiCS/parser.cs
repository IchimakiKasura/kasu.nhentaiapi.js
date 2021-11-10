using System.Text.RegularExpressions;
using System.Text.Json;
using System.Net.Http;
using System;

namespace kasuNhentaiCS
{
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
            BookData returnee = new()
            {
                body = body,
                time = time,
                thumbnail = thumbnail,
                img_source = img_source
            };
            return JsonSerializer.Serialize(returnee);
        }

        public static string BOOKto(string url)
        {
            var html = fetcher.fetch(url);
            kagebunshin(html);
            Regex json = new(@"N\.gallery\((?<parse>.*?)\);", RegexOptions.Singleline);
            var body = Regex.Unescape(json.Match(html.Replace(@"[\r|\n]+| ", "")).Groups["parse"].ToString());
            BookData returnee = new()
            {
                body = body,
                time = time,
                thumbnail = thumbnail,
                img_source = img_source
            };
            return JsonSerializer.Serialize(returnee);
        }
    }

    /// <summary>
    /// A class for Book and Page. <br/>
    /// For this time only "book" method is currently supported <br/>
    /// while "page" method is still work in progress.
    /// </summary>
    public static class Parser
    {
        /// <summary>
        /// Nhentai.net | Nhentai.to<br/>
        /// Request object data from the url 
        /// </summary>
        /// <param name="url">".net" or ".to" are fully supported.<br/>
        /// but It doesnt support numbers yet only full links.<br/>
        /// e.g: <br/>
        /// https://nhentai.net/g/227834/ <br/>
        /// https://nhentai.to/g/132446/
        /// </param>
        public static string book(string url)
        {
            string parodies = "none";
            string chr = "none";
            string tags = "none";
            string Artist = "none";
            string Groups = "none";
            string Lang = "none";
            string Ctg = "none";
            BookData data;
            if (Regex.IsMatch(url, @".net"))
            {
                data = JsonSerializer.Deserialize<BookData>(Matcher.BOOKnet(url));
            }
            else
            {
                data = JsonSerializer.Deserialize<BookData>(Matcher.BOOKto(url));
            }

            var newBody = JsonDocument.Parse(Convert.ToString(data.body), new JsonDocumentOptions{
                AllowTrailingCommas = true
            }).RootElement;

            for (int i = 0; i < newBody.GetProperty("tags").GetArrayLength(); i++)
            {
                string value = newBody.GetProperty("tags")[i].GetProperty("name").GetString();
                switch (newBody.GetProperty("tags")[i].GetProperty("type").ToString())
                {
                    case "tag":
                        if (tags == "none") tags = "";
                        tags += $"{value}, ";
                        break;
                    case "character":
                        if (chr == "none") chr = "";
                        chr += $"{value}, ";
                        break;
                    case "parody":
                        if (parodies == "none") parodies = "";
                        parodies += $"{value}, ";
                        break;
                    case "artist":
                        if (Artist == "none") Artist = "";
                        Artist += $"{value}, ";
                        break;
                    case "language":
                        if (Lang == "none") Lang = "";
                        Lang += $"{value}, ";
                        break;
                    case "category":
                        if (Ctg == "none") Ctg = "";
                        Ctg += $"{value}, ";
                        break;
                    case "group":
                        if (Groups == "none") Groups = "";
                        Groups += $"{value}, ";
                        break;
                }
            }
            
            BookObj returnee = new()
            {
                id = newBody.GetProperty("id").GetInt32(),
                url = url,
                title = new()
                {
                    origin = newBody.GetProperty("title").GetProperty("japanese").GetString(),
                    translated = newBody.GetProperty("title").GetProperty("english").GetString()
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
                number_pages = newBody.GetProperty("num_pages").GetInt32(),
                uploaded = data.time
            };
            
            return JsonSerializer.Serialize(returnee);
        }
    }
}