import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; 
export function InputDefault() {
  return (
    <div className="w-72 flex items-center relative mb-4">
      <MagnifyingGlassIcon
        className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
        />
      <Input  label="Search" className="pl-10 rounded-full border " />
    </div>
  );
}
