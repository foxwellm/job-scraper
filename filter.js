const puppeteer = require('puppeteer');
var fs = require("fs");

let browser;
let page;
let content;
const jobUrl = 'https://www.linkedin.com/jobs/search/?currentJobId=';
const testJobs = ['1302424599', '1301816978', '1301816648', '1300230670', '1163296300', '1295012818', '1300230689', '1163803997', '1301822304', '1247367503'];
// const testJobs = ['1302189677']
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
  let testBool = true;
  try {
    await page.waitForSelector('.topcard__title', { timeout: 10000 })
    const pageContent = await page.evaluate(() => {
      // const title = document.querySelector('.topcard__title').innerText
      const title = 'title'
      // const companyText = document.querySelector('.jobs-details-top-card__company-info a').innerText || document.querySelector('.jobs-details-top-card__company-info').innerText
      const companyText = 'company'
      const body = document.querySelector('.jobs-box__html-content span') ? document.querySelector('.jobs-box__html-content span').innerText : document.querySelector('.description__text').innerText
      
      // const body = 'body'
      // return { title, companyText, body }
      return false
    })
    // console.log(pageContent.title, pageContent.companyText, pageContent.body)
    testBool = pageContent
  } catch(error) {
  
    console.log(await page.content())
    console.log(error)
    console.log('Error scraping job')
  }
  return testBool
}

const iteratePages = async () => {

  for(let job of testJobs) {
    console.log(`${jobUrl}${job}`)
    try {
      await page.goto(`${jobUrl}${job}`)
    } catch (error) {
      console.log(`Error loading page for ${job}`)
    }
    await page.waitFor(3000);
    console.log('page loaded succesfully')
    let pageResults = await scrapePage()
    console.log(pageResults)
  }


  // testJobs.forEach(async job => {
  //   try {
  //     await page.goto(`jobUrl${job}`)
  //     await page.waitFor(3000);
  //   } catch (error) {
  //     console.log('error on initial page')
  //   }
  //   console.log('page loaded succesfully')
  // })
}

const runMethod = async () => {
  await startPuppeteer()
  await iteratePages()

  try {
    await browser.close();

  } catch (error) {
    console.log('error closing')
  }
}

runMethod()

