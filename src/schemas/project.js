import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  sales: [String],
  status: {
    type: String
  },
  link: String,
  jiraKey: {
    type: String,
    unique: true
  },
  jiraData: Object,
  createdAt: Date,
  updatedAt: Date,
  starredBy: [String]
})

export default schema
