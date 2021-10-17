"use strict";
/*
For those who are using this but the Nhentai website is blocked on the country feel free
to add some idk proxy or other that would help.

I'm kinda busy and away from coding at this time of typing this.
*/
const fetch = require("https").get,
performance = require('perf_hooks').performance

    // DEBUG
    /**************/
    /****/  let Debug = true;
    /****/
    /****/  function debugIteration(string, start){
    /****/      if(Debug) console.log(string, +start.toFixed(2))
    /****/  }
    /**************/

async function fetcher(arg,header) {
  var start = performance.now()
  // arg = arg.split("/").filter(n=>n)
  // if(/random/.test(arg)) arg = arg.splice(-1,2)
  // else arg = arg.splice(-2,3)
  // arg = arg.join("/")
  
  if(!header) header = {"content-type": "text/plain; charset=utf-8"}
  return new Promise((r,e)=>{
      let req = fetch(arg, {headers:{header}},(res) => {
          let str = ''

          // THIS IS THE PAIN IN THE ASS REDIRECTOR FFS, I NEED TO FIX IT SOON THO
          if(res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
            let newUrl = `https://nhentai.net${res.headers.location}`
            let reqNew = fetch(newUrl, {headers:{header}},(resNew)=>{
              resNew.on('data', function(chunk) {str += chunk})
              resNew.on('end', function () {
                r(str)
                debugIteration("(FETCHER.js / redirect) took to iterate: ", performance.now() - start)
              })
            })
            reqNew.end()

          } else {
            res.on('data', function (chunk) { str += chunk })
            res.on('end', function () {
              r(str)
              debugIteration("(FETCHER.js) took to iterate: ", performance.now() - start)
            })
          }
        })
        req.end()
  })
}
module.exports = fetcher;

  // Isomorphic-fetch old code
    // const response = await fetch(arg);
    // // const response = await fetch(arg, {
    // //   "headers": {
    // //     "accept": "text/html",
    // //     "accept-language": "en-US,en;q=0.9",
    // //     "cache-control": "max-age=0",
    // //     "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
    // //     "sec-ch-ua-mobile": "?0",
    // //     "sec-fetch-dest": "document",
    // //     "sec-fetch-mode": "navigate",
    // //     "sec-fetch-site": "none",
    // //     "sec-fetch-user": "?1",
    // //     "upgrade-insecure-requests": "1",
    // //   },
    // //   "referrerPolicy": "strict-origin-when-cross-origin",
    // //   "body": null,
    // //   "method": "GET",
    // //   "mode": "cors"
    // // });
    // const data = await response.body.text();