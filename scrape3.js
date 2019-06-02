const request = require('request')
const cheerio = require('cheerio')

request('https://www.linkedin.com/jobs/search/?f_TPR=r86400&keywords=react.js', (error, response, html) => {
  if(!error) {
    const $ = cheerio.load(html)
    // const siteHeading = $('.occludable-update').attr('class')
    // const output = siteHeading.next().children('h2').text()
    console.log(html)
  }
})