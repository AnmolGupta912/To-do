import { Outlet } from "react-router"
import Header from "./components/Header/Header.jsx"


function Root() {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default Root