import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface TagsProps {
  onFilterChange: (tags: string[]) => void;
}

function Tags({ onFilterChange }: TagsProps) {
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  interface TagClickHandler {
    (tag: string): void;
  }

  const handleTagClick: TagClickHandler = (tag) => {
    if (!selectedTags.includes(tag)) {
      const updatedTags = [tag, ...selectedTags];
      setSelectedTags(updatedTags);
      setRestaurantTags(restaurantTags.filter((t) => t !== tag));
      onFilterChange(updatedTags);
    }
  };

  interface RemoveTagHandler {
    (tag: string): void;
  }

  const handleRemoveSelectedTag: RemoveTagHandler = (tag) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
    setRestaurantTags([...restaurantTags, tag]);
    onFilterChange(updatedTags);
  };

  return (
    <>
      {/* Sidebar Button for Mobile */}
      <button
        className="md:hidden fixed top-1/2 left-4 z-50 p-3 bg-orange-600 text-white rounded-full shadow-lg transform -translate-y-1/2"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 p-4
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-72`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Categorías</h2>
          <button
            className="md:hidden p-1 text-gray-500 hover:text-gray-800"
            onClick={() => setIsSidebarOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Selected Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Seleccionados</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag, index) => (
                <Button
                  key={index}
                  size="sm"
                  color="green"
                  variant="outlined"
                  className="text-xs font-medium flex items-center gap-2"
                  onClick={() => handleRemoveSelectedTag(tag)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  {tag}
                  <XMarkIcon className="w-4 h-4" />
                </Button>
              ))
            ) : (
              <p className="text-sm text-gray-500">Ninguna seleccionada.</p>
            )}
          </div>
        </div>

        {/* Available Categories */}
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
                onClick={() => handleTagClick(tag)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Dark Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Tags;
