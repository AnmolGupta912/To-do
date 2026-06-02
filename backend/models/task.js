import mongoose from 'mongoose';

const taskSchema =  mongoose.Schema({
  description: { type: String },
  createdAt:   { type: Date, default: Date.now }
})

export default mongoose.model("Task", taskSchema)