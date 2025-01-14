import { Footer } from "./Footer"
import { Collection } from "./LastCollection"
import { Header } from "./Header"
import { Hero } from "./Hero"
import { Policies } from "./Policies"
import { Subscribe } from "./Subscribe"
import { UserContextProvider } from "./UserContext"

export const App = () => {
  return (
    <UserContextProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Header/>
      <Hero/>
      <Collection />
      <Policies />
      <Subscribe/>
      <Footer />
      </div>
    </UserContextProvider>
  )
}
