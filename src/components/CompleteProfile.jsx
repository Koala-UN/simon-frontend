import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para enviar los datos adicionales al backend
      navigate('/protected');
    } catch (error) {
      console.error('Error al completar el perfil:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <div>
        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">Completar Perfil</button>
    </form>
  );
};

export default CompleteProfile;