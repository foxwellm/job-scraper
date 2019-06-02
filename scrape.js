const puppeteer = require('puppeteer');

let browser;
let page;
let allJobs =[];
let content;
const startUrl = 'https://www.linkedin.com/jobs/search/?f_TPR=r26400&keywords=react.js';
let startNumber = 0;

const startPuppeteer = async () => {
  console.log('in')
  browser = await puppeteer.launch({ headless: true, args: ['--disable-infobars, --disable-notifications'] });
  // options = {
    //   args: ['--disable-infobars']
    // }
    page = await browser.newPage();
    // page.setCacheEnabled(false)
    page.setDefaultNavigationTimeout(6000)
    page.setDefaultTimeout(6000)
    page.setViewport({ width: 1680, height: 850 })
    await page.waitFor(2000);
    console.log('out')
    try {
      await page.goto(startUrl)
    } catch(error) {
      console.log('error on initial page')
  }
  await page.waitFor(2000);
  console.log('first page loaded succesfully')
}

const testElements = async () => {
  let returnedJobs
  try {
    await page.waitForSelector('[data-job-id]', { timeout: 2000 })
    console.log('standard worked')
    returnedJobs = await getStandardJobs()
  } catch (error) {
    console.log("standard didn't work")
    try {
      await page.waitForSelector('[data-id]', { timeout: 2000 })
      console.log('mobile did')
      returnedJobs = await getMobileJobs()
    } catch(error) {
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

// const getJobs = async (bool) => {
//   let eval = bool
//   const textContent = await page.evaluate((eval) => {
//     // const next = document.querySelector("link[rel=next]").href
//     // const tester = document.querySelector('[data-job-id]') ? true : false
//     const all = eval ? document.querySelectorAll('[data-job-id]') : document.querySelectorAll('[data-id]')
//     list = [];
//     all.forEach(item => {
//       eval ? list.push(item['dataset'].jobId) : list.push(item['dataset'].id)
//     })
//     return { list }
//   })
//   return { list: textContent.list }
// }


// const getJobsOnPage = async () => {
//   // await page.goto(link);
//   // await page.waitFor(2000);
//   // await page.waitForSelector('[data-job-id]', { timeout: 2000 })
//   // let checker = jobClassName === 'job' ? true : false
// await testElements()
// }





// const exitApp = async () => {
//   console.log('exit')
//   console.log(allJobs)
//   await browser.close();
// }

// const checkStandard = async () => {
//   try {
//     await page.waitForSelector('[data-job-id]', { timeout: 2500 })
    
//   } catch (error) {
//     checkMobile()
//   }
//   jobClassName = 'job'
// }

// const checkMobile = async () => {
//   try {
//     await page.waitForSelector('[data-id]', { timeout: 2500 })
    
//   } catch (error) {
//     console.log('failed both')
//   }
//   jobClassName = 'id'
// }

const runMethod = async () => {
  await startPuppeteer()
  await page.waitFor(2000);
  // console.log(jobClassName)
  // await exitApp()

  // await checkStandard()



  // content = await page.content()
  // console.log(content)

  // let checkEl = await page.waitForSelector('[data-job-id]', { timeout: 2500 })
  // !checkEl && await exitApp()
  // let checkBtn = await page.waitForSelector('link[rel=next]', { timeout: 5000, visible: true })
  // !checkBtn && exitApp()



  let initialPage = await testElements()
  allJobs.push(initialPage.list)


  try {
    await page.goto(`${startUrl}&start=25`)
    await page.waitFor(2000);
  } catch(error) {
    console.log('error on second page')
  }
  
  await page.waitFor(2000);
  console.log('second page success')
  // content = await page.content()
  // console.log(content)
  let newJobs = await testElements()
  await allJobs.push(newJobs.list)


  // while(initialPage.next) {
  //   await page.goto(initialPage.next)
  //   let checkEl2 = await page.waitForSelector('[data-job-id]', { timeout: 5000 })
  //   !checkEl2 && exitApp()
  //   let newJobs = await getJobsOnPage()
  //   allJobs.push(newJobs.list)
  //   initialPage.next = newJobs.next
  // }

  await console.log('allJobs', allJobs)
  try {
    await browser.close();

  } catch(error) {
    console.log('error closing')
  }
}

runMethod()

