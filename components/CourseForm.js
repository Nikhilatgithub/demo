// src/components/CourseForm.js

import React, { useState, useEffect } from 'react';

const CourseForm = ({ course, onSave, onCancel }) => {
    const [cname, setCname] = useState(course ? course.cname : '');
    const [fees, setFees] = useState(course ? course.fees : '');
    const [duration, setDuration] = useState(course ? course.duration : '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (course) {
            setCname(course.cname);
            setFees(course.fees);
            setDuration(course.duration);
        }
    }, [course]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cname || !fees || !duration || /\d/.test(cname) || fees <= 0 || duration <= 0) {
            setError('Please fill out all fields correctly');
            return;
        }

        onSave({ cname, fees, duration });
        setError('');
    };

    return (
        <div>
            <h2>{course ? 'Edit Course' : 'Add Course'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Name:</label>
                    <input
                        type="text"
                        value={cname}
                        onChange={(e) => setCname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fees:</label>
                    <input
                        type="number"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        required
                        min="1"
                    />
                </div>
                <div>
                    <label>Duration (months):</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                        min="1"
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CourseForm;
