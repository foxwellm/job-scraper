const puppeteer = require('puppeteer');
const fs = require("fs");

let browser;
let page;
let allJobs = [];

const startPuppeteer = async () => {
  browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1920, height: 880, isMobile: false, isLandscape: true }, args: ['--desktop-window-1080p'] });
  // args: ['--disable-infobars, --disable-notifications, --desktop-window-1080p, --ash-host-window-bounds --start-fullscreen'] 
  page = await browser.newPage();
  await page.emulateMedia('screen')
  await page.setCacheEnabled(false)
  page.setDefaultTimeout(6000)
  page.setDefaultNavigationTimeout(6000)
}

const testElements = async () => {
  console.log('test')
  let returnedJobs
  try {
    await page.waitForSelector('[data-job-id]', { timeout: 2000 })
    returnedJobs = await getStandardJobs()
  } catch (error) {
    try {
      await page.waitForSelector('[data-id]', { timeout: 2000 })
      returnedJobs = await getMobileJobs()
    } catch (error) {
      console.log('both failed')
    }
  }
  return returnedJobs
}

const getStandardJobs = async () => {
  const textContent = await page.evaluate(() => {
    const all = document.querySelectorAll('[data-job-id]')
    list = [];
    all.forEach(item => {
      list.push(item['dataset'].jobId)
    })
    return { list }
  })
  console.log('returning list of standard jobs')
  return { list: textContent.list }
}

const getMobileJobs = async () => {
  const textContent = await page.evaluate(() => {
    const all = document.querySelectorAll('[data-id]')
    list = [];
    all.forEach(item => {
      list.push(item['dataset'].id)
    })
    return { list }
  })
  console.log('returning list of mobile jobs')
  return { list: textContent.list }
}

const runMethod = async () => {
  await startPuppeteer()
  await page.waitFor(2000);

  let startNumber = 0;
  let startPaginationNumber = 1
  let passTest = false

  await page.goto(`https://www.linkedin.com/jobs/react-js-jobs-united-states?keywords=react.js&f_TP=1,2&start=${startNumber}&count=25&trk=jobs_jserp_pagination_${startPaginationNumber}`)
  await page.waitFor(3000);
  //https://www.linkedin.com/jobs/react-js-jobs-united-states?keywords=react.js&f_TP=1&start=0&count=25&trk=jobs_jserp_pagination_1&position=1&pageNum=0
  try {
    await page.waitForSelector('[data-job-id]', { timeout: 2000 })
    console.log('standard passed')
    passTest = true
  } catch (error) {
    console.log(error)
  }

  if (passTest) {

    const endPaginationNumber = await page.evaluate(() => {
      return document.querySelector('.pagination__pages').lastElementChild.innerText
    })

    let pageJobs = await testElements()
    allJobs = [...allJobs, ...pageJobs.list]
    startNumber = startNumber + 25
    startPaginationNumber++

    //f_TP=1     f_TP=1,2

    while (startPaginationNumber <= endPaginationNumber) {
      await page.goto(`https://www.linkedin.com/jobs/react-js-jobs-united-states?keywords=react.js&f_TP=1,2&start=${startNumber}&count=25&trk=jobs_jserp_pagination_${startPaginationNumber}`)
      await page.waitFor(3000);
      console.log('page loaded')
      let pageJobs = await testElements()
      allJobs = [...allJobs, ...pageJobs.list]
      startNumber = startNumber + 25
      startPaginationNumber++
    }


    fs.writeFile(`./jobs/reactAll.js`, JSON.stringify(allJobs), function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Output saved to /reactAll.js.");
      }
    });
  }



  await console.log('allJobs', allJobs)
  try {
    await browser.close();

  } catch (error) {
    console.log('error closing')
  }
}

runMethod()

