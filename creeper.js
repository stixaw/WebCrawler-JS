const axios = require('axios')
const gethref = require('get-hrefs')
const fs = require('fs')


async function fetchHtml(url) {
  let statusCode
  try {
    let response = await axios.get(url)
    let html = response.data
    statusCode = response.status
    console.log(`${url}: status code: ${statusCode}`)

    return html
  } catch (err) {
    // Handle Error Here
    console.error(`${url}: status code: ${statusCode}` + '\n' + "Error: " + err)
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
  writeCsv(links, url)
  return links
}

module.exports = {
  fetchHtml,
  fetchLinks,
  writeCsv,
  getLinks,
  createJsonObject
}
