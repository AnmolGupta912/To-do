import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import taskmodel from "./models/task.js"

const app = express()
app.use(cors())
app.use(express.json())


const start = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_KEY)
    console.log("MongoDB connected")
    app.listen(3000, () => console.log("Server running on port 3000"))
  } catch (err) {
    console.log("Error:", err)
  }
}

start()

app.post("/tasks", async (req, res) => {
  try {
    const task = new taskmodel({
      title: req.body.title,
      description: req.body.description
    })
    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await taskmodel.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
})