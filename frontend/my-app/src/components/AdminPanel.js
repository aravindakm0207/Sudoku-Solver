import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [profiles, setProfiles] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', photo: '', address: {} });

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        const { data } = await axios.get('http://localhost:4000/profiles');
        setProfiles(data.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            if (form._id) {
                await axios.put(`http://localhost:4000/profiles/${form._id}`, form);
            } else {
                await axios.post('http://localhost:4000/profiles', form);
            }
            fetchProfiles();
            setForm({ name: '', description: '', photo: '', address: {} });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/profiles/${id}`);
            fetchProfiles();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Photo URL"
                    name="photo"
                    value={form.photo}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="City"
                    name="address.city"
                    value={form.address.city || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="State"
                    name="address.state"
                    value={form.address.state || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Country"
                    name="address.country"
                    value={form.address.country || ''}
                    onChange={handleChange}
                />
                <button onClick={handleSave}>Save</button>
            </div>
            <div>
                {profiles.map((profile) => (
                    <div key={profile._id}>
                        <h3>{profile.name}</h3>
                        <p>{profile.description}</p>
                        <button onClick={() => setForm(profile)}>Edit</button>
                        <button onClick={() => handleDelete(profile._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
