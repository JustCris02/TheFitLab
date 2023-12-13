import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react"
import axios from "axios";

export default function Exercises (){
    const [weeks, setWeeks] = useState([]);
    const [week, setWeek] = useState(1);
    const [day, setDay] = useState(1);
    const { id } = useParams();
    const [program, setProgram] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [isCustomExercise, setIsCustomExercise] = useState(false);
    const [title, setTitle] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [noOfSet, setNoOfSet] = useState('');

    const fetchExercises = async (programId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/program/${programId}/exercises`);
            setExercises([]);
            setExercises(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProgram = async () => {
        try {
            console.log(`Making request to /api/program/${id}`);
            const response = await axios.get(`http://localhost:5000/api/program/${id}`);
            setProgram(response.data);
            await fetchExercises(response.data._id);
        } catch (error) {
            console.log(error);
        }
    };
    

    useEffect(() => {
        fetchProgram();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const uniq = (items) => [...new Set(items)];
        const uniqWeeks = uniq(exercises.map((item) => item.week));
        setWeeks(uniqWeeks.length ? uniqWeeks : [1])
    }, [exercises])
    
    const createExercise = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const sets = [];
        for (let i = 0; i < noOfSet; i++) {
            const set = { reps: null, weight: null };
            sets.push(set);
        }
        if (min >= max) {
            alert('Min should lower then max');
            return;
        }
        const data = {
            user_id: user._id,
            program_id: program._id,
            day,
            title,
            min,
            max,
            order: exercises.length + 1,
            week,
            increase_weight: 0,
            sets
        }
        try {
            await axios.post(`http://localhost:5000/api/exercises`, data);
            setIsCustomExercise(false);
            await fetchExercises(program._id);
        } catch (error) {
            console.error('Error creating user:', error.response.data.message);
        }
    };

    const removeExercise = async (exerciseId) => {
        try {
            await axios.post(`http://localhost:5000/api/exercises/${exerciseId}/remove`, {});
            const updatedExercises = exercises.filter(exercise => exercise._id !== exerciseId);
            setExercises(updatedExercises);
        } catch (error) {
        }
    }

    const handleIncreaseWeight = (exerciseId, newWeight) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (exercise._id === exerciseId) {
                exercise.increase_weight = newWeight;
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };

    const handleWeightChange = (exerciseId, index, newWeight) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (exercise._id === exerciseId) {
                const updatedSets = [...exercise.sets];
                updatedSets[index] = { ...updatedSets[index], weight: newWeight };
                exercise.sets = updatedSets;
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };

    const handleRepsChange = (exerciseId, index, newReps) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (exercise._id === exerciseId) {
                const updatedSets = [...exercise.sets];
                updatedSets[index] = { ...updatedSets[index], reps: newReps };
                exercise.sets = updatedSets;
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };

    const addSet = async (exerciseId) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (exercise._id === exerciseId) {
                exercise.sets.push({ weight: null, reps: null });
            }
            return exercise;
        });
        setExercises(updatedExercises);

        try {
            const sets = exercises.find(exercise => exercise._id === exerciseId).sets;
            await axios.post(`http://localhost:5000/api/exercises/${exerciseId}/update/sets`, { sets });
        } catch (error) {
        }     
    }

    const removeSet = async (exerciseId) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (exercise._id === exerciseId) {
                exercise.sets.pop();
            }
            return exercise;
        });
        setExercises(updatedExercises);

        try {
            const sets = exercises.find(exercise => exercise._id === exerciseId).sets;
            await axios.post(`http://localhost:5000/api/exercises/${exerciseId}/update/sets`, { sets });
        } catch (error) {
        }
        
    }
    const finishExercises = async () => {
        try {
            await axios.post(`http://localhost:5000/api/exercises/update`, {
                exercises: exercises.filter(exercise => exercise?.day === day && exercise?.week === week)
            });
            await fetchExercises(program._id);
        } catch (error) {
        }
    }


    return (
        <div className="row mt-5">
            <div className="col-12 col-sm-3">
                <ul className="list-group">
                    {weeks.map(w => (
                        <li
                            key={w}
                            className={week === w ? "list-group-item active" : 'list-group-item'}
                            onClick={() => setWeek(w)}
                        >Week {w}</li>
                    ))}
                </ul>
            </div>
            <div className="col-12 col-sm-9">
                <div className="d-flex justify-content-between mb-4">
                    <div className="btn-group">
                        {Array(program.no_of_days).fill({}).map((d, i) => (
                            <button
                                type="button"
                                className={1 + i === day ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                                key={i}
                                onClick={() => setDay(1 + i)}
                            >
                                Day {1 + i}
                            </button>
                        ))}
                    </div>
    
                    {!isCustomExercise && (
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setIsCustomExercise(true)}
                        >
                            Create Custom Exercise
                        </button>
                    )}
                </div>
    
                <div className="workoutDays">
                    {isCustomExercise && (
                        <div>
                            <div className="form-group mt-3">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Enter title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Min</label>
                                <input
                                    type="number"
                                    className="form-control mt-1"
                                    placeholder="Enter min value"
                                    onChange={(e) => setMin(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Max</label>
                                <input
                                    type="number"
                                    className="form-control mt-1"
                                    placeholder="Enter max value"
                                    onChange={(e) => setMax(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>No of sets</label>
                                <input
                                    type="number"
                                    className="form-control mt-1"
                                    placeholder="Enter no of sets"
                                    onChange={(e) => setNoOfSet(e.target.value)}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="button" onClick={() => createExercise()} className="btn btn-primary">
                                    Create
                                </button>
                            </div>
                        </div>
                    )}
    
                    {exercises.filter(exercise => exercise?.day === day && exercise?.week === week).map(exercise =>
                        <div key={exercise._id}>
                            <div className="btn-group float-end">
                                <button className="btn btn-danger btn-sm"
                                        onClick={() => removeExercise(exercise._id)}> Remove Exercise
                                </button>
                            </div>
                            <div className="mb-5">
                                <h3>{exercise.title}</h3>
    
                                <div className="row">
                                    <div className="col-sm-7">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={exercise.increase_weight === 0 ? '' : exercise.increase_weight}
                                            placeholder="Increase Weight By"
                                            onChange={e => handleIncreaseWeight(exercise._id, e.target.value)}
                                        />
                                    </div>
                                </div>
    
                                <p className="mt-3">Set Target Weight Reps</p>
    
                                {exercise.sets.map((setNumber, index) => (
                                    <div key={index} className="row g-3 mb-2 align-items-center">
                                        <div className="col-auto">{index + 1}. {`${exercise.min}-${exercise.max}`}</div>
                                        <div className="col-auto">
                                            <input type="number"
                                                   placeholder='Weight'
                                                   className="form-control"
                                                   value={setNumber.weight || ''}
                                                   onChange={(e) => handleWeightChange(exercise._id, index, e.target.value)}
                                            />
                                        </div>
                                        <div className="col-auto">
                                            <input type="number"
                                                   className="form-control"
                                                   value={setNumber.reps || ''}
                                                   onChange={(e) => handleRepsChange(exercise._id, index, e.target.value)}
                                                   placeholder={`${exercise.min}-${exercise.max}`}
                                            />
                                        </div>
                                        <div className="col-auto">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox"/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
    
                                <div className="row mt-3">
                                    <div className="col-sm-7">
                                        <div className="btn-group float-end">
                                            <button className="btn btn-secondary btn-sm"
                                                    onClick={() => addSet(exercise._id)}
                                            >Add Set
                                            </button>
                                            <button className="btn btn-danger btn-sm"
                                                    onClick={() => removeSet(exercise._id)}
                                            >Remove Set
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
    
                    {exercises.filter(exercise => exercise?.day === day && exercise?.week === week).length > 0 && !isCustomExercise && (
                        <button className="btn btn-primary mb-5" onClick={() => finishExercises()}> 
                            Finish Workout
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}