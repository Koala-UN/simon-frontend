import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error en el cierre de sesión:', error);
    }
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default Logout;