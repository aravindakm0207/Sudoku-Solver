import { useState } from "react";
import validator from "validator";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

export default function Register({ registerIn }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    serverErrors: [],
    clientErrors: {}
  });

  const errors = {};

  const runValidations = () => {
    if (form.firstname.trim().length === 0) {
      errors.firstname = 'firstname is required';
    }
    if (form.lastname.trim().length === 0) {
      errors.lastname = 'lastname is required';
    }
    if (form.email.trim().length === 0) {
      errors.email = 'email is required';
    } else if (!validator.isEmail(form.email)) {
      errors.email = 'invalid email format';
    }
    if (form.password.trim().length === 0) {
      errors.password = 'password is required';
    } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
      errors.password = 'password should be between 8 - 128 characters';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = _.pick(form, ['firstname', 'lastname', 'email', 'password']);
    
    runValidations();

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:4000/users/register', formData);
        console.log(response.data);
        
        navigate('/login');
      } catch (err) {
        console.log(err);
        setForm({ ...form, serverErrors: err.response?.data?.errors || [err.message] });
      }
    } else {
      setForm({ ...form, clientErrors: errors });
    }
  };

  const displayErrors = () => (
    <div>
      <h3>These errors prohibited the form from being saved:</h3>
      <ul>
        {form.serverErrors.map((ele, i) => (
          <li key={i}>{ele.msg || ele}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h1>Register With Us</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Enter firstname</label><br />
        <input
          type="text"
          value={form.firstname}
          onChange={handleChange}
          name="firstname"
          id="firstname"
        />
        {form.clientErrors.firstname && <span>{form.clientErrors.firstname}</span>}
        <br />

        <label htmlFor="lastname">Enter lastname</label><br />
        <input
          type="text"
          value={form.lastname}
          onChange={handleChange}
          name="lastname"
          id="lastname"
        />
        {form.clientErrors.lastname && <span>{form.clientErrors.lastname}</span>}
        <br />

        <label htmlFor="email">Enter email</label><br />
        <input
          type="text"
          value={form.email}
          onChange={handleChange}
          name="email"
          id="email"
        />
        {form.clientErrors.email && <span>{form.clientErrors.email}</span>}
        <br />

        <label htmlFor="password">Enter password</label><br />
        <input
          type="password"
          value={form.password}
          onChange={handleChange}
          name="password"
          id="password"
        />
        {form.clientErrors.password && <span>{form.clientErrors.password}</span>}
        <br />

        <input type="submit" />
      </form>
      {form.serverErrors.length > 0 && displayErrors()}
    </div>
  );
}