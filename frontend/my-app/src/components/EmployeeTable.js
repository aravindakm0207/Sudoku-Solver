import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, [search, sortField, sortOrder]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:4000/employees', {
                params: {
                    search,
                    sortField,
                    sortOrder
                }
            });
            setEmployees(response.data.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/employees/${id}`);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleSave = () => {
        fetchEmployees();
        setSelectedEmployee(null);
    };

    const handleCancel = () => {
        setSelectedEmployee(null);
    };

    return (
        <div>
            <h2>Employee List</h2>
            <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Search by name or email" 
            />
            <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Sort by {sortField} ({sortOrder})
            </button>

            {/* Conditional rendering of EmployeeForm */}
            {selectedEmployee && (
                <div>
                    <h3>Edit Employee</h3>
                    <EmployeeForm 
                        employee={selectedEmployee} 
                        onSave={handleSave} 
                    />
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobileNo}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.course.join(', ')}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)}>Edit</button>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
