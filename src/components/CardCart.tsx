import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { FaTrashAlt } from "react-icons/fa";

export function CardCart({
  product,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const [price, setPrice] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);

  console.log("Rendering CardCart with product:", product);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        console.log(`Fetching price for product ID: ${product.id}`);
        const response = await fetch(`https://simon-app-614942625022.southamerica-east1.run.app/api/dish/${product.id}`);
        const result = await response.json();
        console.log("Fetched data:", result);

        if (result.status === 'success' && result.data) {
          const fetchedPrice = parseFloat(result.data.precio); // Convert string to number
          setPrice(isNaN(fetchedPrice) ? null : fetchedPrice);
          setImage(result.data.imageUrl || null);
        } else {
          console.error('Unexpected API response:', result);
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    fetchPrice();
  }, [product.id]);

  return (
    <Card className="w-full max-w-[48rem] flex-row items-center p-2">
      {/* Image Section */}
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-[5rem] h-[5rem] shrink-0 rounded-lg overflow-hidden"
      >
        <img
          src={image || product.image || "https://via.placeholder.com/100"}
          alt="product-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>

      {/* Details Section */}
      <CardBody className="flex-1 flex flex-col gap-1 px-2 py-1">
        <Typography variant="h6" color="blue-gray" className="text-sm font-semibold truncate">
          {product.nombre}
        </Typography>
        <Typography color="gray" className="text-xs truncate" style={{ maxWidth: "200px" }}>
          {product.descripcion}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="text-sm font-bold">
          {price !== null ? `$${price.toFixed(2)}` : 'Loading price...'}
        </Typography>
      </CardBody>

      {/* Quantity Controls Section */}
      <div className="flex items-center gap-2 px-2">
        <Button
          size="sm"
          color="gray"
          className="rounded-full w-6 h-6 p-0 flex justify-center items-center"
          onClick={() => onDecrement(product.id)}
          disabled={product.quantity <= 1}
        >
          {"<"}
        </Button>
        <Typography variant="h6" color="blue-gray" className="text-sm">
          {product.quantity}
        </Typography>
        <Button
          size="sm"
          color="gray"
          className="rounded-full w-6 h-6 p-0 flex justify-center items-center"
          onClick={() => onIncrement(product.id)}
        >
          {">"}
        </Button>
      </div>

      {/* Trash Icon */}
      <Button
        size="sm"
        className="bg-transparent p-1 w-6 h-6 flex justify-center items-center rounded-full"
        onClick={() => onRemove(product.id)}
      >
        <FaTrashAlt color="red" className="h-4 w-4" />
      </Button>
    </Card>
  );
}
