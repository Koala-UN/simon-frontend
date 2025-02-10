import  { useState } from "react";

const RecoverPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/restaurant/rec-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email }),
      });

      if (response.ok) {
        setMessage("Correo de recuperación enviado exitosamente. Revisa tu bandeja de entrada.");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al enviar el correo de recuperación.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex justify-center items-center h-auto">
      <div className="bg-white p-4 rounded-xl shadow-md w-72">
        <h2 className="text-lg font-semibold text-center text-black mb-3">
          Recuperación de Contraseña
        </h2>
        {message && <p className="text-green-500 text-center mb-3">{message}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="my-2 w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            Enviar Correo de Recuperación
          </button>
        </form>
        <p className="text-center text-xs text-black mt-3">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-500 font-medium hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RecoverPasswordForm;
