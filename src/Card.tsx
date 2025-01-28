import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function CardDefault({
  price,
  name,
  photo,
  onClick,
}: {
  price: string;
  name: string;
  photo: string;
  onClick?: () => void; // Optional click handler
}) {
  const handleCardClick = () => {
    console.log(`${name} card clicked`);
    if (onClick) {
      onClick(); // Trigger parent click handler if provided
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      className="mt-6 w-80 cursor-pointer hover:shadow-lg transition-shadow"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <CardHeader color="blue-gray" className="relative h-56"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </CardHeader>
      <CardBody   placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
  <Typography variant="h5" color="blue-gray" className="mb-2"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    {name}
  </Typography>
  {/* Price Range Tag */}
  <div className="inline-block bg-green-200 text-green-800 text-sm px-2 py-1 rounded-full font-semibold">
    {price}
  </div>
</CardBody>

    </Card>
  );
}
