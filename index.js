require('babel-polyfill')
require('dotenv').config()
require = require('esm')(module)

module.exports = require('./src/main')
