const puppeteer = require('puppeteer');
const fs = require("fs");

let browser;
let page;
let allJobs = [];

const startPuppeteer = async () => {
  browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1920, height: 880, isMobile: false, isLandscape: true }, args: ['--desktop-window-1080p'] });
  // args: ['--disable-infobars, --disable-notifications, --desktop-window-1080p, --ash-host-window-bounds --start-fullscreen'] 
  page = await browser.newPage();
  await page.emulateMedia('screen')
  await page.setCacheEnabled(false)
  page.setDefaultTimeout(6000)
  page.setDefaultNavigationTimeout(6000)
}

// const testElements = async () => {
//   console.log('test')
//   let returnedJobs
//   try {
//     // await page.waitForSelector('.logoWrap a', { timeout: 2000 })
//     returnedJobs = await getStandardJobs()
//   } catch (error) {
//     console.log('did not find jobs')
//   }
//   return returnedJobs
// }

const getStandardJobs = async () => {

  const jobNumber = await page.evaluate(() => {
    return document.querySelectorAll('.jl').length
  })
  const jobArray = []
  for (i = 0; i < jobNumber; i++) {
    jobArray.push(i)
  }

  //empId  245479
  const thing = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  let list = [];
  for (let job of jobArray) {
    await page.evaluate(async (job) => {
      const nodes = document.querySelectorAll('.jl')
      nodes[job].click({ delay: 200 })
    }, job)
    await page.waitFor(2000)

    const returnedJob = await page.evaluate(async (job) => {
      const nodes = document.querySelectorAll('.jl')
      // nodes[job].click({delay: 200})
      const href = nodes[job].firstElementChild.firstElementChild.href
      const location = nodes[job]['dataset'].jobLoc
      const title = nodes[job].lastElementChild.firstElementChild.innerText
      const type = nodes[job]['dataset'].sgocId
      const employer = document.querySelector('.employerName').innerText
      const description = document.querySelector('.jobDescriptionContent').innerText
      if (type !== '1007') {
        return null
      } else if (location.includes('San Francisco') || location.includes('San Diego') || location.includes('Los Angeles') || location.includes('Palo Alto') || location.includes('New York') || location.includes('Philadelphia') || location.includes('Seattle') || location.includes('Sunnyvale') || location.includes('El Segundo') || location.includes('San Jose') || location.includes('Chicago') || location.includes('Washington, DC') || location.includes('Baltimore') || location.includes('NY')) {
        return null
      } else if (title.includes('Senior') || title.includes('Sr.') || title.includes('Lead') || title.includes('.Net') || title.includes('.Principle')) {
        return null
      } else if (employer === 'CyberCoders' || employer === 'Artic Consulting') {
        return null
      } else if (description.includes('Sr') || description.includes('Senior')
        || description.includes('senior')
        || description.includes('4+')
        || description.includes('5+')
        || description.includes('6+')
        || description.includes('7+')
        || description.includes('8+')
        || description.includes('9+')
        || description.includes('10+')
        || description.includes('11+')
        || description.includes('12+')
        || description.includes('13+')
        || description.includes('14+')
        || description.includes('15+')
        || description.includes('4 + years')
        || description.includes('5 + years')
        || description.includes('6 + years')
        || description.includes('7 + years')
        || description.includes('8 + years')
        || description.includes('9 + years')
        || description.includes('10 + years')
        || description.includes('11 + years')
        || description.includes('12 + years')
        || description.includes('13 + years')
        || description.includes('14 + years')
        || description.includes('15 + years')
        || description.includes('4 years')
        || description.includes('5 years')
        || description.includes('6 years')
        || description.includes('7 years')
        || description.includes('8 years')
        || description.includes('9 years')
        || description.includes('10 years')
        || description.includes('11 years')
        || description.includes('12 years')
        || description.includes('13 years')
        || description.includes('14 years')
        || description.includes('15 years')
        || description.includes('4 plus years')
        || description.includes('5 plus years')
        || description.includes('6 plus years')
        || description.includes('7 plus years')
        || description.includes('8 plus years')
        || description.includes('9 plus years')
        || description.includes('10 plus years')
        || description.includes('11 plus years')
        || description.includes('12 plus years')
        || description.includes('13 plus years')
        || description.includes('14 plus years')
        || description.includes('15 plus years')
        || description.includes('our client')
        || description.includes('Our client')
        || description.includes('Our Client')
        || description.includes('my client')
        || description.includes('My client')
        || description.includes('My Client')
        || description.includes('CLEARANCE')
        || description.includes('clearance')
        || description.includes('Clearance')) {
        return null
      } else {
        console.log('in')
        return { href, title, description, location, employer }
      }
    }, job)
    if (returnedJob !== null) list.push(returnedJob)
  }
  return { list }
}

const runMethod = async () => {
  await startPuppeteer()
  await page.waitFor(2000);

  // let startNumber = 0;
  let startPaginationNumber = 1
  let passTest = false
  //fromAge=7
  // Applications Developer &gocId=100224
  // Front End Developer &gocId=100860
  //Front End Engineer &gocId=101929
  //Software Developer &gocId=100167
  //Sofware engineer &gocId=100063
  //UI Developer &gocId=101304
  //Web developer &gocId=100124

  await page.goto(`https://www.glassdoor.com/Job/react-jobs-SRCH_KE0,5.htm?radius=25&fromAge=7&minSalary=64000&gocId=101929`)
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

    let endPaginationNumber = await page.evaluate(() => {
      return document.querySelector('#ResultsFooter .padVertSm').innerHTML.split(' ').splice(-1)
    })

    endPaginationNumber = endPaginationNumber > 30 ? 30 : endPaginationNumber

    console.log('end', endPaginationNumber[0])

    let pageJobs = await getStandardJobs()
    console.log(pageJobs.list.length)
    // const newJobs = pageJobs.list.filter(job => {
    //   return job !== null
    // })
    // console.log(newJobs.length)
    allJobs = [...allJobs, ...pageJobs.list]
    // startNumber = startNumber + 25
    startPaginationNumber++

    // f_TP=1     f_TP=1,2

    while (startPaginationNumber <= endPaginationNumber) {
      try {
        await page.goto(`https://www.glassdoor.com/Job/react-jobs-SRCH_KE0,5_IP${startPaginationNumber}.htm?radius=25&fromAge=7&minSalary=64000&gocId=101929`)
        await page.waitFor(2000);
        console.log('num', startPaginationNumber)
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


    fs.writeFile(`./jobs/gd-react3.js`, JSON.stringify(allJobs), function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Output saved to /gd-react3.js.");
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

