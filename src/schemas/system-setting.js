import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  key: {
    type: String,
    unique: true
  },
  value: {
    type: String
  }
}, {
  timestamps: true,
  collection: 'systemSettings'
})

export default schema
