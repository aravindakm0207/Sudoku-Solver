require('dotenv').config();
const express = require('express');
const cors = require('cors');
const configureDB = require('./config/db');
const { checkSchema } = require('express-validator');
const path = require('path');

// Middleware
const authenticateUser = require('./app/middlewares/authenticateUser');
const authorizeUser = require('./app/middlewares/authorizeUser');

// Controllers and Validations
const userRegisterValidation = require('./app/validations/user-register-validations');
const userLoginValidation = require('./app/validations/user-login-validations');
const userCltr = require('./app/controllers/user-ctrl');
const profileCltr = require('./app/controllers/profile-ctrl');
const upload = require('./app/middlewares/upload');

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Database Configuration
configureDB();

// User Routes
app.post('/users/register', checkSchema(userRegisterValidation), userCltr.register); // Register user
app.post('/users/login', checkSchema(userLoginValidation), userCltr.login); // Login user
app.get('/users/account', authenticateUser, userCltr.account); // Get user account
app.get('/users', authenticateUser, authorizeUser('admin'), userCltr.list); // List users (Admin only)
app.put('/users/account', authenticateUser, userCltr.update); // Update user account
app.put('/users/role', authenticateUser, authorizeUser('admin'), userCltr.updateRole); // Update user role (Admin only)

app.post('/upload-profile-pic', authenticateUser, upload.single('profilePic'), userCltr.uploadProfilePic);

// Profile Routes
app.post('/profiles', authenticateUser, authorizeUser('admin'), profileCltr.add); // Add profile (Admin only)
app.put('/profiles/:profileId', authenticateUser, authorizeUser('admin'), profileCltr.edit); // Edit profile (Admin only)
app.delete('/profiles/:profileId', authenticateUser, authorizeUser('admin'), profileCltr.delete); // Delete profile (Admin only)
app.get('/profiles', authenticateUser, profileCltr.listProfiles); // List profiles (Accessible by all authenticated users)
app.get('/profiles/:profileId', authenticateUser, profileCltr.getProfile); // Get profile details by ID (Accessible by all authenticated users)

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
