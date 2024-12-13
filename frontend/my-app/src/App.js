import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account';
import ProfileDisplay from './components/ProfileDisplay'; // Corrected import
import MapComponent from './components/MapComponent';
import AdminPanel from './components/AdminPanel';

import PrivateRoute from './components/PrivateRoute'; // Assuming you have a PrivateRoute component for protected routes
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const { user, dispatch } = useAuth();

  const registerIn = () => {
    toast.success("Successfully Registered!");
  };

  const loggedIn = () => {
    toast.success("Successfully Logged In!");
  };

  // Fetch user profile on initial load
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get('http://localhost:4000/users/account', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({ type: "LOGIN", payload: { account: response.data } });
        } catch (error) {
          console.error("Failed to fetch user profile", error.response?.data || error.message);
        }
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="container">
      <h2>Frontend Case Study App</h2>
      <ToastContainer />
      <div>
        <nav>
          <Link to="/">Home</Link> |
          {!user.isLoggedIn ? (
            <>
              <Link to="/register">Register</Link> |
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/account">Account</Link> |
              <Link to="/profiles">Profiles</Link> |
              {user.account?.role === 'admin' && (
                <>
                  <Link to="/admin">Admin Panel</Link> |
                </>
              )}
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register registerIn={registerIn} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} />} />

          {/* Protected Routes */}
          <Route path="/account" element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          } />

          <Route path="/profiles" element={
            <PrivateRoute>
              <ProfileDisplay onSummaryClick={(profile) => alert(`Viewing summary for: ${profile.name}`)} />
            </PrivateRoute>
          } />

          {/* Admin Panel route accessible only to admins */}
          <Route path="/admin" element={
            <PrivateRoute>
              {user.account?.role === 'admin' ? (
                <AdminPanel />
              ) : (
                <div>Access Denied</div>
              )}
            </PrivateRoute>
          } />

          <Route path="/map" element={<MapComponent address={{ latitude: 37.7749, longitude: -122.4194, city: 'San Francisco', state: 'CA', country: 'USA' }} />} />
        </Routes>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}

export default App;
