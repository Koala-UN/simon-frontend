
import { CardDefault } from "./Card";
import { useNavigate } from "react-router-dom";

export function Matrix({
  restaurants,
}: {
  restaurants: { id: number; name: string; photo: string; price: string }[];
}) {
  // Split the restaurant data into rows of 4
  const rows = [];
  for (let i = 0; i < restaurants.length; i += 4) {
    rows.push(restaurants.slice(i, i + 4));
  }

  const navigate = useNavigate(); // Use React Router's navigate function

  const handleReserveClick = (restaurantId: number) => {
    navigate(`/reserve/${restaurantId}`); // Navigate to the Reserve page
  };

  return (
    <div className="restaurant-matrix">
      {rows.map((row, rowIndex) => (
        <div
          className="row"
          key={rowIndex}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px", // Spacing between cards
            marginBottom: "20px",
          }}
        >
          {row.map((restaurant) => (
            <CardDefault
              key={restaurant.id}
              name={restaurant.name}
              photo={restaurant.photo}
              price={restaurant.price}
              onClick={() => handleReserveClick(restaurant.id)} // Navigate to Reserve
            />
          ))}
        </div>
      ))}
    </div>
  );
}
