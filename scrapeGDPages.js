const puppeteer = require('puppeteer');
var fs = require("fs");

let browser;
let page;
let allJobs = []


//./jobs/allCombined.js
const loadJobs = async () => {
  await fs.readFile('./jobs/gd-react.js', async (err, data) => {
  // await fs.readFile('./jobs/allCombined.js', async (err, data) => {
    if (err) throw err;
    testJobs = await JSON.parse(data)
  });
}



// const testJobs = ['1301816648']
// https://www.linkedin.com/jobs/search/?currentJobId=1302189677
// https://www.linkedin.com/jobs/search/?currentJobId=1301816648
// let endJobs = []
const startPuppeteer = async () => {
  console.log('in')
  browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1680, height: 850, isLandscape: true, isMobile: false }, args: ['--disable-infobars, --disable-notifications'] });
  page = await browser.newPage();
  await page.emulateMedia('screen')
  // page.setCacheEnabled(false)
  // page.setDefaultNavigationTimeout(6000)
  // page.setDefaultTimeout(6000)
  // page.setViewport({ width: 1680, height: 850 })
  await page.waitFor(3000);
  console.log('out')

}

// const filterPage = (job) => {

// }

const scrapePage = async () => {
  console.log('scraping')
  // console.log(await page.content())
  // let testBool = true;
  // try {
  //   await page.waitForSelector('.topcard__title', { timeout: 10000 })
  const pageContent = await page.evaluate(() => {

    const company = document.querySelector('.empHeader') ? document.querySelector('.empHeader').innerText : 'No company found'

    // topcard__flavor
    const body = document.querySelector('.jobDescriptionContent') ? document.querySelector('.jobDescriptionContent').innerText : 'No body found'


    // const body = 'body'
    return { company, body }
    // return false
  })
  // console.log(pageContent.title, pageContent.company, pageContent.body)
  return pageContent
  // } catch (error) {

  // console.log(await page.content())
  //   console.log(error)
  //   console.log('Error scraping job')
  // }
  // return pageContent
}

const iteratePages = async () => {

  for (let job of testJobs) {
    console.log(`${job}`)
    try {
      await page.goto(`${job}`)
    } catch (error) {
      console.log(`Error loading page for ${job}`)
    }
    await page.waitFor(2000);
    console.log('page loaded succesfully')
    let pageResults = await scrapePage()
    pageResults.job = job
    allJobs.push(pageResults)
    // if (pageResults.body.includes('4+ years') || pageResults.body.includes('5+ years') || pageResults.body.includes('5+ years')) {
    //   console.log('job rejected')
    // } else {
    //   allJobs.push(pageResults)
    //   console.log('job loaded')

    // }
  }


}

const runMethod = async () => {
  await loadJobs()
  await startPuppeteer()
  await iteratePages()

  fs.writeFile(`./jobs/allScraped.js`, JSON.stringify(allJobs), function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Output saved to /allScraped.js.");
    }
  });

  try {
    await browser.close();

  } catch (error) {
    console.log('error closing')
  }
}

runMethod()

