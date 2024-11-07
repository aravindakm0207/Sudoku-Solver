// controllers/employeeController.js

const Employee = require('../models/employee-model');
const { validationResult } = require('express-validator');
const _ = require('lodash');

const employeeCltr = {};

// Create a new employee
employeeCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const body = _.pick(req.body, ['name', 'email', 'mobileNo', 'designation', 'gender', 'course']);
        const employee = new Employee(body);
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create employee' });
    }
};

// Get all employees with search, pagination, and sorting
employeeCltr.list = async (req, res) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortField = req.query.sortField || 'name'; // Default sort by name
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // Ascending by default

        const searchQuery = {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ]
        };

        const employees = await Employee.find(searchQuery)
            .sort({ [sortField]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Employee.countDocuments(searchQuery);

        res.json({
            data: employees,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};

// Get an employee by ID
employeeCltr.show = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
};

// Update an employee by ID
employeeCltr.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const body = _.pick(req.body, ['name', 'email', 'mobileNo', 'designation', 'gender', 'course']);
        const employee = await Employee.findByIdAndUpdate(req.params.id, body, { new: true });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update employee' });
    }
};

// Delete an employee by ID
employeeCltr.remove = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};

module.exports = employeeCltr;
