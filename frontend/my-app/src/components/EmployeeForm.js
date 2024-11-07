import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ employee, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: []
    });

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            course: checked 
                ? [...prevData.course, value] 
                : prevData.course.filter((c) => c !== value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (employee) {
                await axios.put(`http://localhost:4000/employees/${employee._id}`, formData);
            } else {
                await axios.post('http://localhost:4000/employees', formData);
            }
            onSave();
            setFormData({ name: '', email: '', mobileNo: '', designation: '', gender: '', course: [] });
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter Name</label><br />
            <input 
                type="text" 
                name="name" 
                id="name"
                value={formData.name} 
                onChange={handleChange} 
                required 
            /><br />
            
            <label htmlFor="email">Enter Email</label><br />
            <input 
                type="email" 
                name="email" 
                id="email"
                value={formData.email} 
                onChange={handleChange} 
                required 
            /><br />
            
            <label htmlFor="mobileNo">Enter Mobile No</label><br />
            <input 
                type="text" 
                name="mobileNo" 
                id="mobileNo"
                value={formData.mobileNo} 
                onChange={handleChange} 
                required 
            /><br />

            <label htmlFor="designation">Select Designation</label><br />
            <select 
                name="designation" 
                id="designation"
                value={formData.designation} 
                onChange={handleChange} 
                required
            >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select><br />

            <label>Gender</label><br />
            <label>
                <input 
                    type="radio" 
                    name="gender" 
                    value="M" 
                    checked={formData.gender === 'M'} 
                    onChange={handleChange} 
                /> Male
            </label><br />

            <label>
                <input 
                    type="radio" 
                    name="gender" 
                    value="F" 
                    checked={formData.gender === 'F'} 
                    onChange={handleChange} 
                /> Female
            </label><br /><br />

            <label>Courses</label><br />
            <label>
                <input 
                    type="checkbox" 
                    value="MCA" 
                    checked={formData.course.includes('MCA')} 
                    onChange={handleCheckboxChange} 
                /> MCA
            </label>
            <label>
                <input 
                    type="checkbox" 
                    value="BCA" 
                    checked={formData.course.includes('BCA')} 
                    onChange={handleCheckboxChange} 
                /> BCA
            </label>
            <label>
                <input 
                    type="checkbox" 
                    value="BSC" 
                    checked={formData.course.includes('BSC')} 
                    onChange={handleCheckboxChange} 
                /> BSC
            </label><br /><br />

            <button type="submit">
                {employee ? 'Update' : 'Create'} Employee
            </button>
        </form>
    );
};

export default EmployeeForm;
