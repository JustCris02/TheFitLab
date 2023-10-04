import Menu from "./menu";
import React, { useState } from 'react';


export default function Exercise(props){

    function createArray(length){
        const arr =[]
        for (let i =1;i<=length;i++){
            arr.push(i);
        }
        return arr;
    }
    const [sets,setSets]=React.useState(createArray(props.sets))
    const renderSets = sets.map(setNumber => (
        <div key={setNumber} className="set">
          <span> {setNumber}</span>
          <span> {props.reps}</span>
          <input type ="number" placeholder='Weight'/>
          <input type ="number" placeholder={props.reps}/>
          <input type ="checkbox"/>
        </div>
      ));
    function addSet(){
        setSets(prevSets => [...prevSets, prevSets.length + 1]);       
    }
    function removeSetFuction(){
        setSets(prevSets=>prevSets.slice(0,-1))
    }

    const [toggleOptions,setToggleOptions]=React.useState(false);
    
    function seeOptions(){
        setToggleOptions(prevToggle=>!prevToggle)
    }

    return(
        <div>
            <h2>{props.name}</h2>
            <button className="seeOptions" onClick={seeOptions}>options</button>
            {toggleOptions &&<Menu removeSet= {()=>removeSetFuction()}/>}
            <p>Set Target Weigth Reps</p>
            {renderSets}
            <button onClick={addSet}> Add Set</button>
        </div>
    )

}