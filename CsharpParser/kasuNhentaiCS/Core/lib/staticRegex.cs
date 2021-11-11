using System.Text.RegularExpressions;

namespace kasuNhentaiCS
{
    internal class matcherRegex
    {
        public static readonly Regex TimeReg = new(@"<time (.*?)>(?<date>.*)<\/time>", RegexOptions.IgnoreCase | RegexOptions.Compiled); 
        public static readonly Regex ThumbnailReg = new(@"<img class=.* data-src=""(?<thumbs>.*?)"".*?src="".*?"" \/>", RegexOptions.IgnoreCase | RegexOptions.Compiled); 
        public static readonly Regex IdReg = new(@"<a class=""gallerythumb"" href=""(?<id>.*?)/1/""", RegexOptions.IgnoreCase | RegexOptions.Compiled);
        public static readonly Regex BookNet = new(@"JSON\.parse\(""(?<parse>.*)""\)", RegexOptions.Compiled);
        public static readonly Regex BookTo = new(@"N\.gallery\((?<parse>.*?)\);", RegexOptions.IgnoreCase | RegexOptions.Compiled);
        public static readonly Regex pageInfoRegex = new(@"<div class=""gallery"".*?caption"">.*?<", RegexOptions.Singleline | RegexOptions.IgnoreCase | RegexOptions.Compiled);
        
    }
}