import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDisplay = ({ onSummaryClick }) => {
    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ city: '', state: '', country: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/profiles', {
                    params: { search, page, ...filters },
                });
                setProfiles(data.data);
                setTotalPages(data.pages);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfiles();
    }, [search, filters, page]);

    const handleSearchChange = (e) => setSearch(e.target.value);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h2>Profiles</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search by name or description"
                    value={search}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={filters.state}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                />
            </div>
            <div>
                {profiles.map((profile) => (
                    <div key={profile._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <img src={profile.photo || '/placeholder.jpg'} alt={profile.name} style={{ width: '100px', height: '100px' }} />
                        <h3>{profile.name}</h3>
                        <p>{profile.description}</p>
                        <button onClick={() => onSummaryClick(profile)}>Summary</button>
                    </div>
                ))}
            </div>
            <div>
                <button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>
                    Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProfileDisplay;
