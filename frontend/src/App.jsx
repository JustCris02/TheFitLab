import Navbar from "./components/Navbar"
import WeekSidebar from "./components/weekSidebar"
import FullBody from "./components/FullBody"
export default function App(){
  return(
    <div>
      <Navbar />
      <div className="workout">
        <WeekSidebar/>
        <FullBody />
      </div>
    </div>

 
  )
}
