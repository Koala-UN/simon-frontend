import { useState } from "react";
// ////import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/getContext";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const LoginForm = () => {
  const {  login, setIsLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    const { success, message } = await login(email, password);

    if (success) {
      //navigate("/dashboard");
      console.log("Registro exitoso: datos: ", message, " y success: ", success);

      //window.location.href = "/";
    } else {
      setIsLoading(false);
      setErrorMessage(message);
      
    }
   // setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      window.location.href = import.meta.env.VITE_BACKEND_URL+"/api/restaurant/auth/google";
    } catch (error) {
      console.error('Error en el inicio de sesión con Google:', error);
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md"  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
      {/* <h2 className="text-lg font-semibold text-center text-black mb-3 ">
          Inicia sesión
        </h2> */}

<div className="text-lg font-semibold rounded-t-lg text-center py-4 bg-cyan-800 mb-3 ">
<Typography variant="h4" color="white" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
        Inicia sesión
        </Typography>
        </div>
        

      <CardBody  placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
        <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Correo electrónico
          </label>
          <input
          type="email"
          id="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Contraseña
          </label>
          <input
          type="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition shadow-lg mb-4"
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition shadow-lg"
          onClick={handleGoogleLogin}
        >
          Iniciar sesión con Google
        </button>
        </form>
        <p className="text-center text-sm text-black mt-4">
        <a href="/recover-password" className="text-blue-500 font-medium hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
        </p>
        <p className="text-center text-sm text-black mt-4">
        ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-500 font-medium hover:underline">
              Regístrate
            </a>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;
