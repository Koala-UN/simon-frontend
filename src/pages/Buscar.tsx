import { useState, useEffect } from 'react';
import { CardDefault } from "../components/Card";
import { useNavigate } from "react-router-dom";
import { FormattedRestaurant } from "../types/interfaces";

interface PriceRange {
  min: number;
  max: number;
}

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(amount);
};


export function Matrix({
  restaurants,
}: {
  restaurants: FormattedRestaurant[];
}) {
  const navigate = useNavigate();
  const [priceRanges, setPriceRanges] = useState<Record<number, PriceRange>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [showMatrix, setShowMatrix] = useState(false);

  const fetchRestaurantPrices = async (restaurantId: number, retryCount = 0) => {
    try {
      setLoading(prev => ({ ...prev, [restaurantId]: true }));
      
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/dish/restaurant/${restaurantId}`;
      console.log(`Fetching prices for restaurant ${restaurantId} from:`, url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Data received for restaurant ${restaurantId}:`, data);

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid data format received');
      }

      const prices = data.data
        .map(dish => Number(dish.precio))
        .filter(price => !isNaN(price) && price > 0);

      if (prices.length === 0) {
        throw new Error('No valid prices found');
      }

      setPriceRanges(prev => ({
        ...prev,
        [restaurantId]: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        }
      }));

      setErrors(prev => ({ ...prev, [restaurantId]: '' }));

    } catch (error) {
      console.error(`Error fetching restaurant ${restaurantId}:`, error);
      
      if (retryCount < 2) {
        console.log(`Retrying fetch for restaurant ${restaurantId}...`);
        setTimeout(() => fetchRestaurantPrices(restaurantId, retryCount + 1), 1000);
        return;
      }
      
      setErrors(prev => ({
        ...prev,
        [restaurantId]: '-'
      }));
    } finally {
      setLoading(prev => ({ ...prev, [restaurantId]: false }));
    }
  };

  useEffect(() => {
    if (!restaurants || restaurants.length === 0) return;

    const loadData = async () => {
      setShowMatrix(false); // Reset showMatrix when loading new data
      
      // Fetch all restaurant prices
      const promises = restaurants.map(restaurant => {
        if (restaurant.id) {
          return fetchRestaurantPrices(restaurant.id);
        }
        return Promise.resolve();
      });

      // Wait for all prices to be fetched
      await Promise.all(promises);

      // Add 2 second delay before showing matrix
      setTimeout(() => {
        setShowMatrix(true);
      }, 3000);
    };

    loadData();
  }, [restaurants]);

  const handleReserveClick = (restaurantId: number) => {
    navigate(`/reserve/${restaurantId}`);
  };

  if (!showMatrix) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <h2 className="mt-4 text-xl font-semibold text-blue-600">Reservamos tu tiempo</h2>
          <p className="mt-2 text-gray-600">Preparando restaurantes...</p>
          <p className="text-sm text-gray-400">Por favor espere</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap w-full justify-center md:justify-start sm:w-full mb-72 md:mb-8">
      {restaurants.map((restaurant) => (
        <div className="w-full max-w-md min-w-80 md:max-w-xs sm:w-full" key={restaurant.id}>
          <div className="">
            <CardDefault
              name={restaurant.name}
              photo={restaurant.imageUrl}
              price={loading[restaurant.id] 
                ? "Cargando..."
                : errors[restaurant.id]
                ? errors[restaurant.id]
                : priceRanges[restaurant.id]
                ? `${formatPrice(priceRanges[restaurant.id].min)} - ${formatPrice(priceRanges[restaurant.id].max)}`
                : "Sin precios disponibles"}
              className="w-full h-full"
              onClick={() => handleReserveClick(restaurant.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}