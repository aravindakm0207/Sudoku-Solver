

const _ = require('lodash');
const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const axios = require('axios')
const path = require('path');

const userCltr = {};


// User Registration
userCltr.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    try {
        const salt = await bcryptjs.genSalt();
        const hashPassword = await bcryptjs.hash(body.password, salt);
        const user = new User({
            ...body,
            password: hashPassword
        });
        await user.save();
        res.status(201).json(_.pick(user, ['_id', 'name', 'email', 'role', 'createdAt']));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// User Login
userCltr.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email/password' });
        }
        const isAuth = await bcryptjs.compare(body.password, user.password);
        if (!isAuth) {
            return res.status(401).json({ error: 'Invalid email/password' });
        }
        const tokenData = { id: user._id, role: user.role };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get User Account Details
userCltr.account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(_.pick(user, ['_id', 'name', 'email', 'role', 'createdAt']));
    } catch (err) {
        console.error('Error fetching user account:', err.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// List Users (Admin Only)
userCltr.list = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        const users = await User.find();
        res.json(users.map(user => _.pick(user, ['_id', 'name', 'email', 'role', 'createdAt'])));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Update User Account
userCltr.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const body = _.pick(req.body, ['name', 'email']);
        const user = await User.findByIdAndUpdate(req.user.id, body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(_.pick(user, ['_id', 'name', 'email', 'role']));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Update User Role (Admin Only)
userCltr.updateRole = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    try {
        const { userId, role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(_.pick(user, ['_id', 'name', 'email', 'role']));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

userCltr.uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.profilePic = `/uploads/${req.file.filename}`; // Save relative path to the profile pic
        await user.save();

        res.status(200).json({ message: 'Profile picture uploaded successfully', profilePic: user.profilePic });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = userCltr;
