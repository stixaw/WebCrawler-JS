const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

let response, html, file
let linksArray = []

async function fetchHtml(url) {
  try {
    response = await axios.get(url)
    html = response.data
    // console.log("HTML", html)
  } catch (err) {
    // Handle Error Here
    console.error(err)
  }

  return html
}

function fetchLinks(html) {
  //possible separate function
  const $ = cheerio.load(html)
  const linkObjects = $('a')

  linkObjects.each((index, element) => {
    if ($(element).attr('href') !== undefined && $(element).attr('href') !== "javascript:;"
      && $(element).attr('href') !== "tel:866.608.4020" && $(element).attr('href') !== "javascript:void(0);")
      linksArray.push(
        $(element).attr('href')
      )
  })
  links = Array.from(new Set(linksArray))
  return links
}

function createCSV(url) {
  const urlString = `${url}`
  const regex = /https:\/*/
  const reduceURL = urlString.replace(regex, '')
  const fileName = reduceURL.replace('/', '-').trim()
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
