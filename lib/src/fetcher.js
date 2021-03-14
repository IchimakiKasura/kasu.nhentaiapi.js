const fetch = require("isomorphic-fetch")
module.exports = async function fetcher(arg) {
  const response = await fetch(arg, {
    "headers": {
      "accept": "text/html",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
  });
  const data = await response.text()
  return data
}
