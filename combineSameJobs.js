const fs = require("fs");
let reactNativeJobs
let filteredJobs
let removedJobs = []

const react = async () => {
  await fs.readFile('./jobs/test1.js', async (err, data) => {
    if (err) throw err;
    filteredJobs = await JSON.parse(data)
  });
}

const reactNative = async () => {
  await fs.readFile('./jobs/test2.js', async (err, data) => {
    if (err) throw err;
    reactNativeJobs = await JSON.parse(data)
  });
}



combine = () => {
  for (job of reactNativeJobs) {
    filteredJobs.includes(job) ? removedJobs.push(job) : filteredJobs.push(job)

  }
  console.log('f',filteredJobs)
  console.log('r',removedJobs)
  // console.log(filteredJobs)
}

const runFilter = async () => {
  await react()
  await reactNative()
  setTimeout(combine, 500)
  // console.log(testJobs)

}

runFilter()