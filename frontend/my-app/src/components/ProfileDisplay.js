import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, setSearch, setFilters, setPage } from '../redux/actions/profileActions';

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
                <button disabled={page <= 1} onClick={() => dispatch(setPage(page - 1))}>
                    Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button disabled={page >= totalPages} onClick={() => dispatch(setPage(page + 1))}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProfileDisplay;
