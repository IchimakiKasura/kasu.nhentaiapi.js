using System;
using System.Text;
// using System.Text.Json;

// Testing purposes
namespace kasuNhentaiCS
{
    static class console
    {
        public static void log(dynamic args)
        {
            Console.WriteLine(args);
        }
    }
    internal class kasunhentaiapi
    {
        // Testing purposes
        static void Main(string[] args)
        {
            // always add this on your Main or the japanese characters will go "????"
            Console.OutputEncoding = Encoding.UTF8;

            var watch = new System.Diagnostics.Stopwatch();
            watch.Start();
            // console.log("-----NET-----");
            // PageObj ass = Parser.page("https://nhentai.net/tag/crossdressing");
            // console.log("CurrentUrl: "+ass.CurrentUrl);
            // console.log("typePage: "+ass.typePage);
            // console.log("CurrentPage: "+ass.CurrentPage);
            // console.log("Total: "+ass.Total);
            // console.log("TotalPage: "+ass.TotalPage);
            // console.log("---results---");
            // int s = 0;
            // foreach (var item in ass.results)
            // {
            //     s++;
            //     console.log($"page: {s}----");
            //     console.log(item.id);
            //     console.log(item.languages);
            //     console.log(item.thumbnail);
            //     console.log(item.title);
            //     console.log(item.url);
            //     console.log("-----------");
            // }
            BookObj data = Parser.book("https://nhentai.net/g/0");
            Console.WriteLine(data.id);
            Console.WriteLine(data.url);
            Console.WriteLine(data.title.origin);
            Console.WriteLine(data.title.translated);
            Console.WriteLine(data.images.cover);
            Console.WriteLine(data.images.page_source);
            Console.WriteLine(data.tag_table.tag);
            Console.WriteLine(data.number_pages);
            Console.WriteLine(data.uploaded);
            watch.Stop();
            console.log(watch.Elapsed);
            // Log(req);
        }
    }
}