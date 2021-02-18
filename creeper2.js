const axios = require('axios')
const gethref = require('get-hrefs')
const fs = require('fs')

let response, html, file

async function fetchHtml(url) {
  try {
    response = await axios.get(url)
    html = response.data
    statusCode = response.status
    console.log(`${url}: status code: ${statusCode}`)
  } catch (err) {
    // Handle Error Here
    console.error(`${url}: status code: ${statusCode}` + '\n' + "Error: " + err)
  }

  return html
}

function fetchLinks(html) {
  links = gethref(html)
  return links
}

function createCSV(url) {
  const urlString = `${url}`
  let reduceURL, fileName

  reduceURL = urlString.replace(/.*:\/*/g, '')
  fileName = reduceURL.replace(/\//g, '-').trim()


  file = `${fileName}.csv`

  fs.writeFile(file, `'${urlString}'`, { flag: 'w' }, function (err) {
    if (err)
      return console.error(err)
  })
}

async function makeCSV(links, url) {
  await createCSV(url)
  let stream = fs.createWriteStream(file)
  for (let i = 0; i < links.length; i++) {
    stream.write(links[i] + '\n')
  }
  stream.end()
}

async function getLinks(url) {
  html = await fetchHtml(url)
  links = fetchLinks(html)
  console.log(links)
  makeCSV(links, url)
  return links
}

module.exports = {
  fetchHtml,
  fetchLinks,
  makeCSV,
  getLinks
}
