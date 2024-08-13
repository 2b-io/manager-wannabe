import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  gross: {
    type: Number,
    required: true
  },
  hoursPerDay: {
    type: Number,
    default: () => 8
  },
  paidHours: Number,
  hourlyRate: Number,
  start: Date,
  end: Date
}, {
  timestamps: true
})

export default schema
