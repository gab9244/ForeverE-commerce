import { Footer } from "./Footer"
import { Header } from "./Header"
import { Outlet } from "react-router-dom"
export const Layout = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <Header/>
    <Outlet/>
    <Footer /> 
    </div>
  )
}
