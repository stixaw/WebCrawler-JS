const creeper = require('./creeper2')
const crawler = require('./crawler')

const baseUrl = 'https://chghealthcare.com'
let links1

async function run() {
  links1 = await creeper.getLinks(baseUrl)
  crawler.crawlLinks(baseUrl, links1)
}

run()