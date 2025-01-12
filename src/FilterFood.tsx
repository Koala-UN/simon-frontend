import  { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaUtensils, FaGlassCheers, FaAppleAlt, FaLeaf, FaFish, FaBreadSlice } from "react-icons/fa";
import { TbSoupFilled, TbPizza } from "react-icons/tb";
import { GiMeat, GiHamburger, GiTacos, GiNoodles, GiBarbecue, GiFruitBowl } from "react-icons/gi";

function FilterFood({ setCategory }: { setCategory: (category: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>(""); // Track active category

  const categories = [
    { id: 1, name: "Entradas", icon: <FaUtensils /> },
    { id: 2, name: "Sopas y Cremas", icon: <TbSoupFilled /> },
    { id: 3, name: "Ensaladas", icon: <FaLeaf /> },
    { id: 4, name: "Platos Fuertes", icon: <GiMeat /> },
    { id: 5, name: "Guarniciones", icon: <FaBreadSlice /> },
    { id: 6, name: "Bebidas", icon: <FaGlassCheers /> },
    { id: 7, name: "Postres", icon: <FaAppleAlt /> },
    { id: 8, name: "Snacks", icon: <GiFruitBowl /> },
    { id: 9, name: "Sándwiches y Hamburguesas", icon: <GiHamburger /> },
    { id: 10, name: "Pastas", icon: <GiNoodles /> },
    { id: 11, name: "Pizzas", icon: <TbPizza /> },
    { id: 12, name: "Tacos y Antojitos", icon: <GiTacos /> },
    { id: 13, name: "Parrilladas y Asados", icon: <GiBarbecue /> },
    { id: 14, name: "Mariscos", icon: <FaFish /> },
    { id: 15, name: "Comida Saludable", icon: <FaLeaf /> },
  ];

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName); // Set the active category
    setCategory(categoryName); // Update the selected category in the parent
  };

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          size="sm"
          color="amber"
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${activeCategory === category.name
              ? "bg-orange-500 text-white" // Active state styles
              : "bg-orange-100 text-black hover:bg-orange-200"}`}
          onClick={() => handleCategoryClick(category.name)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <span className="text-xl">{category.icon}</span>
          <span className="font-medium">{category.name}</span>
        </Button>
      ))}
    </div>
  );
}

export default FilterFood;
