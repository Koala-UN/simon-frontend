import "./product.css";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";

initMercadoPago("APP_USR-86d3971d-e212-4e18-b5f7-a28c98c8a770");

const Product = () => {
  const dish = {
    title: "Orden total",
    quantity: 1,
    unit_price: 2500,
  };


  const createPreference = async () => {
    try {
      const response = await axios.post("https://simon-backend.onrender.com/api/payment/create_preference", {
        title: dish.title,
        quantity: dish.quantity,
        unit_price: dish.unit_price,
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      // Redirigir directamente al flujo de pago de Mercado Pago
      window.open(`https://www.mercadopago.com.co/checkout/v1/redirect?preference-id=${id}`, "_blank");
    }
  };

  return (
    <div className="card-product-container">
      <div className="card-product">
        <div className="card">
          <img
            src="https://github.com/Koala-UN/simon-backend/blob/development/assets/img/dish/Pizzas.jpg?raw=true"
            alt="Product Image"
          />
          <h3>{dish.title}</h3>
          <p>{dish.quantity} unidades</p>
          <p className="price">{dish.unit_price * dish.quantity} $</p>
          <button onClick={handleBuy}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
