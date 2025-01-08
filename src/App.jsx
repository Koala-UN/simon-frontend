import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/authService';

import Home from './components/home';

const App = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setAuth(authenticated);
    };
    checkAuth();
  }, []);

  if (auth === null) {
    return <div>Cargando...</div>; // O cualquier indicador de carga
  }

  return (
    <Routes>
      <Route path="/*" element={<Home auth={auth} />} />
    </Routes>
  );
};

export default App;