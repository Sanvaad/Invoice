import React from "react";
import { v4 as uuidv4 } from "uuid";

const AddItemBtn = ({ setItems, items }) => {
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
        id: uuidv4(),
      },
    ]);
  };

  return (
    <button
      type="button"
      onClick={handleAddItem}
      className="my-8 bg-[#252945] hover:bg-[#1e2139] text-white font-semibold text-center p-4 w-full rounded-3xl"
    >
      + Add New Item
    </button>
  );
};

export default AddItemBtn;
