import { Outlet } from "react-router-dom";
import Header from "./Header";
import InventoryBar from "./InventoryBar";

export default function Layout({
  inventory,
  selectedItem,
  setSelectedItem,
  isScored,
  open,
  setOpen,
  autoStep,
  toggleAutoStep,
  setAutoStep,
  len,
}) {
  return (
    <>
      <Header
        setOpen={setOpen}
        autoStep={autoStep}
        toggleAutoStep={toggleAutoStep}
        len={len}
      />
      <InventoryBar
        inventory={inventory}
        open={open}
        setOpen={setOpen}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setAutoStep={setAutoStep}
        isScored={isScored}
      />
      <Outlet />
    </>
  );
}
