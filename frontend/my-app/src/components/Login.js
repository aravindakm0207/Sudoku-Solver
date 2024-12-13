import { useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

export default function Login() {
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: '',
        serverErrors: null, 
        clientErrors: {}
    });

    const errors = {};

    const runValidations = () => {
        if (form.email.trim().length === 0) {
            errors.email = 'Email is required';
        } else if (!validator.isEmail(form.email)) {
            errors.email = 'Invalid email format';
        }

        if (form.password.trim().length === 0) {
            errors.password = 'Password is required';
        } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'Password must be between 8 and 128 characters';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = _.pick(form, ['email', 'password']);

        runValidations();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:4000/users/login', formData);
                localStorage.setItem('token', response.data.token);
                const userResponse = await axios.get('http://localhost:4000/users/account', { 
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                dispatch({ type: "LOGIN", payload: { account: userResponse.data } });
                navigate('/');
            } catch (err) {
                setForm({ ...form, serverErrors: err.response.data.errors, clientErrors: {} });
            }
        } else {
            setForm({ ...form, clientErrors: errors });
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };

    const displayErrors = () => {
        let result;
        if (typeof form.serverErrors === 'string') {
            result = <Typography color="error"> {form.serverErrors} </Typography>;
        } else {
            result = (
                <Box>
                    <Typography variant="h6" color="error">
                        These errors prohibited the form from being saved:
                    </Typography>
                    <ul>
                        {form.serverErrors.map((ele, i) => (
                            <li key={i}>
                                <Typography variant="body2" color="error">
                                    {ele.msg}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            );
        }
        return result;
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Login
            </Typography>
            {form.serverErrors && displayErrors()}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="text"
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    fullWidth
                    margin="normal"
                    error={!!form.clientErrors.email}
                    helperText={form.clientErrors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    name="password"
                    fullWidth
                    margin="normal"
                    error={!!form.clientErrors.password}
                    helperText={form.clientErrors.password}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    {form.serverErrors ? <CircularProgress size={24} color="secondary" /> : 'Login'}
                </Button>
            </form>
            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                    Don't have an account? <Link to="/register">Create one</Link>
                </Typography>
            </Box>
        </Box>
    );
}
