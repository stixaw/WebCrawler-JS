const creeper = require('./creeper')
const crawler = require('./crawler')

const baseUrl = process.argv[2]
const maxLayer = process.argv[3]

console.log("ARGS", baseUrl, maxLayer)

async function run() {
  const crawlResults = {}
  crawlResults[baseUrl] = await crawler.crawlWebPage(baseUrl, 0, maxLayer)
  await creeper.createJsonObject(crawlResults, baseUrl)
  let messages = creeper.returnMessageArray()
  console.log(messages)
}

run()