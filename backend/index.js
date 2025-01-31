require('dotenv').config();
const express = require('express');
const cors = require('cors');
const configureDB = require('./config/db');
const { checkSchema } = require('express-validator');
const userRegisterValidation = require('./app/validations/user-register-validations');
const userLoginValidation = require('./app/validations/user-login-validations');
const userCltr = require('./app/controllers/user-ctrl');
const authenticateUser = require('./app/middlewares/authenticateUser')
const app = express();
app.use(cors());
app.use(express.json());

configureDB();


app.post('/users/register', checkSchema(userRegisterValidation), userCltr.register); 
app.post('/users/login', checkSchema(userLoginValidation), userCltr.login); 
app.get('/users/account', authenticateUser, userCltr.account); 


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
