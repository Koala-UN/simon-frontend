import React, { useState } from "react";
import axios from "axios";
import { usePayment } from "../utils/getContext";

const Checkin = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const { paymentId, setPaymentId } = usePayment();
  const [manualPaymentId, setManualPaymentId] = useState<string>(paymentId);

  const verifyPayment = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify?paymentId=${manualPaymentId}`);
      setPaymentStatus(response.data.status);
    } catch (error) {
      console.error("Error verifying payment:", error);
      setPaymentStatus("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verificar Pago</h1>
        <input
          type="text"
          value={manualPaymentId}
          onChange={(e) => setManualPaymentId(e.target.value)}
          placeholder="Ingrese el ID del pago"
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <button
          onClick={verifyPayment}
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Verificar
        </button>
        {paymentStatus && (
          <p className="text-3xl font-bold mb-4">
            {paymentStatus === "success" ? "Pago exitoso" : "Error en el pago"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkin;
