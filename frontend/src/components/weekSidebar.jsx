import {useState} from "react"

export default function weekSidebar(props){
    const renderedWeeks= props.weeks.map(week=>(
        <button className="weeks">Week {week}</button>
    ))
   
    
    return(
        <div className="weekSidebar">
            {renderedWeeks}
        </div>
    )
}