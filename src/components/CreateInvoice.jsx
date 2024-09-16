import React, { useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice, filterInvoice } from "../redux/invoiceSlice";
import AddItem from "./AddItem";
import SaveDiscardBtn from "./SaveDiscardBtn";
import BillSenderForm from "./BillSenderForm";
import BillReceiverSection from "./BillReceiverSection";
import AddItemBtn from "./AddItemBtn";
import InvoiceInfo from "./InvoiceInfo";
import { randomId } from "../functions/generateId";

import * as Yup from "yup";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function CreateInvoice({ setOpenCreateInvoice }) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [clientStreet, setClientStreet] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostCode, setClientPostCode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [description, setDescription] = useState("");

  const [selectDeliveryDate, setSelectDeliveryDate] = useState("");

  const [paymentTerms, setPaymentTerms] = useState("");

  const [senderStreet, setSenderStreet] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostCode, setSenderPostCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");

  const [invoiceDate, setInvoiceDate] = useState(getCurrentDate());

  const deliveryTime = [
    { text: "Next 1 day", value: 1 },
    { text: "Next 7 day", value: 7 },
    { text: "Next 14 day", value: 14 },
    { text: "Next 30 day", value: 30 },
  ];

  const validationSchema = Yup.object({
    senderStreet: Yup.string().required("Sender street is required"),
    senderCity: Yup.string().required("Sender city is required"),
    senderPostCode: Yup.string().required("Sender post code is required"),
    senderCountry: Yup.string().required("Sender country is required"),
    clientName: Yup.string().required("Client name is required"),
    clientEmail: Yup.string().email().required("Client email is required"),
    clientStreet: Yup.string().required("Client street is required"),
    clientCountry: Yup.string().required("Client country is required"),
    clientCity: Yup.string().required("Client city is required"),
    clientPostCode: Yup.string().required("Client post code is required"),
    description: Yup.string().required("description is required"),
    paymentTerms: Yup.string().required("Payment terms is required"),
    selectDeliveryDate: Yup.string()
      .oneOf(
        deliveryTime.map((option) => option.text),
        "Please select a valid delivery time"
      )
      .required("Delivery time is required"),
    invoiceDate: Yup.date().required("Date is required"),
    items: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Item name is required"),
        quantity: Yup.number()
          .required("Item quantity is required")
          .min(1, "Quantity must be at least 1"),
        price: Yup.number()
          .required("Item price is required")
          .min(0, "Price must be non-negative"),
      })
    ),
  });

  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const [items, setItems] = useState([
    {
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
      id: uuidv4(),
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = randomId();

    const formData = {
      senderStreet,
      senderCity,
      senderPostCode,
      senderCountry,
      clientName,
      clientEmail,
      clientStreet,
      clientCity,
      clientPostCode,
      clientCountry,
      description,
      paymentTerms,
      selectDeliveryDate,
      invoiceDate: new Date(invoiceDate),
    };

    try {
      await validationSchema.validate(
        { ...formData, items },
        { abortEarly: false }
      );
      setError({});
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        if (err.path.startsWith("items")) {
          const [, index, field] = err.path.match(/items\[(\d+)\]\.(\w+)/);
          newError[`items.${index}.${field}`] = err.message;
        } else {
          newError[err.path] = err.message;
        }
      });
      setError(newError);
      return;
    }

    console.log("Form submitted", formData, error);

    dispatch(
      addInvoice({
        id,
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientName,
        clientEmail,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        description,
        paymentTerms,
        selectDeliveryDate,
        items,
      })
    );
    dispatch(filterInvoice({ status: "" }));
    setOpenCreateInvoice(false);

    console.log("Submitted");
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#000005be]">
      <form
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            return;
          }
          setOpenCreateInvoice(false);
        }}
        onSubmit={handleSubmit}
      >
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 40,
              duration: 0.4,
            },
          }}
          exit={{ x: -700, transition: { duration: 0.2 } }}
          className="scrollbar-hide flex flex-col dark:text-white dark:bg-[#141625] bg-white  md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl"
        >
          <h1 className="font-semibold dark:text-white text-3xl">
            Create Invoice
          </h1>

          {/* Bill From Section */}
          <div className="overflow-y-scroll scrollbar-hide my-14">
            <h1 className="text-[#7c5dfa] mb-4 font-medium">Bill From</h1>
            <BillSenderForm
              setSenderStreet={setSenderStreet}
              setSenderCity={setSenderCity}
              setSenderPostCode={setSenderPostCode}
              setSenderCountry={setSenderCountry}
              senderStreet={senderStreet}
              senderCity={senderCity}
              senderPostCode={senderPostCode}
              senderCountry={senderCountry}
              error={error}
            />

            {/* Bill to Section */}
            <h1 className="text-[#7c5dfa] my-4 mt-10 font-medium">Bill To</h1>
            <BillReceiverSection
              setClientName={setClientName}
              setClientEmail={setClientEmail}
              setClientStreet={setClientStreet}
              setClientCity={setClientCity}
              setClientPostCode={setClientPostCode}
              setClientCountry={setClientCountry}
              clientName={clientName}
              clientEmail={clientEmail}
              clientStreet={clientStreet}
              clientCity={clientCity}
              clientPostCode={clientPostCode}
              clientCountry={clientCountry}
              error={error}
            />

            <InvoiceInfo
              paymentTerms={paymentTerms}
              setPaymentTerms={setPaymentTerms}
              description={description}
              setDescription={setDescription}
              selectDeliveryDate={selectDeliveryDate}
              setSelectDeliveryDate={setSelectDeliveryDate}
              deliveryTime={deliveryTime}
              invoiceDate={invoiceDate}
              setInvoiceDate={setInvoiceDate}
              error={error}
            />

            {/* Items List */}
            <h1 className="text-xl text-gray-400 font-semibold mb-3">
              Item List
            </h1>
            {items.map((item, index) => (
              <AddItem
                key={item.id}
                items={items}
                setItems={setItems}
                index={index}
                error={error}
              />
            ))}

            <AddItemBtn setItems={setItems} items={items} />
          </div>
          <SaveDiscardBtn setOpenCreateInvoice={setOpenCreateInvoice} />
        </motion.div>
      </form>
    </div>
  );
}
