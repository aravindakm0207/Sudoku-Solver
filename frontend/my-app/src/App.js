import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
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
      <h2>Employee Management App</h2>
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
              <Link to="/employee-form">Add Employee</Link> |
              <Link to="/employees">Employees</Link> |
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

          
          <Route path="/employee-form" element={
            <PrivateRoute>
              <EmployeeForm />
            </PrivateRoute>
          } />

          <Route path="/employees" element={
            <PrivateRoute>
              <EmployeeTable />
            </PrivateRoute>
          } />

        </Routes>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}

export default App;
