import { Link } from "react-router-dom"
import logo from "../images/logo.png"

export default function Navbar(){
    return(
        <nav>
            <Link to="/" className="nav--icon">
                TheFitLab
                <img src={logo} alt="FitLab logo" className="logo"/>
            </Link>
            <Link to="/Programs" className="navBarLink">Programs</Link>
            <Link to="/" className="navBarLink">Sign-Up</Link>
        </nav>
    )
}
