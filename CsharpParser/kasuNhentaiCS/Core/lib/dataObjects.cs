using System.Runtime.CompilerServices;
using System.Text.Json;
using System;

#nullable enable annotations

namespace kasuNhentaiCS
{
    internal sealed class BookData
    {
        public string id { get; set; }
        public string body { get; set; }
        public string time { get; set; }
        public string thumbnail { get; set; }
        public string img_source { get; set; }

    }

    /// <summary>
    /// Book Object properties.
    /// </summary>
    [Serializable]
    public class BookObj
    {
        /// <summary>
        /// • ID or Code or whatever you call.
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// • Url of the selected code.
        /// </summary>
        public string url { get; set; }
        /// <summary>
        /// • titles?
        /// </summary>
        public _Title title { get; set; }
        /// <summary>
        /// • images?
        /// </summary>
        public _Images images { get; set; }
        /// <summary>
        /// • tags?
        /// </summary>
        public _Tag_table tag_table { get; set; }
        /// <summary>
        /// • haha 69 pages seems cool.
        /// </summary>
        public int number_pages { get; set; }
        /// <summary>
        /// • Hokusai made The Dream of the Fisherman's Wife in 1814, the earliest known Tentacle hentai.
        /// In 1722 the government made a law banning hentai manga, which means it was common even earlier.
        /// Suzumi-fune is probobly the oldest hentai anime, it's from 1932.
        /// </summary>
        public string uploaded { get; set; }

        public class _Title
        {
            /// <summary>
            /// original
            /// </summary>
            public string origin { get; set; }
            /// <summary>
            /// トランスレイト??? wait it's supposed to be in english cuz' it's translated.
            /// </summary>
            public string translated { get; set; }
        }
        public class _Images
        {
            /// <summary>
            /// • Doujin cover image.
            /// </summary>
            public string cover { get; set; }
            /// <summary>
            /// • Doujin image source.
            /// </summary>
            public string page_source { get; set; }
        }
        public class _Tag_table
        {
            /// <summary>
            /// • I Like konosuba
            /// </summary>
            public string parodies { get; set; }
            /// <summary>
            /// • I love megumin
            /// </summary>
            public string characters { get; set; }
            /// <summary>
            /// • what?
            /// </summary>
            public string tag { get; set; }
            /// <summary>
            /// • I don't really know about this
            /// </summary>
            public string artist { get; set; }
            /// <summary>
            /// • Can't think 1 group tag.
            /// </summary>
            public string groups { get; set; }
            /// <summary>
            /// • english ofc.
            /// </summary>
            public string langugaes { get; set; }
            /// <summary>
            /// • ca
            /// </summary>
            public string categories { get; set; }
        }

    }
    /// <summary>
    /// Page Object properties.
    /// </summary>
    [Serializable]
    public sealed class PageObj
    {
        /// <summary>
        /// Gives the Url.
        /// </summary>
        public string CurrentUrl { get; set; }
        /// <summary>
        /// idk.
        /// </summary>
        public string typePage { get; set; }
        /// <summary>
        /// Gives an index number of what page you are currently in.
        /// </summary>
        public int CurrentPage { get; set; }
        /// <summary>
        /// Total arrays.
        /// </summary>
        public int Total { get; set; }
        /// <summary>
        /// Total Pages ofc.
        /// </summary>
        public int TotalPage { get; set; }
        /// <summary>
        /// results in array. wha-
        /// </summary>
        public _secondObject[] results { get; set; }
        
        public class _secondObject
        {
            /// <summary>
            /// ID or Code or whatever you call.
            /// </summary>
            public int id { get; set; }
            /// <summary>
            /// taitoru.
            /// </summary>    
            public string title { get; set; }
            /// <summary>
            /// Cover picture.
            /// </summary>    
            public string thumbnail { get; set; }
            /// <summary>
            /// It's just the combination of the currenturl with id innit.
            /// </summary>    
            public string url { get; set; }
            /// <summary>
            /// NANI TTE-
            /// </summary>    
            public string languages { get; set; }
        }
    }
}