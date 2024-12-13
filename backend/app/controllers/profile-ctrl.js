const Profile = require('../models/profile-model');
const { validationResult } = require('express-validator');
const axios = require('axios'); 
const profileCltr = {};



profileCltr.add = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

profileCltr.edit = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


profileCltr.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await Profile.findByIdAndDelete(id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json({ message: 'Profile deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


profileCltr.listProfiles = async (req, res) => {
    try {
        const search = req.query.search || ""; // Text-based search (name/description)
        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Items per page
        const city = req.query.city || null; // City-based filtering
        const state = req.query.state || null; // State-based filtering
        const country = req.query.country || null; // Country-based filtering

        
        const searchQuery = {
            $and: [
                {
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                    ]
                }
            ]
        };

        
        if (city) searchQuery.$and.push({ "address.city": city });
        if (state) searchQuery.$and.push({ "address.state": state });
        if (country) searchQuery.$and.push({ "address.country": country });

       
        const profiles = await Profile.find(searchQuery)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Profile.countDocuments(searchQuery); 

        res.json({
            data: profiles,
            total,
            page,
            pages: Math.ceil(total / limit),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


profileCltr.getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports =  profileCltr ;