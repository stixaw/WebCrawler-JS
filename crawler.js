const creeper = require('./creeper')

const beenThere = []
const baseUrl = 'https://chghealthcare.com'
const excludeList = ['pdf', 'respond']

async function crawlLinksArray(links) {
  const crawlResults = {}
  const newLinksArray = []
  for (i = 0; i < links.length; i++) {
    let newUrl = ''
    if (links[i] !== '' || links[i] !== '/') {
      if (links[i].startsWith('/')) {
        newUrl = baseUrl + links[i]
      } else {
        newUrl = links[i]
      }
      if (newUrl.includes('chghealthcare.com') && !beenThere.includes(newUrl)) {
        crawlResults[`${newUrl}`] = await creeper.getLinks(`${newUrl}`) //can this return the new links array to continue the crawling?
        beenThere.push(newUrl)
      }
    }
  }
  console.log("Been There Array: ", beenThere)
  return crawlResults
}

async function crawlWebPage(url, layer) {
  let currentLayer = layer

  const linksArray = await creeper.getLinks(baseUrl)
  beenThere.push(baseUrl)

  if (url.includes('.pdf' || 'respond') || currentLayer > 2) {
    return {}
  }
  let crawlResults = crawlLinksArray(linksArray) //get both newlinks array and crawlResults?
  //call crawlWebPage with newLinks array???
  return crawlResults
}


module.exports = {
  crawlWebPage,
  crawlLinksArray
}