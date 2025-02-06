import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const loginResponse = await fetch("http://localhost:5000/api/restaurant/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          contrasena: password,
        }),
        credentials: "include", // Para manejar cookies
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const authStatusResponse = await fetch("http://localhost:5000/api/restaurant/auth-status", {
        method: "GET",
        credentials: "include", // Para enviar cookies
      });

      const authStatusData = await authStatusResponse.json();

      if (authStatusData.authenticated) {
        setIsAuthenticated(true);
         // Actualiza el estado global de autenticación
        

        navigate("/admin/reserve"); // Redirigir al dashboard
         window.location.reload();
      } else {
        setErrorMessage("Autenticación fallida.");
      }
    } catch (error) {
      console.error("Error en el proceso de inicio de sesión:", error);
      setErrorMessage("Error al iniciar sesión.");
    }
  };

  return (
    <div className="flex justify-center items-center h-auto">
      <div className="bg-white p-4 rounded-xl shadow-md w-72">
        <h2 className="text-lg font-semibold text-center text-black mb-3">
          Inicia sesión
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="block text-xs font-medium text-black mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-xs font-medium text-black mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}
          <button
            type="submit"
            className="my-2 w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-center text-xs text-black mt-3">
          <a href="/recover-password" className="text-blue-500 font-medium hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
        <p className="text-center text-xs text-black mt-3">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500 font-medium hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
