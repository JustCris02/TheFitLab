import Navbar from "./components/Navbar"
import {Route,Routes,Link} from "react-router-dom"
import FullBody from "./components/FullBody"
import HomePage from "./HomePage"
import Programs from "./Programs"
import Footer from "./components/Footer"
export default function App(){
  return(
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/FullBody" element={<FullBody />}/>
        <Route path="/programs" element={<Programs />}/>
      </Routes>
      <Footer />
    </>

 
  )
}
