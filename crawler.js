const creeper = require('./creeper')

const beenThere = []
const baseUrl = 'https://chghealthcare.com'

async function crawlLinks(url, layer) {
  let currentLayer = layer
  const crawlResults = {}
  const linksArray = await creeper.getLinks(baseUrl)
  if (beenThere.includes(url) || url.includes('blog') || currentLayer > 2) {
    return {}
  }

  beenThere.push(baseUrl)
  console.log("Been There Array: ", beenThere)

  for (i = 0; i < linksArray.length; i++) {
    let newUrl = ''
    if (linksArray[i] !== '' || linksArray[i] !== '/') {
      if (linksArray[i].startsWith('/')) {
        newUrl = baseUrl + linksArray[i]
      } else {
        newUrl = linksArray[i]
      }
      if (newUrl.includes('chghealthcare.com') && !beenThere.includes(newUrl)) {
        console.log("Going to This URL: ", newUrl)
        crawlResults[`${newUrl}`] = await creeper.getLinks(`${newUrl}`)
        beenThere.push(newUrl)
        currentLayer += 1
      }
    }
  }
  console.log("RESULTS", crawlResults)
  return crawlResults
}


module.exports = {
  crawlLinks
}