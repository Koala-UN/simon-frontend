import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(correo, contrasena);
    window.location.href = '/protected';
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };
const handleGoogleLogin = async () => {
  try {
    window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_API_KEY;
  } catch (error) {
    console.error('Error en el inicio de sesión con Google:', error);
  }
};


return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="mb-4">Iniciar sesión</h2>
            <div className="form-group">
                <label>Correo:</label>
                <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Contraseña:</label>
                <input
                    type="password"
                    className="form-control"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
            <button
          type="button"
          className="btn btn-secondary btn-block mt-2"
          style={{ backgroundColor: "red", fontWeight: "bold" }}
          onClick={handleGoogleLogin}
        >
          Iniciar sesión con Google
          </button>
        </form>
    </div>
);
};

export default Login;