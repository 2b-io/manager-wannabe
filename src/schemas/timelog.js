import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  projectId: {
    type: mongoose.Types.ObjectId
  },
  date: {
    type: Date,
    required: true
  },
  spent: {
    type: Number,
    required: true
  },
  workType: String,
  workDescription: String,
  forceUnlocked: {
    type: Boolean,
    default: () => false
  }
}, {
  timestamps: true
})

export default schema
