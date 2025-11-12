const serverless = require('serverless-http')
// Import the app exported by backend/server.js
const app = require('../backend/server')

module.exports = serverless(app)
