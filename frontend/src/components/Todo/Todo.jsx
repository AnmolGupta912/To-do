import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "../App.css";

function TodosPage() {
  const todosData = useLoaderData();
  const [isComplete, setIsComplete] = useState(false);
  const [todos, setTodos] = useState(todosData)

  const listTodos = todos.filter((task) => task.completed === isComplete);

  async function handleComplete(id) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });

      if (response.ok) {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, completed: true } : todo
        ));
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  }
  async function handleRemove(id) {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodos(todos.filter(todo => todo._id !== id));
    }
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
}

  function handleReset(){
    setTodos([])
  }

  return (
    <div className="todos-container">
      <div className="sec-nav">
      <h1 style={{ marginBottom: "20px" }}>
        My Todos{" "}
      </h1>
      <div className="btn-set">
        <button onClick={() => setIsComplete(prev => !prev)}>
          {isComplete ? "Show incomplete" : "Show complete"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      </div>

      {listTodos.map((todo) => (
        <div key={todo._id} className="todo-card">
          <div>
            <h2>
              {todo.description
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h2>
            <small>{new Date(todo.createdAt).toLocaleString()}</small>
          </div>
          <div className="btn-cr">
          <button
            onClick={() => handleComplete(todo._id)}
            className="comp-btn"
            disabled={todo.completed}
            >
            Complete
          </button>
          <button
          onClick={() => {handleRemove(todo._id)}}
          className="remove-btn"
          >
            Remove
          </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodosPage;