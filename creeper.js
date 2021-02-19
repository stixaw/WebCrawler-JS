const axios = require('axios')
const gethref = require('get-hrefs')
const fs = require('fs')

let messageArray = []

async function fetchHtml(url) {
  let statusCode
  try {
    let response = await axios.get(url)
    let html = response.data
    statusCode = response.status
    let successMessage = `${url}: status code: ${statusCode}`
    console.log(successMessage)
    messageArray.push(successMessage)

    return html
  } catch (err) {
    let errorMessage = `${url}: status code: ${statusCode}` + '\n' + "Error: " + err
    console.log(errorMessage)
    messageArray.push(errorMessage)
  }
}

function fetchLinks(html) {
  if (html) {
    let links = gethref(html)
    return links
  } else {
    return []
  }
}

function returnMessageArray() {
  return messageArray
}

function createJsonObject(obj, baseUrl) {
  let fileName = createFileName(baseUrl)
  fs.writeFileSync(`${fileName}.json`, JSON.stringify(obj))
}

function createFileName(url) {
  const urlString = `${url}`
  const reduceURL = urlString.replace(/.*:\/*/g, '')
  const name = reduceURL.replace(/\//g, '-').trim()
  return name
}

function createCSVFile(url) {
  let fileName = createFileName(url)
  let file = `${fileName}.csv`

  fs.writeFile(file, `'${fileName}'`, { flag: 'w' }, function (err) {
    if (err)
      return console.error(err)
  })
  return file
}

async function writeCsv(links, url) {
  let file = await createCSVFile(url)
  let stream = fs.createWriteStream(file)
  for (let i = 0; i < links.length; i++) {
    stream.write(links[i] + '\n')
  }
  stream.end()
}

async function getLinks(url) {
  let html = await fetchHtml(url)
  let links = fetchLinks(html)
  let newLinks = []
  links.forEach(element => {
    if (element !== '' && element !== '/') {
      newLinks.push(element)
    }
  });
  writeCsv(newLinks, url)
  return newLinks
}

module.exports = {
  fetchHtml,
  fetchLinks,
  writeCsv,
  getLinks,
  createJsonObject,
  returnMessageArray
}
