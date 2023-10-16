import FullBodyPic from "./images/fullbody.jpg"
import UpperLower from "./images/upperlower.jpg"
import { Link } from "react-router-dom"
import Logo from "./images/logo.png"
export default function Programs(){

    return(
        <div className="Program--container">
            <Link to = "/FullBody" className="Programs"> 
                <img src={FullBodyPic}alt="fullbody" className="programPic"/>
                Full Body
            </Link>
            <Link to = "/UpperLower" className ="Programs">
            <img src={UpperLower}alt="upperLower" className="programPic"/>
                Upper Lower
            </Link>
            <div className ="Programs">
            <img src={Logo}alt="upperLower" className="programPic"/>
                Create Custom
            </div>
        </div>
    )
}