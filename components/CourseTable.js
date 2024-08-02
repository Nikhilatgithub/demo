// src/components/CourseTable.js

import React from 'react';

const CourseTable = ({ courses, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Course List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Fees</th>
                        <th>Duration (months)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.cid}>
                            <td>{course.cname}</td>
                            <td>{course.fees}</td>
                            <td>{course.duration}</td>
                            <td>
                                <button onClick={() => onEdit(course)}>Edit</button>
                                <button onClick={() => onDelete(course.cid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;
