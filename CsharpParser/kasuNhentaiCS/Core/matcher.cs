using System.Text.RegularExpressions;
using System.Collections.Generic;

namespace kasuNhentaiCS
{
    internal class Matcher : matcherRegex
    {
        static dynamic kagebunshin(string html)
        {
            var time = TimeReg.Match(html).Groups["date"].ToString();
            var thumbnail = ThumbnailReg.Match(html).Groups["thumbs"].ToString();
            var id = IdReg.Match(html).Groups["id"].ToString();
            var img_source = thumbnail.Replace("/cover.jpg", "");
            return new
            {
                id,
                time,
                thumbnail,
                img_source
            };
        }

        public static BookData BOOKnet(string url)
        {
            var html = fetcher.fetch(url);
            var clones = kagebunshin(html);
            string body = Regex.Unescape(Regex.Unescape(BookNet.Match(html).Groups["parse"].ToString()));

            return new()
            {
                id = clones.id,
                body = body,
                time = clones.time,
                thumbnail = clones.thumbnail,
                img_source = clones.img_source.Replace("t.nhentai", "i.nhentai")
            }; ;
        }

        public static BookData BOOKto(string url)
        {
            var html = fetcher.fetch(url);
            var clones = kagebunshin(html);
            var body = Regex.Unescape(BookTo.Match(html.Replace(@"[\r|\n]+| ", "")).Groups["parse"].ToString());
            return new()
            {
                id = clones.id,
                body = body,
                time = clones.time,
                thumbnail = clones.thumbnail,
                img_source = clones.img_source
            }; ;
        }

        // I got tired create a class just for this shit. Dynamic it is
        public static dynamic PageInfo(string url)
        {
            var html = fetcher.fetch(url);
            int totalPage;
            if (Regex.IsMatch(html, @"<h2>(0|No) [r|R]esults")) return "No results were found";
            List<string> body = new List<string>();
            foreach (Match m in pageInfoRegex.Matches(html))
            {
                body.Add(m.Value);
            }

            try
            {
                totalPage = int.Parse(Regex.Match(html, @"page=(?<page>.*?)""").Groups["page"].ToString());
            }
            catch
            {
                totalPage = 1;
            }

            return new
            {
                body,
                totalPage
            };
        }
    }
}