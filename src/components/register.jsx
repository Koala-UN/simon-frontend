import React, { useState } from "react";

const Register = () => {
    const defaultJsonInput = `{
    "restaurantData": {
      "nombre": "withcat",
      "correo": "withcat@restaurante.com",
          "contrasena": "hola123",
      "telefono": "78910434",
      "idTransaccional": "trans967",
      "capacidadReservas": 34,
          "descripcion":"hola mundo, esto es un restaurante super  asquerosamente caro, ni lo visiten si son pobres"
    },
    "addressData": {
      "direccion": "Calle 45 #65-67"
    },
    "cityId": 2
  }`;
  const [jsonInput, setJsonInput] = useState(defaultJsonInput);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/restaurant/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(JSON.parse(jsonInput)),
        }
      );
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleRegister = () => {
    // Implement Google register logic here
    console.log("Register with Google clicked");

    try {
        window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_API_KEY;
      } catch (error) {
        console.error('Error en el inicio de sesión con Google:', error);
      }
  };

  return (
    <div className="d-flex justify-content-center  vh-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded"
        style={{ width: "80%" }}
      >
        <h2 className="mb-4">Register</h2>
        <div className="form-group">
          <label>JSON Input:</label>
          <textarea
            className="form-control"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="20"
            cols="80"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-block mt-2"
          style={{ backgroundColor: "red", fontWeight: "bold" }}
          onClick={handleGoogleRegister}
        >
          Register with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
