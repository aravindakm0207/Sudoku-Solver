import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';

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
        <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Admin Panel
            </Typography>

            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {form._id ? 'Edit Profile' : 'Create Profile'}
                    </Typography>

                    <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Photo URL"
                        name="photo"
                        value={form.photo}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="City"
                        name="address.city"
                        value={form.address.city || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="State"
                        name="address.state"
                        value={form.address.state || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Country"
                        name="address.country"
                        value={form.address.country || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{ marginTop: 2 }}
                    >
                        Save
                    </Button>
                </CardContent>
            </Card>

            <div>
                {profiles.map((profile) => (
                    <Card key={profile._id} variant="outlined" sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{profile.name}</Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                {profile.description}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setForm(profile)}
                                sx={{ marginRight: 1 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(profile._id)}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Box>
    );
};

export default AdminPanel;
