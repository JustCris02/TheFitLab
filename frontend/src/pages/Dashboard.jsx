import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import CustomExerciseImage from "../images/logo.png"
import axios from "axios";

export default function Dashboard() {
    const [programs, setPrograms] = useState([])
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [noOfDays, setNoOfDays] = useState('');
    const [isCustomProgram, setIsCustomProgram] = useState(false);
    const [file, setFile] = useState();

    const getPrograms = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const { data } = await axios.get(`http://localhost:5000/api/programs?user_id=${user._id}`);
            setPrograms(data)
        } catch (error) {
            console.error('Error creating user:', error.response.data.message);
        }
    };

    const savePrograms = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();
        formData.append("user_id", user._id);
        formData.append("title", title);
        formData.append("no_of_days", noOfDays);
        formData.append("image", file);
        try {
            const { data } = await axios.post(
                `http://localhost:5000/api/programs`,
                formData,
                { headers: {'Content-Type': 'multipart/form-data'}}
            );
            console.log(data);
            setIsCustomProgram(false);
            await getPrograms();
        } catch (error) {
            console.error('Error creating user:', error.response.data.message);
        }
    };

    useEffect(() => {
        getPrograms();
    }, [])

    return (
        <div className="row mt-5">
            {programs.map((program, index, arr) => {
                return (
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={program.id}>
                        <div className="card">
                            <img src={program?.image} className="card-img-top" alt={program?.title}/>
                            <div className="card-body">
                                <h5 className="card-title">{program?.title}</h5>
                                <Link to={`/exercises/${program?.slug}`} className="btn btn-primary">See Workout</Link>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                {!isCustomProgram && (<div className="card">
                    <img src={CustomExerciseImage} className="card-img-top" alt="Create Custom Workout"/>
                    <div className="card-body">
                        <h5 className="card-title"> Create Custom Workout</h5>
                        <Link to="/dashboard" className="btn btn-primary" onClick={() => setIsCustomProgram(true)}>Create</Link>
                    </div>
                </div>)}
                {isCustomProgram && (<div className="card">
                    <div className="form-group mt-3">
                        <label>Title</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter name"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>No Of Days in week</label>
                        <input
                            type="number"
                            className="form-control mt-1"
                            placeholder="Enter name"
                            onChange={(e) => setNoOfDays(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Image</label>
                        <input
                            filename={file}
                            onChange={e => setFile(e.target.files[0])}
                            type="file"
                            accept="image/*"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="button" onClick={savePrograms} className="btn btn-primary">
                            Create
                        </button>
                    </div>
                </div>)}
            </div>
        </div>
    )
}