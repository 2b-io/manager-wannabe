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
    type: String,
    required: true
  },
  spentAsSeconds: {
    type: Number
  },
  workType: String,
  workDescription: String,
  forceUnlocked: {
    type: Boolean,
    default: () => false
  },
  cost: {
    type: Number,
    default: () => 0
  }
}, {
  timestamps: true
})

export default schema
