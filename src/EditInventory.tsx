import React, { useState } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { FaTrashAlt, FaPen } from "react-icons/fa";

function Inventory() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Italy Pizza",
      description: "Extra cheese and topping",
      price: 28300,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Combo Plate",
      description: "Extra cheese and topping",
      price: 10300,
      quantity: 10,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Spanish Rice",
      description: "Extra garlic",
      price: 45300,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    cost: "",
    amount: "",
    image: "",
  });

  const handleIncrement = (id: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddProduct = () => {
    const newId = menuItems.length + 1;
    setMenuItems([
      ...menuItems,
      {
        id: newId,
        name: newProduct.name,
        description: "New Product",
        price: parseInt(newProduct.cost),
        quantity: parseInt(newProduct.amount),
        image: "https://via.placeholder.com/80",
      },
    ]);
    setNewProduct({ name: "", cost: "", amount: "", image: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[80%] max-w-1xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex">
          {/* Left Panel */}
          <div className="w-2/3 p-4">
            <Typography variant="h5" className="font-bold mb-4 text-center">
              Inventory
            </Typography>
            <Typography variant="h6" className="mb-2 text-center">
              Menu
            </Typography>
            <div className="border-b border-gray-300 my-4"></div> {/* Line between sections */}
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              {menuItems.map((item) => (
                <Card
                  key={item.id}
                  className="w-128 flex-row items-center p-2 shadow-sm border rounded-lg"
                >
                  {/* Image Section */}
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-[4rem] h-[4rem] shrink-0 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>

                  {/* Details Section */}
                  <CardBody className="flex-1 flex flex-col gap-1 px-2 py-1">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-xs font-semibold truncate"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      color="gray"
                      className="text-xs truncate"
                      style={{ maxWidth: "200px" }}
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-xs font-bold"
                    >
                      ${item.price.toLocaleString()} COP
                    </Typography>
                  </CardBody>

                  {/* Quantity Controls Section */}
                  <div className="flex items-center gap-2 px-2">
                    <Button
                      size="sm"
                      color="gray"
                      className="rounded-full w-6 h-6 p-0 flex justify-center items-center"
                      onClick={() => handleDecrement(item.id)}
                      disabled={item.quantity <= 1} // Disable if quantity is 1
                    >
                      {"<"}
                    </Button>
                    <Typography variant="h6" color="blue-gray" className="text-xs">
                      {item.quantity}
                    </Typography>
                    <Button
                      size="sm"
                      color="gray"
                      className="rounded-full w-6 h-6 p-0 flex justify-center items-center"
                      onClick={() => handleIncrement(item.id)}
                    >
                      {">"}
                    </Button>
                  </div>

                  {/* Actions Section */}
                  <div className="flex items-center space-x-2 ml-4">
                    <FaPen className="text-gray-500 cursor-pointer" />
                    <Button
                      size="sm"
                      className="bg-transparent p-1 w-6 h-6 flex justify-center items-center rounded-full"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrashAlt color="red" className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/3 p-4 border-l">
            <Typography variant="h6" className="mb-4 text-center">
              Create product
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography className="text-sm font-semibold">Name</Typography>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <Typography className="text-sm font-semibold">Cost</Typography>
                <input
                  type="number"
                  value={newProduct.cost}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, cost: e.target.value })
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <Typography className="text-sm font-semibold">Amount</Typography>
                <input
                  type="number"
                  value={newProduct.amount}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, amount: e.target.value })
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <Button
                size="sm"
                color="blue"
                className="w-full mt-4"
                onClick={handleAddProduct}
              >
                Add Product
              </Button>

              {/* File Upload Section */}
              <div className="mt-6 flex flex-col items-center">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex items-center gap-2 border border-gray-300 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-6 h-6 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">
                    Upload Image
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log("Uploaded file:", file.name);
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
