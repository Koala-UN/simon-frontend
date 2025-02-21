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
  className,
}: {
  price: string;
  name: string;
  photo: string;
  onClick?: () => void; // Optional click handler
  className?: string;
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
      className={`mt-4 w-64 cursor-pointer hover:shadow-md transition-shadow p-2 ${className}`}
      placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}    >
      <CardHeader color="blue-gray" className="relative h-40"    placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </CardHeader>
      <CardBody className="p-2"    placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
        <Typography variant="h6" color="blue-gray" className="mb-1 text-sm"    placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
          {name}
        </Typography>
        {/* Price Range Tag */}
        <div className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
          {price}
        </div>
      </CardBody>
    </Card>
  );
}
