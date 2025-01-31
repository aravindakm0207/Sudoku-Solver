import { useState } from "react";
import validator from "validator";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',  // New field for phone
    serverErrors: [],
    clientErrors: {}
  });

  const errors = {};

  const runValidations = () => {
    if (form.name.trim().length === 0) {
      errors.name = 'Name is required';
    }
    if (form.email.trim().length === 0) {
      errors.email = 'Email is required';
    } else if (!validator.isEmail(form.email)) {
      errors.email = 'Invalid email format';
    }
    if (form.password.trim().length === 0) {
      errors.password = 'Password is required';
    } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
      errors.password = 'Password should be between 8 - 128 characters';
    }
    if (form.phone.trim().length === 0) {
      errors.phone = 'Phone number is required';
    } else if (!validator.isMobilePhone(form.phone)) {
      errors.phone = 'Invalid phone number format';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = _.pick(form, ['name', 'email', 'password', 'phone']);
    
    runValidations();

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:4000/users/register', formData);
        console.log(response.data);
        navigate('/login'); // Redirect to login after successful registration
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
        <div>
          <label>Enter full name</label><br/>
          <input
            type="text"
            value={form.name}
            onChange={handleChange}
            name="name"
          />
          {form.clientErrors.name && <p>{form.clientErrors.name}</p>}
        </div>
        <div>
          <label>Enter email</label><br/>
          <input
            type="email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
          {form.clientErrors.email && <p>{form.clientErrors.email}</p>}
        </div>

        <div>
          <label>Enter password</label><br/>
          <input
            type="password"
            value={form.password}
            onChange={handleChange}
            name="password"
          />
          {form.clientErrors.password && <p>{form.clientErrors.password}</p>}
        </div>

        <div>
          <label>Enter phone number</label><br/>
          <input
            type="text"
            value={form.phone}
            onChange={handleChange}
            name="phone"
          />
          {form.clientErrors.phone && <p>{form.clientErrors.phone}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
      {form.serverErrors.length > 0 && displayErrors()}
    </div>
  );
}
