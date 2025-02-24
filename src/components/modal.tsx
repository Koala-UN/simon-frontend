import React, { useState } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, onSubmit }) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
    } else {
      alert("El nombre es obligatorio.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md text-center w-96">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingrese su nombre"
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Enviar
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;