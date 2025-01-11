import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Register from './register';
import Logout from './Logout';
import ProtectedPage from './ProtectedPage';
import ChangePassword from './ChangePassword';
import RecoveryPassword from './RecoveryPasssword';
import GoogleSuccess from './GoogleSuccess';
import CompleteProfile from './CompleteProfile';
const Home = ({ auth }) => {
  return (
    <div className="container">
      <h1>Home</h1>
      <div className="d-flex justify-content-around my-4">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" className="btn btn-primary">Register</Link>
        <Link to="/logout" className="btn btn-secondary">Logout</Link>
        <Link to="/protected" className="btn btn-success">Protected Page</Link>
        <Link to="/chg-password" className="btn btn-success">change password</Link>
        <Link to="/rec-password" className="btn btn-success">recovery password</Link>
      </div>
      <Routes>
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/logout/*" element={<Logout />} />
        <Route
          path="/protected/*"
          element={auth ? <ProtectedPage /> : <Navigate to="/login" />}
        />
        <Route path="/chg-password/*" element={auth ? <ChangePassword /> : <Navigate to="/login" />} />

        <Route path="/rec-password/*" element={auth ? <RecoveryPassword /> : <Navigate to="/login" />} />

        <Route path="/auth/google/callback" element={<GoogleSuccess  />}/>
        <Route path="/auth/google/complete-profile" element={<CompleteProfile />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default Home;