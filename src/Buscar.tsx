import { CardDefault } from "./Card";
import { useNavigate } from "react-router-dom";

export function Matrix({
  restaurants,
}: {
  restaurants: { id: number; name: string; photo: string; price: string }[];
}) {
  const navigate = useNavigate();

  const handleReserveClick = (restaurantId: number) => {
    navigate(`/reserve/${restaurantId}`);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {restaurants.map((restaurant) => (
          <div className="flex justify-center">
            <CardDefault
              key={restaurant.id}
              name={restaurant.name}
              photo={restaurant.photo}
              price={"$$"}
              className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3"
              onClick={() => handleReserveClick(restaurant.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}