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
    // await page.waitForSelector('.logoWrap a', { timeout: 2000 })
    returnedJobs = await getStandardJobs()
  } catch (error) {
    console.log('did not find jobs')
  }
  return returnedJobs
}

const getStandardJobs = async () => {
  const textContent = await page.evaluate(() => {
    const all = document.querySelectorAll('.logoWrap a')
    list = [];
    all.forEach(item => {
      //empId  245479
      const location = item.parentElement.parentElement['dataset'].jobLoc
      const title = item.parentElement.nextElementSibling.firstElementChild.innerText
      const type = item.parentElement.parentElement['dataset'].sgocId
      const employer = item.parentElement.parentElement['dataset'].empId
      if (type !== '1007')  {

      } else if (location.includes('San Francisco') || location.includes('San Diego')) {
       
      } else if (title.includes('Senior') || title.includes('Sr.') || title.includes('Lead') || title.includes('.Net')) {
        
      } else if (employer === '245479') {

      } else {
        list.push(item.href)
      } 
      
    })
    return { list }
  })
  console.log('returning list of standard jobs')
  return { list: textContent.list }
}

const runMethod = async () => {
  await startPuppeteer()
  await page.waitFor(2000);

  // let startNumber = 0;
  let startPaginationNumber = 1
  let passTest = false

  await page.goto(`https://www.glassdoor.com/Job/react-jobs-SRCH_KE0,5.htm?radius=25&fromAge=1&minSalary=64000`)
  await page.waitFor(3000);
  // const content = await page.content()
  // console.log(content)
  //https://www.linkedin.com/jobs/react-js-jobs-united-states?keywords=react.js&f_TP=1&start=0&count=25&trk=jobs_jserp_pagination_1&position=1&pageNum=0
  try {
    await page.waitForSelector('.logoWrap', { timeout: 2000 })
    console.log('standard passed')
    passTest = true
  } catch (error) {
    console.log(error)
  }

  if (passTest) {

    const endPaginationNumber = await page.evaluate(() => {
      return document.querySelector('#ResultsFooter .padVertSm').innerHTML.split(' ').splice(-1)
    })

    console.log('end', endPaginationNumber[0])

    let pageJobs = await testElements()
    console.log(pageJobs.list.length)
    allJobs = [...allJobs, ...pageJobs.list]
    // startNumber = startNumber + 25
    startPaginationNumber++

    // f_TP=1     f_TP=1,2

    while (startPaginationNumber <= endPaginationNumber) {
      await page.goto(`https://www.glassdoor.com/Job/react-jobs-SRCH_KE0,5_IP${startPaginationNumber}.htm?radius=25&fromAge=1&minSalary=64000`)
      // await page.waitFor(2000);
      console.log('num', startPaginationNumber)
      try {
        await page.waitForSelector('.logoWrap a', { timeout: 5000 })
        console.log('page loaded')
        let pageJobs = await getStandardJobs()
        console.log(pageJobs.list.length)
        allJobs = [...allJobs, ...pageJobs.list]
        // startNumber = startNumber + 25
        startPaginationNumber++

      } catch {
        console.log('page not found')
        startPaginationNumber++
      }
    }


    fs.writeFile(`./jobs/gd-react.js`, JSON.stringify(allJobs), function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Output saved to /reactAll.js.");
      }
    });
  }



  // await console.log('allJobs', allJobs)
  try {
    await browser.close();

  } catch (error) {
    console.log('error closing')
  }
}

runMethod()

