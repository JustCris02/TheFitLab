import Navbar from "./components/Navbar"
import FullBody from "./components/FullBody"
export default function App(){
  return(
    <div>
      <Navbar />
      <div className="workout">
        <FullBody />
      </div>
    </div>

 
  )
}
