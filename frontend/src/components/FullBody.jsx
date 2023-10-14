
import Exercise from "./Exercise"
import WeekSidebar from "./weekSidebar"
import { useState,useEffect } from "react"

export default function FullBody(){
    const[day,setDay]= useState(1)

    const [daysFinished,setDayFinished]=useState({
        day1:false,
        day2:false,
        day3:false,
    })
   
    function finishWorkout(day){
        setDayFinished(prevDays=>(
            {
                ...prevDays,
                [day]:true
            }
        ))
    }

    const [weeks,setWeeks]=useState([1])

    useEffect(()=>{
        if(daysFinished.day1&&daysFinished.day2&&daysFinished.day3){
            console.log('wassup')
            setWeeks(prevWeeks=>[...prevWeeks,prevWeeks.length+1])
            setDayFinished({
                day1:false,
                day2:false,
                day3:false
            })
        }

    },[daysFinished])

    return(
        <>
            <WeekSidebar weeks={weeks} />
            <div className="workoutDays">
                <button className="Days" onClick={()=>setDay(1)}>Day 1</button>
                <button className="Days"onClick={()=>setDay(2)}>Day 2</button>
                <button className="Days"onClick={()=>setDay(3)}>Day 3</button>
                {day==1 &&<div className="Day 1">
                    <Exercise name="Barbell Bench Press" sets= {4} reps="6-8" />
                    <Exercise name="Barbell Squat" sets= {4} reps="6-8" />
                    <button className="completeWorkout" onClick={()=>finishWorkout("day1")}> Finish Workout</button>
                </div>}
                {day==2 &&<div className="Day 2">
                    <Exercise name="Barbell Squat" sets= {4} reps="6-8" />
                    <Exercise name="Barbell Bench" sets= {4} reps="6-8" />
                    <button className="completeWorkout" onClick={()=>finishWorkout("day2")} > Finish Workout</button>
                </div>}
                {day==3&&<div className="Day 3">
                    <Exercise name="Barbell Deadlift" sets= {4} reps="6-8" />
                    <Exercise name="Brabell Overhead Press" sets= {4} reps="6-8" />
                    <button className="completeWorkout" onClick={()=>finishWorkout("day3")}> Finish Workout</button>
                </div>}
            </div>    
        </>
        
    )


}