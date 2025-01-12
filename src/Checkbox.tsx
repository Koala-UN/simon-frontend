import { Checkbox } from "@material-tailwind/react";
 
export function CheckboxDefault({ label }: { label: string }) {
  return (
  <Checkbox  label={label} defaultChecked onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
  );
}