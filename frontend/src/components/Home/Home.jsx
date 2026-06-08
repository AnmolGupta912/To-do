import "../app.css"
import { useState } from 'react'


function Home() {
    const [tasks, setTasks] = useState([])

    const saveTask = (e) => {
        e.preventDefault()
        const task = e.target[0].value  
        if (task) {
            setTasks([...tasks, task])
            e.target[0].value = ""
        }
    }

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index)
        setTasks(newTasks)
    }

    const handleSave = async () => {
        if (tasks.length > 0) {
            try {
            for (const task of tasks) {
                await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: task })
                })
            }
            setTasks([])
            } catch (err) {
            console.error("Failed to save tasks:", err)
            }
        } else {
            alert("No tasks to save!")
        }
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

export default Home