const creeper = require('./creeper2')

//add function to open and read links from .csv file

async function crawlLinks(baseUrl) {
  const linksArray = await creeper.getLinks(baseUrl)
  for (i = 0; i < linksArray.length; i++) {
    if (linksArray[i] !== '' || linksArray[i] !== '/') {
      if (linksArray[i].startsWith('/')) {
        url = baseUrl + linksArray[i]
        creeper.getLinks(url)
      }
      if (linksArray[i].startsWith('http')) {
        url = linksArray[i]
        if (!url.includes('linkedin') && !url.includes('twitter')
          && !url.includes('glassdoor') && !url.includes('facebook')
          && !url.includes('instagram')) {
          creeper.getLinks(url)
        }
      }
    }
  }
}

module.exports = {
  crawlLinks
}