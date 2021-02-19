const creeper = require('./creeper')

const beenThere = []
const whiteList = ['https://chghealthcare.com']
const maxLayer = 8

async function getLinksArrayFromUrl(url) {
  let newLinksArray = []

  //get base domain from URL:
  let split = url.split('/')
  let baseUrl = split.splice(0, 3).join('/')
  console.log("Split", split)
  console.log("Base URL", baseUrl)

  newLinksArray = await creeper.getLinks(url)
  beenThere.push(url)

  for (i = 0; i < newLinksArray.length; i++) {
    if (newLinksArray[i].startsWith('/')) {
      newLinksArray[i] = baseUrl + newLinksArray[i]
    }
  }
  console.log("Been There Array: ", beenThere)
  return newLinksArray
}

function isInWhiteList(url) {
  let isInWhiteList = false
  whiteList.forEach(element => {
    if (url.startsWith(element)) {
      isInWhiteList = true
    }
  })
  return isInWhiteList
}

async function crawlWebPage(url, layer) {
  let currentLayer = layer + 1
  let crawlResults = {}
  let links = []

  if (url.includes('.pdf') || url.includes('respond') || url.includes('blog') || url.includes('current-openings') || currentLayer > maxLayer) {
    return {}
  }
  links = await getLinksArrayFromUrl(url)
  for (const link of links) {
    if (!beenThere.includes(link) && isInWhiteList(link)) {
      crawlResults[link] = await crawlWebPage(link, currentLayer)
    } else {
      crawlResults[link] = {}
    }
  }
  return crawlResults
}


module.exports = {
  crawlWebPage,
  getLinksArrayFromUrl
}