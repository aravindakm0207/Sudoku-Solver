import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { Button } from '@mui/material'; // Importing MUI Button
import SudokuSolver from './components/SudokuSolver';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
          
          <h1 className="my-4">My Application</h1>

          
          <nav className="mb-4">
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button component={Link} to="/" variant="text">Home</Button>
              <Button component={Link} to="/sudoku" variant="text">Sudoku Solver</Button>
              <Button component={Link} to="/register" variant="text">Register</Button>
              <Button component={Link} to="/login" variant="text">Login</Button>
              <Button component={Link} to="/account" variant="text">Account</Button>
            </div>
          </nav>

        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sudoku" element={<SudokuSolver />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


function Home() {
  return <h2>Welcome to the Home Page!</h2>;
}

export default App;















