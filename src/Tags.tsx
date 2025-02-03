import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function Tags({ onFilterChange }: { onFilterChange: (tags: string[]) => void }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [restaurantTags, setRestaurantTags] = useState([
    "Comida Rápida",
    "Casual Dining",
    "Fine Dining",
    "Cafetería",
    "Bar y Grill",
    "Pizzería",
    "Marisquería",
    "Buffet",
    "Restaurante Temático",
    "Food Truck",
    "Vegetariano/Vegano",
    "Asador/Parrilla",
    "Panadería y Repostería",
    "Cocina Internacional",
    "Cocina Regional",
  ]);

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const updatedTags = [tag, ...selectedTags];
      setSelectedTags(updatedTags);
      setRestaurantTags(restaurantTags.filter((t) => t !== tag));
      onFilterChange(updatedTags); // Notificar a SearchMenu del cambio
    }
  };

  const handleRemoveSelectedTag = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
    setRestaurantTags([...restaurantTags, tag]);
    onFilterChange(updatedTags); // Notificar a SearchMenu del cambio
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h2>

      {/* Categorías seleccionadas */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Seleccionados</h3>
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag, index) => (
            <Button
              key={index}
              size="sm"
              color="green"
              variant="outlined"
              className="text-xs font-medium flex items-center gap-2"
              onClick={() => handleRemoveSelectedTag(tag)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {tag}
              <XMarkIcon className="w-4 h-4" />
            </Button>
          ))}
          {selectedTags.length === 0 && (
            <p className="text-sm text-gray-500">Ninguna seleccionada.</p>
          )}
        </div>
      </div>

      {/* Categorías disponibles */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Disponibles</h3>
        <div className="flex flex-wrap gap-2">
          {restaurantTags.map((tag, index) => (
            <Button
              key={index}
              size="sm"
              color="blue"
              variant="outlined"
              className="text-xs font-medium"
              onClick={() => handleTagClick(tag)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tags;
