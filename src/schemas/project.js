import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  sales: [String],
  status: {
    type: String
  },
  link: String
}, {
  timestamps: true
})

export default schema
