import { useState } from "react";
////import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bglogin.png";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    telefono: "",
    capacidadReservas: "",
    descripcion: "",
    direccion: "",
    cityId: "",
    fotoPerfil: null as File | null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  // const navigate = useNavigate();

  const cities = [
    { id: 1, name: "Bogotá" },
    { id: 2, name: "Cúcuta" },
    { id: 3, name: "Ibagué" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setPreviewImage(fileList[0]);
      setFormData({ ...formData, fotoPerfil: fileList[0] });
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      const restaurantData = {
        nombre: formData.nombre,
        correo: formData.correo,
        contrasena: formData.contrasena,
        telefono: formData.telefono,
        capacidadReservas: parseInt(formData.capacidadReservas),
        descripcion: formData.descripcion,
      };
      const addressData = {
        direccion: formData.direccion,
      };
      const suscriptionData = {
        tipo: null,
      };
      formDataToSend.append("restaurantData", JSON.stringify(restaurantData));
      formDataToSend.append("addressData", JSON.stringify(addressData));
      formDataToSend.append("suscriptionData", JSON.stringify(suscriptionData));
      formDataToSend.append("cityId", formData.cityId);
      if (formData.fotoPerfil) {
        formDataToSend.append("fotoPerfil", formData.fotoPerfil);
      }

      console.log("Datos a enviar:", {
        nombre: formData.nombre,
        correo: formData.correo,
        contrasena: formData.contrasena,
        telefono: formData.telefono,
        capacidadReservas: formData.capacidadReservas,
        descripcion: formData.descripcion,
        direccion: formData.direccion,
        cityId: formData.cityId,
        fotoPerfil: formData.fotoPerfil,
      });

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "api/restaurant/register", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registro exitoso:", result);
        window.location.href = "/login";
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
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md my-8">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Registro de Restaurante
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto de Perfil
            </label>
            {previewImage && (
              <div className="flex justify-center mb-4">
              <img
                src={URL.createObjectURL(previewImage)}
                alt="Vista previa de la foto de perfil"
                className="w-32 h-32 object-cover rounded-full shadow-md"
              />
              </div>
            )}
            <div className="flex justify-center">
              <label className="w-full flex flex-col items-center px-4 py-1 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                <svg className="w-8 h-8 py-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L10 10.586 4.707 5.293a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
                </svg>
                <span className="my-1 text-base leading-normal">Selecciona una foto</span>
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacidad de Reservas
            </label>
            <input
              type="number"
              name="capacidadReservas"
              value={formData.capacidadReservas}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad
            </label>
            <select
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="" disabled>
                Selecciona una ciudad
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Al continuar aceptas nuestros{" "}
          <a href="/terms-and-conditions" className="text-blue-500 hover:underline">
            términos y condiciones
          </a>{" "}
          y el{" "}
          <a href="/data-privacy" className="text-blue-500 hover:underline">
            tratamiento de datos
          </a>.
        </p>
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-500 font-medium hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;