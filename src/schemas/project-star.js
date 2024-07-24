import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId
  },
  projectId: {
    type: mongoose.Types.ObjectId
  },
  starred: {
    type: Boolean,
    default: () => false
  }
}, {
  timestamps: true,
  collection: 'projectStars'
})

export default schema
