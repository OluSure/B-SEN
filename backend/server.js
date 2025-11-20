require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const gigRoutes = require('./routes/gigs')
const userRoutes = require('./routes/users')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB (use a sensible local default for dev if not provided)
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bsen'
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/gigs', gigRoutes)
app.use('/api/users', userRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

const net = require('net')

const PORT_START = parseInt(process.env.PORT, 10) || 3000

// Find a free port starting from PORT_START
function findFreePort(start, maxAttempts = 100) {
  return new Promise((resolve) => {
    let port = start
    const tryPort = () => {
      const tester = net.createServer()
      tester.once('error', (err) => {
        tester.close()
        if (err && err.code === 'EADDRINUSE') {
          port += 1
          if (port <= start + maxAttempts) {
            tryPort()
          } else {
            resolve(null)
          }
        } else {
          resolve(null)
        }
      })
      tester.once('listening', () => {
        tester.close(() => resolve(port))
      })
      tester.listen(port)
    }
    tryPort()
  })
}

// If this file is run directly, start the server (local dev) on a free port.
if (require.main === module) {
  ;(async () => {
    const port = await findFreePort(PORT_START)
    if (!port) {
      console.error('No free port found to start the server')
      process.exit(1)
    }
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })()
}

// Export the app for serverless wrappers (Vercel) or testing
module.exports = app