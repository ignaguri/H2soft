var ip = require('ip')
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: `"http://${ip.address()}:3030/"`
  // API_URL: '"http://192.168.1.3:3030/"'
})

console.log(`localhost url is: http://${ip.address()}/`)
