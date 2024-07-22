import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  projectId: String,
  date: Date,
  spent: String,
  workType: String,
  workDescription: String
}, {
  timestamps: true
})

export default schema
