


import { CardDefault } from "../components/Card";
import { useNavigate } from "react-router-dom";
import { FormattedRestaurant } from "../types/interfaces";

export function Matrix({
  restaurants,
}: {
  restaurants: FormattedRestaurant[];
}) {
  const navigate = useNavigate();

  const handleReserveClick = (restaurantId: number) => {
    navigate(`/reserve/${restaurantId}`);
  };

  return (
    <div className="flex flex-wrap  w-full justify-center md:justify-start sm:w-full mb-72 md:mb-8">
      {restaurants.map((restaurant) => (
      <div className="w-full max-w-md min-w-80 md:max-w-xs sm:w-full" key={restaurant.id}>
        <div className="">
        <CardDefault
          name={restaurant.name}
          photo={restaurant.imageUrl}
          price={"$$"}
          className="w-full h-full"
          onClick={() => handleReserveClick(restaurant.id)}
        />
        </div>
      </div>
      ))}
    </div>
  );
}