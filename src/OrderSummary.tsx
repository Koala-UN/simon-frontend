
import { FaExternalLinkAlt } from "react-icons/fa"; // Import the external link icon

function OrderSummary({ totalItems, totalPrice }: { totalItems: number; totalPrice: number }) {
  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      {/* Number of Items */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 font-medium">Número de elementos ({totalItems})</span>
        <span className="text-gray-700 font-semibold">${totalPrice.toFixed(3)}</span>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-2" />

      {/* Total */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700 font-bold text-lg">Total</span>
        <span className="text-gray-800 font-bold text-lg">${totalPrice.toFixed(3)}</span>
      </div>

      {/* Pay Button */}
      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white font-bold text-sm rounded-full shadow-md hover:bg-orange-600 transition">
        Pagar pedido <FaExternalLinkAlt className="w-4 h-4" />
      </button>
    </div>
  );
}

export default OrderSummary;
