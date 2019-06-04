const puppeteer = require('puppeteer');
var fs = require("fs");

let browser;
let page;
const jobUrl = 'https://www.linkedin.com/jobs/search/?currentJobId=';
let allJobs = []
// const testJobs = ['1302424599', '1301816978', '1301816648', '1300230670', '1163296300', '1295012818', '1300230689', '1163803997', '1301822304', '1247367503'];
let testJobs



const loadJobs = async () => {
  await fs.readFile('./jobs/reactJSAll.js', async (err, data) => {
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
  browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1680, height: 850, isLandscape: true, isMobile: false }, args: ['--disable-infobars, --disable-notifications'] });
  page = await browser.newPage();
  await page.emulateMedia('screen')
  // page.setCacheEnabled(false)
  // page.setDefaultNavigationTimeout(6000)
  // page.setDefaultTimeout(6000)
  // page.setViewport({ width: 1680, height: 850 })
  await page.waitFor(4000);
  console.log('out')

}

// const filterPage = (job) => {

// }

const scrapePage = async () => {
  // console.log(await page.content())
  // let testBool = true;
  // try {
  //   await page.waitForSelector('.topcard__title', { timeout: 10000 })
  const pageContent = await page.evaluate(() => {

    const title = document.querySelector('.topcard__title') ? document.querySelector('.topcard__title').innerText : 'No title found'
    // const title = 'title'
    const companyText = document.querySelector('.jobs-details-top-card__company-info a') ? document.querySelector('.jobs-details-top-card__company-info a').innerText
      : document.querySelector('.jobs-details-top-card__company-info') ? document.querySelector('.jobs-details-top-card__company-info').innerText
        : document.querySelector('.topcard__flavor a') ? document.querySelector('.topcard__flavor a').innerText
          : document.querySelector('.topcard__flavor') ? document.querySelector('.topcard__flavor').innerText
            : 'No company name found'
    // topcard__flavor
    const body = document.querySelector('.jobs-box__html-content span') ? document.querySelector('.jobs-box__html-content span').innerText
      : document.querySelector('.description__text') ? document.querySelector('.description__text').innerText
        : 'No body found'

    // const body = 'body'
    return { title, companyText, body }
    // return false
  })
  // console.log(pageContent.title, pageContent.companyText, pageContent.body)
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
    console.log(`${jobUrl}${job}`)
    try {
      await page.goto(`${jobUrl}${job}`)
    } catch (error) {
      console.log(`Error loading page for ${job}`)
    }
    await page.waitFor(4000);
    console.log('page loaded succesfully')
    let pageResults = await scrapePage()
    pageResults.job = `${jobUrl}${job}`
    allJobs.push(pageResults)
    console.log('job loaded')
  }


}

const runMethod = async () => {
  await loadJobs()
  await startPuppeteer()
  await iteratePages()

  fs.writeFile(`./jobs/reactJSAllScraped.js`, JSON.stringify(allJobs), function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Output saved to /reactJSAllScraped.js.");
    }
  });

  try {
    await browser.close();

  } catch (error) {
    console.log('error closing')
  }
}

runMethod()

