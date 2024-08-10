import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  key: {
    type: String,
    unique: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true,
  collection: 'systemSettings'
})

export default schema
