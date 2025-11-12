const mongoose = require('mongoose')

const gigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  clientAddress: {
    type: String,
    required: true
  },
  workerAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed'],
    default: 'open'
  },
  contractId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Gig', gigSchema)