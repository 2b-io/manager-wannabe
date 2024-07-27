import mongoose from 'mongoose'

export const STATUSES = [
  'OPEN',
  'IN CONVERSATION',
  'NEED ESTIMATE',
  'HAS ESTIMATE',
  'FOLLOW UP',
  'IN DEVELOPMENT',
  'IN WARRANTY',
  'CLOSED WON',
  'CLOSED LOST'
]

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  sales: [String],
  status: {
    type: String,
    enum: STATUSES,
    default: STATUSES[0]
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
