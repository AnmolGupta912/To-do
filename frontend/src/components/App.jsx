import './App.css'
import { useState } from 'react'
// import {  writeFileSync } from "fs";
// import data from "./tasks.json"


function App() {
    const [tasks, setTasks] = useState([])

    // console.log(data)

    const saveTask = (e) => {
        e.preventDefault()
        const task = e.target[0].value  
        if (task) {
            setTasks([...tasks, task])
            e.target[0].value = ""
            // writeFileSync("tasks.json", JSON.stringify([...tasks, task]))
        }


    }

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index)
        setTasks(newTasks)
        // writeFileSync("tasks.json", JSON.stringify(newTasks))
    }

    const handleSave = () => {
        fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ description: tasks.join(", ") })
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }
    

  return (
    <>
    <div className="main">
        <div className="input">
            <form action="" onSubmit={saveTask}>
                <input type="text" placeholder="Enter a new task..." />
            </form>
        </div>
        <br />
        <div className="tasks">
            {tasks.map((task, index) => (
                <div className="task-item" key={index}>
                    <p>{index + 1}.{" "+task.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</p>
                    <button 
                        onClick={() => {removeTask(index)}}
                    >Remove</button>
                </div>
            ))}
        </div>
    </div>
    <div className="footer">
            <button 
            className="save-btn"
            onClick={() => {handleSave()}}
            >Save Tasks</button>
    </div>
    </>
  )
}

export default App