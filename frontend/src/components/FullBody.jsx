
import Exercise from "./Exercise"
import React from "react"

export default function FullBody(){
    const[day,setDay]= React.useState(1)
   

    return(
        <div className="workoutDays">
            <button className="Days" onClick={()=>setDay(1)}>Day 1</button>
            <button className="Days"onClick={()=>setDay(2)}>Day 2</button>
            <button className="Days"onClick={()=>setDay(3)}>Day 3</button>
            {day==1 &&<div className="Day 1">
                <Exercise name="Barbell Bench Press" sets= {4} reps="6-8" />
                <Exercise name="Barbell Squat" sets= {4} reps="6-8" />
            </div>}
            {day==2 &&<div className="Day 2">
                <Exercise name="Barbell Squat" sets= {4} reps="6-8" />
                <Exercise name="Barbell Bench" sets= {4} reps="6-8" />
            </div>}
            {day==3&&<div className="Day 3">
                <Exercise name="Barbell Deadlift" sets= {4} reps="6-8" />
                <Exercise name="Brabell Overhead Press" sets= {4} reps="6-8" />
            </div>}
        </div>
    )


}