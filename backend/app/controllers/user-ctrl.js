

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
        res.status(201).json(_.pick(user, ['_id', 'name', 'email', 'phone']));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


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



userCltr.account =async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json(user)
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
}

module.exports = userCltr;
