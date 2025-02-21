
import { CardCart } from "./CardCart";
import {CartItem} from "../types/interfaces";

interface CartList {
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
  cart: CartItem[];
}

function CardCartList({ cart , onIncrement, onDecrement, onRemove}: CartList) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Centered Title Section */}
      <h2 className="text-lg font-bold text-gray-800 text-center">Pedido Actual</h2>

      {/* Cart Items */}
      {cart.length > 0 ? (
        cart.map((product) => (
          <CardCart key={product.id} product={product} 
          onIncrement={onIncrement } onDecrement={onDecrement}
           onRemove={onRemove} />
        ))
      ) : (
        <p className="text-gray-500 text-center">Tu carrito está vacío.</p>
      )}
    </div>
  );
}

export default CardCartList;
