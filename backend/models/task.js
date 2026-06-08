import mongoose from 'mongoose';

const taskSchema =  mongoose.Schema({
  description: { type: String },
  createdAt:   { type: Date, default: Date.now },
  completed: {
    type: Boolean,
    default: false 
  }
})

export default mongoose.model("Task", taskSchema)