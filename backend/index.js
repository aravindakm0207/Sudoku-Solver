require('dotenv').config();
const express = require('express');
const cors = require('cors');
const employeeCltr = require('./app/controllers/employee-ctrl'); 
const configureDB=require('./config/db')
const app = express();
app.use(cors());
app.use(express.json());
const { checkSchema } = require('express-validator');

configureDB()


const userRegisterValidation = require('./app/validations/user-register-validations');
const userLoginValidation = require('./app/validations/user-login-validations');
const userCltr = require('./app/controllers/user-ctrl');
const authenticateUser = require('./app/middlewares/authenticateUser');



app.post('/users/register', checkSchema(userRegisterValidation), userCltr.register);
app.post('/users/login', checkSchema(userLoginValidation), userCltr.login);
app.get('/users/account', authenticateUser, userCltr.account);


app.post('/employees', employeeCltr.create);
app.get('/employees', employeeCltr.list);
app.get('/employees/:id', employeeCltr.show);
app.put('/employees/:id', employeeCltr.update);
app.delete('/employees/:id', employeeCltr.remove)



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});