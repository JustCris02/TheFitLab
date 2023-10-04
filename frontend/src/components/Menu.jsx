import React from "react";
export default function Menu(props){
    return(
        <div className ="optionMenu">
            <p className="optionItem">Swap Exercise</p>
            <p className="optionItem">Remove Exercise</p>
            <p className="optionItem" onClick={props.removeSet}>Remove Set</p>
            <p className="optionItem">Change Weight Unit (lbs)</p>
        </div>
    )
}