import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

function Filter({ setSortOrder,sortOrder }: { setSortOrder: (sortOrder: string) => void ;sortOrder:string}) {
  return (
    <div className="flex gap-2 mb-4">
      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <Button   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{sortOrder}</Button>
        </MenuHandler>
        <MenuList   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <MenuItem onClick={() => setSortOrder("A-Z")}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>A-Z</MenuItem>
          <MenuItem onClick={() => setSortOrder("Z-A")}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Z-A</MenuItem>
          <MenuItem onClick={() => setSortOrder("Rating")}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Rating</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default Filter;
