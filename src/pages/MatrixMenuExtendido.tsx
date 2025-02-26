import { Dish } from "../types/interfaces";

function MatrixMenuExtendido({
  dishes,
  onAddToCart,
}: {
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          className="p-4 border rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onAddToCart(dish)}
        >
          {/* Image */}
          <img
            src={dish.imageUrl || "https://via.placeholder.com/150"}
            alt={dish.nombre}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />

          {/* Name and Stock */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg text-gray-800 truncate">{dish.nombre}</h3>
            <div className="flex items-center">
              <span className="text-yellow-500 text-sm">⭐</span>
              <span className="text-sm text-gray-600 ml-1">{dish.rating || "4.9"}</span>
            </div>
          </div>
          <p className="text-sm text-green-600 mb-2">{dish.existencias || "In Stock"}</p>

          {/* Price */}
          <p className="text-base font-bold text-orange-500">${parseFloat(dish.precio).toFixed(2)}</p>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-2 truncate">{dish.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

export default MatrixMenuExtendido;
