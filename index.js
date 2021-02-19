const creeper = require('./creeper')
const crawler = require('./crawler')

const baseUrl = 'https://chghealthcare.com'

async function run() {
  const crawlResults = {}
  crawlResults[baseUrl] = await crawler.crawlLinks(baseUrl, 0)
  await creeper.createJsonObject(crawlResults, baseUrl)
}

run()