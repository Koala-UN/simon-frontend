import { Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-1/4 bg-blue-800 text-white p-4 min-h-screen">
      <Typography variant="h5" className="font-bold mb-6 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        Simon
      </Typography>
      <nav className="space-y-4">
        <div>
          <Typography variant="small" className="uppercase text-blue-300"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Services
          </Typography>
          <ul className="space-y-2 mt-2">
            <li onClick={() => navigate("/admin/reserve")} className="cursor-pointer hover:text-blue-300">
              Reservations
            </li>
            <li onClick={() => navigate("/admin/orders")} className="cursor-pointer hover:text-blue-300">
              Orders
            </li>
            <li onClick={() => navigate("/inventory")} className="cursor-pointer hover:text-blue-300">
              Inventory
            </li>
          </ul>
        </div>
        <Button size="sm" color="blue" className="w-full mt-6"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Log Out
        </Button>
      </nav>
    </div>
  );
}

export default Sidebar;
