import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';


function EditExercise(){
    const {id} = useParams();

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/'+id)
            .then(res => {
                setUsername(res.data.username);
                setDescription(res.data.description);
                setDuration(res.data.duration);
                setDate(new Date(res.data.date));
            })
            .catch(err => console.log(err));


        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0){
                    setUsers(res.data.map(user => user.username))
                }
            })
            .catch(err => console.log(err));
    }, []); //need the empty array so it only does this once

    const handleUsernameInput = e => {
        setUsername(e.target.value );
    };

    const handleDescriptionInput = (e) => {
        setDescription(e.target.value);
    };

    const handleDurationInput = e => {
        setDuration(e.target.value );
    };

    const handleDateInput = date => {
        setDate(date);
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }


        axios.post('http://localhost:5000/exercises/update/'+id, exercise)
            .then(res=> console.log(res.data))
            .catch(err => console.log(err));

        console.log(exercise);
    };

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select 
                        required
                        className="form-control"
                        value={username}
                        onChange={handleUsernameInput}>
                        { //can put js in curly braces
                            users.map(function(user){
                                return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: 
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={handleDescriptionInput}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={handleDurationInput}
                        />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={handleDateInput}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );

};

export default EditExercise;