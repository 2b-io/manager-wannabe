import mongoose from 'mongoose'

export const STATUSES = [
  'OPEN',
  'IN_CONVERSATION',
  'NEED_ESTIMATE',
  'HAS_ESTIMATE',
  'FOLLOW_UP',
  'IN_DEVELOPMENT',
  'IN_WARRANTY',
  'CLOSED_WON',
  'CLOSED_LOST'
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
