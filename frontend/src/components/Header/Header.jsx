import "../app.css"
import { NavLink } from "react-router-dom"



function Header() {
  return (
    <div className="nav">
      <h1>My To-do App</h1>
      <div className="nav-links">
        <ul>
          <li>
            <NavLink
            style={({ isActive }) => ({ color: isActive ? "blue" : "orange" })}
            to="/">Home</NavLink>
            </li>
          <li>
            <NavLink 
            style={({ isActive }) => ({ color: isActive ? "blue" : "orange" })}
            to="/tasks">Tasks</NavLink>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Header