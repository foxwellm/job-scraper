const puppeteer = require('puppeteer');
var fs = require("fs");

let browser;
let page;
let content;
const jobUrl = 'https://www.linkedin.com/jobs/search/?currentJobId=';
// const testJobs = ['1302424599', '1301816978', '1301816648', '1300230670', '1163296300', '1295012818', '1300230689', '1163803997', '1301822304', '1247367503'];
const testJobs = ['1279922107',
  '1300680734',
  '1289831292',
  '1254170874',
  '1284553529',
  '1303737879',
  '1283898959',
  '1303341247',
  '1262253398',
  '1292860509',
  '1240159129',
  '1248887398',
  '1297236071',
  '1298133497',
  '1267186746',
  '1247367503',
  '1298320177',
  '1300230670',
  '1258740029',
  '1293901598',
  '1284681053',
  '1297276799',
  '1304138756',
  '1267119135',
  '1256056569',
  '1273035207',
  '1253373749',
  '1096427110',
  '1283694938',
  '1254997756',
  '1262316990',
  '1279464140',
  '1173709315',
  '1297216130',
  '1254987955',
  '1247902191',
  '1300230689',
  '1287296107',
  '1163803997',
  '1294584697',
  '1229081648',
  '869761839',
  '1283153853',
  '1293952685',
  '1237080269',
  '1295012818',
  '1279398747',
  '1290675075',
  '1173751816',
  '1298431908']
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

