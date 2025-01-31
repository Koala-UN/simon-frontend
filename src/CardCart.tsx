import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { FaTrashAlt } from "react-icons/fa";

export function CardCart({
  product,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image?: string;
    quantity: number;
  };
  onIncrement: (id: number) => void; // Callback for incrementing quantity
  onDecrement: (id: number) => void; // Callback for decrementing quantity
  onRemove: (id: number) => void; // Callback for removing item
}) {
  return (
    <Card className="w-full max-w-[48rem] flex-row items-center p-2"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      {/* Image Section */}
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-[5rem] h-[5rem] shrink-0 rounded-lg overflow-hidden"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <img
          src={product.image || "https://via.placeholder.com/100"}
          alt="product-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>

      {/* Details Section */}
      <CardBody className="flex-1 flex flex-col gap-1 px-2 py-1"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography variant="h6" color="blue-gray" className="text-sm font-semibold truncate"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {product.name}
        </Typography>
        <Typography color="gray" className="text-xs truncate" style={{ maxWidth: "200px" }}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {product.description}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="text-sm font-bold"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardBody>

      {/* Quantity Controls Section */}
      <div className="flex items-center gap-2 px-2">
        <Button
          size="sm"
          color="gray"
          className="rounded-full w-6 h-6 p-0 flex justify-center items-center"
          onClick={() => onDecrement(product.id)}
          disabled={product.quantity <= 1} // Disable if quantity is 1
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          {"<"}
        </Button>
        <Typography variant="h6" color="blue-gray" className="text-sm"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {product.quantity}
        </Typography>
        <Button
          size="sm"
          color="gray"
          className="rounded-full w-6 h-6 p-0 flex justify-center items-center"
          onClick={() => onIncrement(product.id)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          {">"}
        </Button>
      </div>

      {/* Trash Icon */}
      <Button
        size="sm"
        className="bg-transparent p-1 w-6 h-6 flex justify-center items-center rounded-full"
        onClick={() => onRemove(product.id)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
  <FaTrashAlt color="red " className="h-4 w-4" />
</Button>

    </Card>
  );
}
