// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import CourseTable from './components/CourseTable';
import CourseForm from './components/CourseForm';

const App = () => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const [showCourseForm, setShowCourseForm] = useState(false);

    useEffect(() => {
        if (user) {
            fetchCourses();
        }
    }, [user]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses', error);
        }
    };

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
    };

    const handleAddCourse = () => {
        setEditingCourse(null);
        setShowCourseForm(true);
    };

    const handleEditCourse = (course) => {
        setEditingCourse(course);
        setShowCourseForm(true);
    };

    const handleDeleteCourse = async (cid) => {
        try {
            await axios.delete(`http://localhost:5000/courses/${cid}`);
            fetchCourses();
        } catch (error) {
            console.error('Failed to delete course', error);
        }
    };

    const handleSaveCourse = async (course) => {
        try {
            if (editingCourse) {
                await axios.put(`http://localhost:5000/courses/${editingCourse.cid}`, course);
            } else {
                await axios.post('http://localhost:5000/courses', course);
            }
            setShowCourseForm(false);
            fetchCourses();
        } catch (error) {
            console.error('Failed to save course', error);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setCourses([]);
    };

    return (
        <div>
            {!user ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <div>
                    <h1>Welcome, {user.email}</h1>
                    <button onClick={handleLogout}>Logout</button>
                    {showCourseForm ? (
                        <CourseForm
                            course={editingCourse}
                            onSave={handleSaveCourse}
                            onCancel={() => setShowCourseForm(false)}
                        />
                    ) : (
                        <>
                            <CourseTable
                                courses={courses}
                                onEdit={handleEditCourse}
                                onDelete={handleDeleteCourse}
                            />
                            <button onClick={handleAddCourse}>Add Course</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
