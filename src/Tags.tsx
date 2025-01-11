import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Import the X icon

function Tags() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [restaurantTags, setRestaurantTags] = useState([
    "Fast Food",
    "Fine Dining",
    "Casual Dining",
    "Café",
    "Buffet",
    "Food Truck",
  ]);

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([tag, ...selectedTags]);
      setRestaurantTags(restaurantTags.filter((t) => t !== tag));
    }
  };

  const handleRemoveSelectedTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    setRestaurantTags([...restaurantTags, tag]);
  };

  return (
    <div className="w-48 p-4">
      <h2 className="text-lg font-bold mb-4">Tags</h2>

      {/* Selected Tags */}
      <div className="mb-4 flex flex-col gap-2">
        {selectedTags.map((tag, index) => (
          <Button
            key={index}
            size="sm"
            color="black"
            variant="outlined"
            className="w-full text-xs font-medium flex justify-between items-center"
            onClick={() => handleRemoveSelectedTag(tag)}
          >
            <span>{tag}</span>
            <XMarkIcon className="w-5 h-5" />
          </Button>
        ))}
      </div>

      {/* Available Tags */}
      <div className="flex flex-col gap-2">
        {restaurantTags.map((tag, index) => (
          <Button
            key={index}
            size="sm"
            color="blue-gray"
            variant="outlined"
            className="w-full text-xs justify-between font-medium"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Tags;
