import React, { useState } from "react";
import axios from "axios";
import { usePayment, useAuth } from "../utils/getContext";
import { useNavigate } from "react-router-dom";

const CheckinForOrder = ({ onSuccess }: { onSuccess: () => void }) => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { paymentId } = usePayment();
  const { setIsLoading } = useAuth();
  const navigate = useNavigate();
  const [manualPaymentId, setManualPaymentId] = useState<string>(paymentId);

  const verifyPayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/v1/payments/${manualPaymentId}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_MERCADO_PAGO}`,
          },
        }
      );
      setPaymentStatus(response.data.status);

      if (response.data.status === "approved") {
        onSuccess();
        console.log("Pedido creado exitosamente");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setPaymentStatus("error");
      setErrorMessage("Error verifying payment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setPaymentStatus(null);
    setErrorMessage("");
    setManualPaymentId("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md text-center w-96">
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
        <button
          onClick={handleCancel}
          className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Cancelar
        </button>
        {paymentStatus && (
          <p className="text-3xl font-bold mb-4">
            {paymentStatus === "approved" ? "Pago exitoso" : "Error en el pago"}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CheckinForOrder;
