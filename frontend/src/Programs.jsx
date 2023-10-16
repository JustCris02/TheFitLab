import FullBodyPic from "./images/fullbody.jpg"
export default function Programs(){

    return(
        <div className="Programs">
            <div className="FullBody"> 
                <img src={FullBodyPic}alt="fullbody" className="programPic"/>
                Full Body
            </div>
            <div className ="UpperLower"> </div>
        </div>
    )
}