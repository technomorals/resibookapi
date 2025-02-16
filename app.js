const puppeteer = require("puppeteer");
const fs = require("fs");
const async = require("async");
async function _open(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: "domcontentloaded" });

      // Extract data
      var pageData = await page.evaluate(() => {
        return document.body.innerText;
      });

      if (pageData) {
        pageData = JSON.parse(pageData);
      }
      await browser.close();
      return resolve(pageData);
    } catch (error) {
      return resolve(null);
    }
  });
}

async function _(url) {
  return new Promise(async (resolve, reject) => {
    var data = await _open(url);
    if (data && data["data"]) {
      data = data["data"];
    }
    return resolve(data);
  });
}

function _downloadData(item, index) {
  return new Promise(async (resolve, reject) => {
    console.log("index: " + index);
    var _indexData = item;
    let projectID = item["projectRegId"];
    var formThreeIdData;
    if (!projectID) {
    } else {
      let alldatabyprojectid = `https://gujrera.gujarat.gov.in/project_reg/public/alldatabyprojectid/${projectID}`;
      let alldatabyprojectData = await _(alldatabyprojectid);
      let formThreeId = alldatabyprojectData["formThreeId"];
      if (formThreeId) {
        let formThreeIdURL = `https://gujrera.gujarat.gov.in/formthree/public/getform-three-byid/${formThreeId}`;
        formThreeIdData = await _(formThreeIdURL);
      }

      // let projectBlockDetails = `https://gujrera.gujarat.gov.in/citizen_survey/citizen_claim/get-project-all-block${projectID}`;
      // let projectBlockDetailsData = await _(projectBlockDetails);

      // let projectLocation = `https://gujrera.gujarat.gov.in/maplocation/public/getProjectLocations/${projectID}`;
      // let projectLocationData = await _(projectLocation);

      _indexData["alldatabyprojectData"] = alldatabyprojectData;
      _indexData["formThreeIdData"] = formThreeIdData;
      // _indexData["projectBlockDetailsData"] = projectBlockDetailsData;
      // _indexData["projectLocationData"] = projectLocationData;
    }
    saveProjectDetails(_indexData, projectID, index);
    resolve(true);
  });
}

var allData = require("./Data/RERA/gujarat.json");
allData = allData["data"];
var index = 14236;
const BATCH_SIZE = 5; // Number of concurrent downloads

async function _downloadBatch(startIndex) {
  // Create a batch of 10 downloads (or remaining items)
  const batch = allData
    .slice(startIndex, startIndex + BATCH_SIZE)
    .map((item, i) => {
      const currentIndex = startIndex + i; // Actual index in allData
      return _downloadData(item, currentIndex).then((res) => {
        console.log(`✅ Downloaded index ${currentIndex}:`, res);
      });
    });

  await Promise.all(batch); // Wait for the batch to finish

  // Continue to the next batch if there are remaining items
  if (startIndex + BATCH_SIZE < allData.length) {
    await _downloadBatch(startIndex + BATCH_SIZE);
  }
}
_downloadBatch(index);

async function _download(index) {
  let _res = await _downloadData(allData[index], index);
  console.log(_res);
  if (allData.length > index) {
    _download(index + 1);
  }
}

// _download(index);

function saveProjectDetails(data, fileName, index) {
  fs.writeFile(
    `./Data/RERA/Projects/${fileName}.json`,
    JSON.stringify(data, null, 4),
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(index, fileName);
      }
    }
  );
}

// https://gujrera.gujarat.gov.in/dashboard/get-district-wise-projectlist/0/0/all/all/all
// https://gujrera.gujarat.gov.in/dashboard/get-district-wise-projectlist
// https://gujrera.gujarat.gov.in/project_reg/public/alldatabyprojectid/8311
// https://gujrera.gujarat.gov.in/formthree/public/getform-three-byid/352627
// https://gujrera.gujarat.gov.in/maplocation/public/getProjectLocations/3875
// https://gujrera.gujarat.gov.in/project_reg/public/getproject-details/3875
// https://gujrera.gujarat.gov.in/project_reg/public/project-app/getproject-banks/3875
// https://gujrera.gujarat.gov.in/citizen_survey/citizen_claim/get-project-all-block7945
// https://gujrera.gujarat.gov.in/citizen_survey/citizen_claim/project-id7945
// https://gujrera.gujarat.gov.in/project_reg/project-app/getproject-blocklist/7945
// https://gujrera.gujarat.gov.in/dashboard/get-all-block-chart-details-by-id/7945
