const fs = require("fs");
let reactNativeJobs
let filteredJobs
let removedJobs = []

const react = async () => {
  await fs.readFile('./jobs/reactAll.js', async (err, data) => {
    if (err) throw err;
    filteredJobs = await JSON.parse(data)
  });
}

const reactNative = async () => {
  await fs.readFile('./jobs/reactNativeAll.js', async (err, data) => {
    if (err) throw err;
    reactNativeJobs = await JSON.parse(data)
  });
}



combine = () => {
  for (job of reactNativeJobs) {
    filteredJobs.includes(job) ? removedJobs.push(job) : filteredJobs.push(job)

  }
  fs.writeFile(`./jobs/allCombined.js`, JSON.stringify(filteredJobs), function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Output saved to /reactAll.js.");
    }
  });
}

const runFilter = async () => {
  await react()
  await reactNative()
  setTimeout(combine, 500)
  // console.log(testJobs)

}

runFilter()