var jquery = require('jquery');
var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true, waitTimeout: 30000
});

// let newurls = 

const getAllUrlsFromPage = async () => {
  await nightmare
  .viewport(1280, 800)
    // .useragent('Chrome/38.0.2125.111')
    .goto('https://www.linkedin.com/jobs/search/?f_TPR=r86400&keywords=react.js&start=50')
    .wait('result-card')
    // .then(function() {

    // })
    .evaluate(function () {
      let list = []
      // let endPage = document.querySelector('.artdeco-pagination__pages').lastElementChild.firstElementChild.innerText;
      document.querySelectorAll('result-card').forEach(node => {
        list.push(`https://www.linkedin.com/jobs/search/?currentJobId=${node['dataset'].id}`)
        // list.push(node['dataset'].jobId)
      })
      return list
    })

    .end()
    .then(function (result) {
      return result
    })
    .catch(function (error) {
      console.error('Search failed:', error);
    });
}

const gotoEachPage = async () => {
  // console.log('inside', urls);
  var testurls = ['https://github.com/rosshinkley/nightmare-examples/blob/master/docs/common-pitfalls/async-operations-loops.md', 'https://github.com/rosshinkley/nightmare-examples/blob/master/docs/common-pitfalls/async-operations-loops.md', 'https://github.com/rosshinkley/nightmare-examples/blob/master/docs/common-pitfalls/async-operations-loops.md'];
  testurls.reduce(function (accumulator, url) {
    return accumulator.then(function (results) {
      return nightmare.goto(url)
        .wait('body')
        .path()
        .then(function (result) {
          results.push(result);
          return results;


        })

    });
  }, Promise.resolve([])).then(function (results) {
    console.dir('all', results);
  });
}

const processAll = async () => {
  const urls = await getAllUrlsFromPage()
  console.log(urls)
  // await gotoEachPage()
}



processAll()


  // console.log(newurls)

// var urls = ['https://github.com/rosshinkley/nightmare-examples/blob/master/docs/common-pitfalls/async-operations-loops.md', 'https://github.com/rosshinkley/nightmare-examples/blob/master/docs/common-pitfalls/async-operations-loops.md', 'https://github.com/rosshinkley/nightmare-examples/blob/master/docs/common-pitfalls/async-operations-loops.md'];
// urls.reduce(function (accumulator, url) {
//   return accumulator.then(function (results) {
//     return nightmare.goto(url)
//       .wait('body')
//       .title()
//       .then(function (result) {
//         results.push(result);
//         return results;
//       });
//   });
// }, Promise.resolve([])).then(function (results) {
//   console.dir(results);
// });