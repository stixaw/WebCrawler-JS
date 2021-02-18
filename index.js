const creeper = require('./creeper2')
const crawler = require('./crawler')

const baseUrl = 'https://chghealthcare.com'

async function run() {
  crawler.crawlLinks(baseUrl)
}

run()