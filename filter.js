const fs = require("fs");
let testJobs
let filteredJobs = []
let removedJobs = []

const loadJobs = async () => {
  await fs.readFile('./jobs/allScraped.js', async (err, data) => {
    if (err) throw err;
    testJobs = await JSON.parse(data)
  });
}


// checkTitle = (title) => {
//   return title.includes('Sr')
//     || title.includes('Senior')
//     || title.includes('senior')
//     || title.includes('Lead')
//     ? true : false
// }

checkBody = (body) => {
  return body.includes('Sr')
    || body.includes('Senior')
    || body.includes('senior')
    || body.includes('4+')
    || body.includes('5+')
    || body.includes('6+')
    || body.includes('7+')
    || body.includes('8+')
    || body.includes('9+')
    || body.includes('10+')
    || body.includes('11+')
    || body.includes('12+')
    || body.includes('13+')
    || body.includes('14+')
    || body.includes('15+')
    || body.includes('4 + years')
    || body.includes('5 + years')
    || body.includes('6 + years')
    || body.includes('7 + years')
    || body.includes('8 + years')
    || body.includes('9 + years')
    || body.includes('10 + years')
    || body.includes('11 + years')
    || body.includes('12 + years')
    || body.includes('13 + years')
    || body.includes('14 + years')
    || body.includes('15 + years')
    || body.includes('4 years')
    || body.includes('5 years')
    || body.includes('6 years')
    || body.includes('7 years')
    || body.includes('8 years')
    || body.includes('9 years')
    || body.includes('10 years')
    || body.includes('11 years')
    || body.includes('12 years')
    || body.includes('13 years')
    || body.includes('14 years')
    || body.includes('15 years')
    || body.includes('4 plus years')
    || body.includes('5 plus years')
    || body.includes('6 plus years')
    || body.includes('7 plus years')
    || body.includes('8 plus years')
    || body.includes('9 plus years')
    || body.includes('10 plus years')
    || body.includes('11 plus years')
    || body.includes('12 plus years')
    || body.includes('13 plus years')
    || body.includes('14 plus years')
    || body.includes('15 plus years')
    || body.includes('our client')
    || body.includes('Our client')
    || body.includes('Our Client')
    || body.includes('my client')
    || body.includes('My client')
    || body.includes('My Client')
    ? true : false
}

// checkCompany = (company) => {
//   return company.includes('Jobs @')
//     || company.includes('Andiamo')
//     || company.includes('CyberCoders')
//     || company.includes('Jobspring')
//     || company.includes('ClearedJobs')
//     ? true : false
// }

check = () => {
  for (job of testJobs) {
    // checkCompany(job.company) || checkTitle(job.title) || checkBody(job.body) ? removedJobs.push(job) : filteredJobs.push(job)
    checkBody(job.body) ? removedJobs.push(job) : filteredJobs.push(job)
  }
  saveJobs()
  // console.log(filteredJobs)
}

// writeJobs = () => {
//   const parent = document.querySelector('#jobs')

//   const el = document.createElement('li')
//   filteredJobs.forEach(job => {
//     el.innerHTML=job
//     parent.appenChild(el)
//   })
// }

const saveJobs = async() => {
  await fs.writeFile(`./jobs/allFilteredJobs.js`, JSON.stringify(filteredJobs), function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Output saved to /allFilteredJobs.js.");
    }
  });
}

const runFilter = async () => {
  await loadJobs()
  setTimeout(check, 2000)
  // console.log(testJobs)

}

runFilter()
