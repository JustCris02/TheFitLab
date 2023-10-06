import React, { useState } from "react";
import ExerciseList from "./ExerciseList"
export default function Menu(props){

    const [showExerciseList,setShowExerciseList]=useState(false);

    return(
        <div className ="optionMenu">
            { showExerciseList && <ExerciseList /> }
            {!showExerciseList&&<p className="optionItem" onClick={()=>setShowExerciseList(prev=>!prev)} >Swap Exercise</p>}
            {!showExerciseList&& <p className="optionItem">Remove Exercise</p>}
            {!showExerciseList&&<p className="optionItem" onClick={props.removeSet}>Remove Set</p>}
            {!showExerciseList&&<p className="optionItem">Change Weight Unit (lbs)</p>}
        </div>
    )
}