import React, { useState } from "react";
import axios from "axios";
import "./product.css";
import { usePayment } from "./context/paymentProvider";

/**
 * Componente Checkin.
 * 
 * Este componente permite verificar un pago enviando un webhook a un servidor.
 * 
 * @returns {JSX.Element} El componente de verificación de pago.
 * 
 * @component
 * 
 * @example
 * <Checkin />
 * 
 * @remarks
 * Utiliza el contexto de `usePayment` para obtener el ID del pago.
 * 
 * @function
 * @name Checkin
 * 
 * @description
 * - `paymentId`: ID del pago obtenido del contexto `usePayment`.
 * - `responseMessage`: Mensaje de respuesta del servidor.
 * - `loading`: Estado de carga mientras se envía el webhook.
 * - `verified`: Estado de verificación del pago (null: sin verificación, true: éxito, false: error).
 * 
 * @async
 * @function
 * @name sendWebhook
 * 
 * @description
 * Función asíncrona que envía un webhook al servidor para verificar el pago.
 * 
 * @throws {Error} Si el pago no se realizó o el ID es incorrecto.
 * 
 * @returns {Promise<void>} No retorna ningún valor.
 * 
 * @example
 * sendWebhook();
 * 
 * @remarks
 * - Muestra un mensaje de éxito o error basado en la respuesta del servidor.
 * - Actualiza los estados `responseMessage`, `loading` y `verified` según corresponda.
 */
const Checkin: React.FC = () => {
  const { paymentId } = usePayment(); // Obtener el ID del contexto
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean | null>(null); // null: sin verificación, true: éxito, false: error

  const sendWebhook = async () => {
    setLoading(true);
    setResponseMessage(null);
    setVerified(null);

    try {
      console.log("ID recibido=====>", paymentId);
      const response = await axios.post("https://simon-backend.onrender.com/api/payment/webhooks", {
        data: { id: paymentId },
      });

      if (response.data.status === 200) {
        setResponseMessage("Compra verificada ✅");
        setVerified(true);
        alert("Compra verificada ✅");
      } else {
        throw new Error("Pago no realizado o ID incorrecto.");
      }
    } catch (error) {
      console.error("Error al enviar el webhook:", error);
      setResponseMessage("❌ Transacción incorrecta: Pago no realizado o ID inválido.");
      setVerified(false);
      alert("❌ Transacción incorrecta: Pago no realizado o ID inválido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-product-container">
      <div className="card-product">
        <button onClick={sendWebhook} disabled={loading}>
          {loading ? "Enviando..." : "Verificar Pago"}
        </button>

        {verified !== null && (
          <p className={`verified-label ${verified ? "success" : "error"}`}>
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkin;
