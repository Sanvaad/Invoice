import React from "react";
import bin from "../images/bin.svg";

const AddItem = ({ items, setItems, index, error }) => {
  const handleItemChange = (e, field) => {
    let value = e.target.value;

    if (field === "quantity" || field === "price") {
      value = Number(value);
      if (value === 0) {
        value = "";
      }
    }

    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = {
          ...item,
          [field]: value,
        };
        updatedItem.total = updatedItem.quantity * updatedItem.price;
        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
  };

  const handleDeleteItem = () => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 items-center">
        <div className="flex flex-col mb-3">
          <label htmlFor={`name-${index}`}>Item Name</label>
          <input
            type="text"
            id={`name-${index}`}
            value={items[index].name}
            onChange={(e) => handleItemChange(e, "name")}
            className="p-3 border-gray-300 dark:bg-[#1f2139] border py-2 w-[12rem] rounded-lg"
          />
          {error[`items.${index}.name`] && (
            <p className="text-red-500 text-sm">
              {error[`items.${index}.name`]}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor={`quantity-${index}`}>Qty.</label>
          <input
            type="number"
            id={`quantity-${index}`}
            value={items[index].quantity}
            onChange={(e) => handleItemChange(e, "quantity")}
            className="p-3 border-gray-300 dark:bg-[#1f2139] border py-2 w-[5rem] rounded-lg"
          />
          {error[`items.${index}.quantity`] && (
            <p className="text-red-500 text-sm">
              {error[`items.${index}.quantity`]}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor={`price-${index}`}>Price</label>
          <input
            type="number"
            id={`price-${index}`}
            value={items[index].price}
            onChange={(e) => handleItemChange(e, "price")}
            className="p-3 border-gray-300 dark:bg-[#1f2139] border py-2 w-[5rem] rounded-lg"
          />
          {error[`items.${index}.price`] && (
            <p className="text-red-500 text-sm">
              {error[`items.${index}.price`]}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor={`total-${index}`}>Total</label>
          <input
            type="number"
            id={`total-${index}`}
            value={items[index].total || 0} // Ensure total defaults to 0 if not set
            readOnly
            className="p-3 border-gray-300 dark:bg-[#1f2139] border py-2 w-[7rem] rounded-lg"
          />
        </div>
        <div className="pt-7 ml-10">
          <img
            type="button"
            onClick={handleDeleteItem}
            src={bin}
            alt="Delete Item"
            className="h-7 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AddItem;
