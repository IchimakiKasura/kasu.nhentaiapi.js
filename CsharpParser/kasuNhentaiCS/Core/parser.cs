using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Threading.Tasks;
using kasuNhentaiCS.Json;
using System.Net.Http;
using System.Linq;
using System;

namespace kasuNhentaiCS
{
    internal static class fetcher
    {
        static readonly HttpClient request = new();
        public static string fetch(string url)
        {
            TimeSpan delay = default;
            HttpResponseMessage res;
            int status;

            try
            {
                using (request)
                {
                    request.DefaultRequestVersion = new Version("2.0");
                    var result = request.GetAsync(url).Result;
                    status = (int)result.StatusCode;
                    res = result;
                }

                if (status != 200)
                {
                    if (status == 429) {
                        delay = res.Headers.RetryAfter.Delta ?? TimeSpan.FromSeconds(1);
                        Task.Delay(delay);
                    }
                    return fetch(url);
                }
                else return res.Content.ReadAsStringAsync().Result;
            }
            catch
            {
                throw new Exception("[404 | ERROR] URL is Invalid");
            }
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
        /// <exception cref="System.ArgumentException"></exception>
        /// <exception cref="System.Exception"></exception>
        public static BookObj book(string url)
        {
            string parodies = "none";
            string chr = "none";
            string tags = "none";
            string Artist = "none";
            string Groups = "none";
            string Lang = "none";
            string Ctg = "none";
            BookData data;
    
            if (!Regex.IsMatch(url, "/g/"))
            {
                throw new ArgumentException("[Book] URL is invalid!", nameof(url));
            }

            if (Regex.IsMatch(url, @".net"))
            {
                data = Matcher.BOOKnet(url);
                url = $"https://nhentai.net{data.id}";
            }
            else
            {
                data = Matcher.BOOKto(url);
                url = $"https://nhentai.to{data.id}";
            }

            var newBody = new JsonDeserializer(data.body, new JsonDocOptions
            {
                AllowTrailingCommas = true
            });

            for (int i = 0; i < newBody.selector($"tags").count; i++)
            {
                string value = newBody.selector($"tags:{i}>name");
                switch (newBody.selector($"tags:{i}>type"))
                {
                    case "tag":
                        if (tags == "none")
                        {
                            tags = "";
                            tags += $"{value}";
                        } else tags += $", {value}";
                        break;
                    case "character":
                        if (chr == "none")
                        {
                            chr = "";
                            chr += $"{value}, ";
                        } else chr += $",{value}";
                        break;
                    case "parody":
                        if (parodies == "none")
                        {
                            parodies = "";
                            parodies += $"{value}, ";
                        } else parodies += $",{value}";
                        break;
                    case "artist":
                        if (Artist == "none")
                        {
                            Artist = "";
                            Artist += $"{value}, ";
                        } else Artist += $",{value}";
                        break;
                    case "language":
                        if (Lang == "none")
                        {
                            Lang = "";
                            Lang += $"{value}, ";
                        } else Lang += $",{value}";
                        break;
                    case "category":
                        if (Ctg == "none")
                        {
                            Ctg = "";
                            Ctg += $"{value}, ";
                        } else Ctg += $",{value}";
                        break;
                    case "group":
                        if (Groups == "none")
                        {
                            Groups = "";
                            Groups += $"{value}, ";
                        } else Groups += $",{value}";
                        break;
                }
            }

            BookObj returnee = new()
            {
                id = int.Parse(data.id.Replace("/g/", "")),
                url = url,
                title = new()
                {
                    origin = newBody.selector("title>japanese"),
                    translated = newBody.selector("title>english")
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
                number_pages = newBody.selector("num_pages"),
                uploaded = data.time
            };

            return returnee;
        }
        /// <summary>
        /// Nhentai.net | Nhentai.to<br/>
        /// Request object data from the url 
        /// </summary>
        /// <param name="page">Page yes page.</param>
        /// <param name="url">".net" or ".to" are fully supported.<br/>
        /// but It doesnt support numbers yet only full links.<br/>
        /// e.g: <br/>
        /// https://nhentai.net/ <br/>
        /// https://nhentai.to/search/konosuba+aqua/ <br/>
        /// https://nhentai.net/tag/crossdressing
        /// </param>
        /// <exception cref="System.ArgumentException"></exception>
        /// <exception cref="System.Exception"></exception>
        public static PageObj page(string url, int? page = default)
        {

            Regex URLregex = new(@"language\/.*|tag\/.*|character\/.*|artist\/.*|parody\/.*|group\/.*|category\/.*|(search\/|search\?q=).*|\?q=.*", RegexOptions.Compiled);
            Regex TAGregex = new(@"https:\/\/nhentai\.(to|net)|\/language|\/tag|\/character|\/artist|\/parody|\/group|\/category|\/", RegexOptions.Compiled);

            if (Regex.IsMatch(url, "/g/"))
            {
                throw new ArgumentException("[Page] URL is invalid!", nameof(url));
            }

            if (page == null || page == 0) page = 1;

            var pageURL = $"{url}?page={page}";

            if(Regex.IsMatch(url, "search")) pageURL = $"{url}&page={page}";

            var PageInfo = Matcher.PageInfo(url);
            List<string> data = PageInfo.body;
            var totalPage = PageInfo.totalPage;

            List<string> tags = new List<string>
            {
                "language", 
                "tag", 
                "character", 
                "artist", 
                "parody", 
                "group", 
                "category"
            };

            PageObj._secondObject[] dataList = new PageObj._secondObject[data.Count];

            foreach (var s in data.Select((value, i) => ( value, i )))
            {
                int id = int.Parse(Regex.Match(s.value, @"href=""/g/(?<id>.*?)/""").Groups["id"].ToString());
                string[] Lang = Regex.Match(s.value, @"data-tags=""(.*?)""").ToString().Split(" ");
                string languages = "";

                foreach(string lang in Lang)
                {
                    if (Regex.IsMatch(url, @".net"))
                    {
                        switch (lang)
                        {
                            case "6346": languages += "japansese, ";
                                break;
                            case "29963": languages += "chinese, ";
                                break;
                            case "12227": languages += "english, ";
                                break;
                            case "17249": languages += "translated, ";
                                break;
                        }
                    }
                    else
                    {
                        switch (lang)
                        {
                            case "2": languages += "japansese, ";
                                break;
                            case "10197": languages += "chinese, ";
                                break;
                            case "19": languages += "english, ";
                                break;
                            case "17": languages += "translated, ";
                                break;
                        }
                    }
                }

                dataList[s.i] = new()
                {
                    id = id,
                    title = Regex.Match(s.value, @"caption"">(?<title>.*?)<").Groups["title"].ToString(),
                    thumbnail = Regex.Match(s.value, @"data-src=""(?<thumb>.*?)""").Groups["thumb"].ToString(),
                    url = $"{URLregex.Replace(url, "")}g/{id}",
                    languages = languages
                };
            }

            PageObj list = new()
            {
                CurrentUrl = url,
                typePage = "homepage",
                CurrentPage = (int)page,
                Total = data.Count,
                TotalPage = totalPage,
                results = dataList
            };

            for (var i = 0; i < tags.Count; i++)
            {
                if (Regex.IsMatch(url, tags[i]))
                {
                    list.typePage = $"{tags[i]} / {TAGregex.Replace(url, "")}";
                }
            }

            if (Regex.IsMatch(url, @"search"))
            {
                Regex urlReplace = new(@"https:\/\/nhentai\.(to|net)\/search|\?q=|\/|&", RegexOptions.Compiled);
                list.typePage = $"search / {urlReplace.Replace(url, "")}";
            }

            return list;
        }
    }
}
