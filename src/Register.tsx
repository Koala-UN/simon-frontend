import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    telefono: "",
    idTransaccional: "",
    capacidadReservas: "",
    descripcion: "",
    direccion: "",
    cityId: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {4000
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/restaurant/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantData: {
            nombre: formData.nombre,
            correo: formData.correo,
            contrasena: formData.contrasena,
            telefono: formData.telefono,
            idTransaccional: formData.idTransaccional,
            capacidadReservas: parseInt(formData.capacidadReservas, 10),
            descripcion: formData.descripcion,
          },
          addressData: {
            direccion: formData.direccion,
          },
          cityId: parseInt(formData.cityId, 10),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registro exitoso:", result);
        navigate("/login"); // Redirigir al inicio de sesión
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrar el restaurante");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setErrorMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-lg font-bold text-center mb-4">Registro de Restaurante</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ID Transaccional</label>
            <input
              type="text"
              name="idTransaccional"
              value={formData.idTransaccional}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Capacidad de Reservas</label>
            <input
              type="number"
              name="capacidadReservas"
              value={formData.capacidadReservas}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">City ID</label>
            <input
              type="number"
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
