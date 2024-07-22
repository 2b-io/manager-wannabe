import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  defaultWorkType: String,
  profiles: Object
}, {
  timestamps: true
})

export default schema
