var fs = require("fs");

var _data = require("./Data/Constant/types.json");
// console.log(_data)

for (let index = 0; index < _data.length; index++) {
  const element = _data[index];
  console.log(element);
  downloadData(element["type"]);
}

function downloadData(search) {
  var request = require("request");
  var options = {
    method: "POST",
    url: "https://media.invideo.io/get_templates_v2",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Origin: "https://invideo.io",
      Referer: "https://invideo.io/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "sec-ch-ua":
        '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    },
    body: JSON.stringify({
      count: 1000,
      offset: 0,
      workflow: "marketing",
      query: {
        dimensions: ["9:16"],
        search_term: search,
        purchased: false,
        favourites: false,
        category: false,
        industries: [],
        default_search: false,
        categories_info: [],
      },
    }),
  };
  request(options, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      try {
        let json = JSON.parse(response.body);
        // console.log(json);
        saveJson(search, json);
      } catch (error) {
        console.log(error);
      }
    }
  });
}
function saveJson(name, data) {
  fs.writeFile(
    `./DownloadData/${name}.json`,
    JSON.stringify(data),
    "utf8",
    (callback) => { }
  );
}
