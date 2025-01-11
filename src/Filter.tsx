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
          <Button>{sortOrder}</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => setSortOrder("A-Z")}>A-Z</MenuItem>
          <MenuItem onClick={() => setSortOrder("Z-A")}>Z-A</MenuItem>
          <MenuItem onClick={() => setSortOrder("Rating")}>Rating</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default Filter;
