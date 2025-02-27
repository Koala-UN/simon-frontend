import { FaExternalLinkAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePayment } from "../utils/getContext";
import CheckinForOrder from "./CheckinForOrder";
import Modal from "./modal";


/**
 * Componente `OrderSummary` que muestra un resumen del pedido y permite realizar pagos con Mercado Pago.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.totalItems - Número total de elementos en el pedido.
 * @param {number} props.totalPrice - Precio total del pedido.
 * @param {Array} props.items - Array de objetos con los detalles de los platillos.
 * @param {number} props.mesaId - ID de la mesa.
 *
 * @returns {JSX.Element} El componente `OrderSummary`.
 */
function OrderSummary({ totalItems, totalPrice, items, mesaId }: { totalItems: number; totalPrice: number; items: { platilloId: number; cantidad: number }[], mesaId: number }) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showCheckin, setShowCheckin] = useState<boolean>(false);
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [nombreCliente, setNombreCliente] = useState<string>("");
  const { setPaymentId } = usePayment();

  useEffect(() => {
    console.log("Items del carrito:", items);
  }, [items]);

  // Crear preferencia de pago en Mercado Pago
  const createPreference = async (): Promise<string | undefined> => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/payment/create_preference", {
        title: "Resumen del Pedido",
        quantity: 1,
        unit_price: totalPrice,
      });
      console.log("Preferencia creada:", response.data.id);
      return response.data.id;
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      return undefined;
    }
  };

  // Manejar el flujo de pago
  const handlePay = async () => {
    setIsProcessing(true);

    const id = await createPreference();
    if (id) {
      setPaymentId(id); // Almacenar el ID del pago en el contexto
      window.open(
        `https://www.mercadopago.com.co/checkout/v1/redirect?preference-id=${id}`,
        "_blank"
      );
      setShowCheckin(true);
    } else {
      alert("Error al procesar el pago. Inténtalo de nuevo.");
    }

    setIsProcessing(false);
  };

  const handleOrderCreation = async () => {
    const orderDetails = {
      nombre_cliente: nombreCliente,
      mesaId: mesaId,
      platillos: items.map(item => ({ platilloId: item.platilloId, cantidad: item.cantidad }))
    };
    console.log("Pedido a crear:", JSON.stringify(orderDetails, null, 2)); // Imprimir el pedido a crear
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderDetails, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log("Pedido creado exitosamente:", response.data);
      alert("Pedido creado exitosamente, haz click en Aceptar para continuar");
      window.location.href = "/"; // Redirigir a la página principal
    } catch (error) {
      if ((error as Error).message) {
        console.error("Error al crear el pedido:", (error as Error).message);
      } else {
        console.error("Error al crear el pedido:", (error as Error).message);
      }
    }
  };

  const handleNameSubmit = (name: string) => {
    setNombreCliente(name);
    setShowNameModal(false);
    handleOrderCreation();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      {/* Número de elementos */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 font-medium">
          Número de elementos ({totalItems})
        </span>
        <span className="text-gray-700 font-semibold">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-2" />

      {/* Total */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700 font-bold text-lg">Total</span>
        <span className="text-gray-800 font-bold text-lg">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      {/* Botón de Pago */}
      <button
        onClick={handlePay}
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white font-bold text-sm rounded-full shadow-md hover:bg-orange-600 transition"
      >
        {isProcessing ? "Procesando..." : "Pagar pedido"}
        <FaExternalLinkAlt className="w-4 h-4" />
      </button>

      {/* Componente CheckinForOrder */}
      {showCheckin && (
        <div className="mt-4">
          <CheckinForOrder onSuccess={() => {
            console.log("Pago verificado exitosamente");
            setShowCheckin(false);
            setShowNameModal(true);
          }} />
        </div>
      )}

      {/* Modal para solicitar el nombre del cliente */}
      {showNameModal && (
        <Modal
          title="Ingrese su nombre"
          onClose={() => setShowNameModal(false)}
          onSubmit={handleNameSubmit}
        />
      )}
    </div>
  );
}

export default OrderSummary;