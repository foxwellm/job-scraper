const fs = require("fs");
let testJobs
let filteredJobs = []
let removedJobs = []

const loadJobs = async () => {
  await fs.readFile('./jobs/reactJSAllScraped.js', async (err, data) => {
    if (err) throw err;
    testJobs = await JSON.parse(data)
  });
}


checkTitle = (title) => {
  return title.includes('Sr')
    || title.includes('Senior')
    ? true : false
}

checkBody = (body) => {
  return body.includes('Sr')
    || body.includes('Senior')
    ? true : false
}

checkCompany = (company) => {
  return company.includes('Jobs @')
    || company.includes('Andiamo')
    ? true : false
}

check = () => {
  for (job of testJobs) {
    // checkTitle(job.title) ? removedJobs.push(job.title) : filteredJobs.push(job.title)
    // checkBody(job.body) ? removedJobs.push(job.body) : filteredJobs.push(job.body)
    checkCompany(job.companyText) || checkTitle(job.title) || checkBody(job.body) ? removedJobs.push(job) : filteredJobs.push(job)
  }
  console.log(filteredJobs)
  // console.log(filteredJobs)
}

const runFilter = async () => {
  await loadJobs()
  setTimeout(check, 500)
  // console.log(testJobs)

}

runFilter()
