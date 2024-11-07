const _ = require('lodash');
const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

const userCltr = {};


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
        res.status(201).json(user);
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
        const tokenData = { id: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token });
    } catch (err) {
        console.error(err); 
        return res.status(500).json({ error: 'Something went wrong' });
    }
};



userCltr.account = async (req, res) => {
    try {
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user account:', err.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

userCltr.list=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const user=await User.find(req.user)
        res.json(user)

    }
    catch(err){
        console.log(err)
    }
}


userCltr.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const body = _.pick(req.body, ['firstName', 'lastName', 'email']); 
        const user = await User.findByIdAndUpdate(req.user.id, body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = userCltr;