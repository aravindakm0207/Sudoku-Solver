import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, setSearch, setFilters, setPage } from '../redux/actions/profileActions';
import { TextField, Button, Box, Typography, Grid, Card, CardContent } from '@mui/material';

const ProfileDisplay = ({ onSummaryClick }) => {
    const dispatch = useDispatch();
    const { profiles, search, filters, page, totalPages } = useSelector(state => state);

    // Fetch profiles when component mounts or when search, filters, or page changes
    useEffect(() => {
        dispatch(fetchProfiles(search, page, filters));
    }, [search, filters, page, dispatch]);

    const handleSearchChange = (e) => dispatch(setSearch(e.target.value));
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFilters({ ...filters, [name]: value }));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>Profiles</Typography>

            {/* Search and Filter Inputs */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                <TextField
                    label="Search by name or description"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={handleSearchChange}
                />
                <TextField
                    label="City"
                    variant="outlined"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="State"
                    variant="outlined"
                    name="state"
                    value={filters.state}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="Country"
                    variant="outlined"
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                />
            </Box>

            {/* Profiles List */}
            <Grid container spacing={2}>
                {profiles.map((profile) => (
                    <Grid item xs={12} sm={6} md={4} key={profile._id}>
                        <Card variant="outlined">
                            <CardContent>
                                <img
                                    src={profile.photo || '/placeholder.jpg'}
                                    alt={profile.name}
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                                <Typography variant="h6" gutterBottom>{profile.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{profile.description}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ marginTop: 2 }}
                                    onClick={() => onSummaryClick(profile)}
                                >
                                    Summary
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                <Button
                    variant="outlined"
                    disabled={page <= 1}
                    onClick={() => dispatch(setPage(page - 1))}
                >
                    Previous
                </Button>
                <Typography variant="body1">
                    Page {page} of {totalPages}
                </Typography>
                <Button
                    variant="outlined"
                    disabled={page >= totalPages}
                    onClick={() => dispatch(setPage(page + 1))}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileDisplay;
