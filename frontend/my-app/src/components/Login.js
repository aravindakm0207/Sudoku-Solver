import { useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { useAuth } from '../context/AuthContext';

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
            result = <div style={{ color: 'red' }}>{form.serverErrors}</div>;
        } else {
            result = (
                <div>
                    <h6 style={{ color: 'red' }}>These errors prohibited the form from being saved:</h6>
                    <ul>
                        {form.serverErrors.map((ele, i) => (
                            <li key={i} style={{ color: 'red' }}>
                                {ele.msg}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return result;
    };

    return (
        <div>
            <h2>Login</h2>
            {form.serverErrors && displayErrors()}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label><br/>
                    <input
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        name="email"
                        fullWidth
                    />
                    {form.clientErrors.email && <p style={{ color: 'red' }}>{form.clientErrors.email}</p>}
                </div>
                <div>
                    <label>Password</label><br/>
                    <input
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        name="password"
                        fullWidth
                    />
                    {form.clientErrors.password && <p style={{ color: 'red' }}>{form.clientErrors.password}</p>}
                </div>
                <button type="submit">
                    {form.serverErrors ? 'Loading...' : 'Login'}
                </button>
            </form>
            <div >
                <p>
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
}
