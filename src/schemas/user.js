import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  profiles: Object
}, {
  timestamps: true
})

export default schema
