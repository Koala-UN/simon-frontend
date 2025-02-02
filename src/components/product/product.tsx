import "./product.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Checkin from "./checkin";
import { usePayment } from "./context/paymentProvider";

initMercadoPago("APP_USR-86d3971d-e212-4e18-b5f7-a28c98c8a770");

interface Order {
  title: string;
  quantity: number;
  unit_price: number;
}

interface PreferenceResponse {
  id: string;
}

/**
 * Componente `Product` que representa un producto y permite realizar una compra a través de Mercado Pago.
 * 
 * @returns {JSX.Element} El componente de producto.
 * 
 * @component
 * 
 * @example
 * <Product />
 * 
 * @description
 * Este componente permite a los usuarios comprar un producto utilizando Mercado Pago. 
 * Muestra la información del producto, un botón para iniciar el proceso de compra y un campo de entrada para ingresar manualmente el ID del pago.
 * 
 * @hook
 * - `useState<boolean>`: Maneja el estado de `isProcessing` y `showCheckin`.
 * - `usePayment`: Utiliza el contexto para gestionar `paymentId`.
 * - `useEffect`: Muestra el componente `Checkin` solo cuando se ingresa un ID manualmente.
 * 
 * @function createPreference
 * Crea una preferencia de pago en Mercado Pago.
 * 
 * @async
 * @returns {Promise<string | undefined>} El ID de la preferencia creada.
 * 
 * @function handleBuy
 * Maneja el proceso de compra, creando una preferencia y abriendo la ventana de pago de Mercado Pago.
 * 
 * @returns {Promise<void>}
 * 
 * @prop {boolean} isProcessing - Indica si el proceso de compra está en curso.
 * @prop {boolean} showCheckin - Indica si se debe mostrar el componente `Checkin`.
 * @prop {string} paymentId - ID del pago gestionado por el contexto `usePayment`.
 * @prop {Order} order - Información del pedido, incluyendo título, cantidad y precio unitario.
 * 
 * @returns {JSX.Element} El componente de producto.
 */
const Product: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showCheckin, setShowCheckin] = useState<boolean>(false);
  const { paymentId, setPaymentId } = usePayment(); // Usamos el contexto para gestionar paymentId

  const order: Order = {
    title: "Orden total",
    quantity: 1,
    unit_price: 1000,
  };

  // Crear una preferencia en Mercado Pago
  const createPreference = async (): Promise<string | undefined> => {
    try {
      const response = await axios.post<PreferenceResponse>(
        "https://simon-backend.onrender.com/api/payment/create_preference",
        {
          title: order.title,
          quantity: order.quantity,
          unit_price: order.unit_price,
        }
      );
      console.log("Preferencia creada====>", response);
      return response.data.id;
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };

  // Manejo de la compra
  const handleBuy = async () => {
    setIsProcessing(true);
    setShowCheckin(false);

    const id = await createPreference();
    if (id) {
      window.open(
        `https://www.mercadopago.com.co/checkout/v1/redirect?preference-id=${id}`,
        "_blank"
      );
    } else {
      setIsProcessing(false);
    }
  };

  // useEffect para mostrar Checkin solo cuando se ingrese un ID manualmente
  useEffect(() => {
    setShowCheckin(paymentId.trim() !== "");
  }, [paymentId]);

  return (
    <div className="card-product-container">
      <div className="card-product">
        <div className="card">
          <img
            src="https://github.com/Koala-UN/simon-backend/blob/development/assets/img/dish/Pizzas.jpg?raw=true"
            alt="Product Image"
          />
          <h3>{order.title}</h3>
          <p>{order.quantity} unidades</p>
          <p className="price">{order.unit_price * order.quantity} $</p>

          {/* Botón para comprar con Mercado Pago */}
          {!isProcessing && (
            <button onClick={handleBuy} disabled={isProcessing}>
              {isProcessing ? "Procesando..." : "Comprar"}
            </button>
          )}

          {/* Input para ingresar manualmente el ID del pago */}
          {isProcessing && (
            <div className="manual-payment">
              <input
                type="text"
                placeholder="Ingrese el ID del pago"
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
              />
            </div>
          )}
          {/* Mostrar Checkin cuando se ingresa un ID manualmente */}
          {showCheckin && <Checkin />}
        </div>
      </div>
    </div>
  );
};

export default Product;
