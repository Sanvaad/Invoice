import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteInvoice, updateInvoiceStatus } from "../redux/invoiceSlice";
import InvoiceStatus from "../components/InvoiceStatus";
import formatDate from "../functions/formatDate";

import { motion } from "framer-motion";
import arrowLeft from "../images/arrow-left.svg";

export default function InvoiceDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const string = function (date) {
    const date1 = date.split("/");
    const newDate = date1[1] + "/" + date1[0] + "/" + date1[2];
  };
  const { id } = useParams();
  const invoices = useSelector((state) => state.invoices.invoices);
  const invoice = invoices.find((invoice) => invoice.id === id);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const onMakePaidClick = () => {
    dispatch(updateInvoiceStatus({ id: invoice.id, status: "paid" }));
  };

  const onDeleteButtonClick = () => {
    navigate("/");

    dispatch(deleteInvoice(invoice.id));
  };

  return (
    <div className="w-[43rem] ml-[15rem] mt-[5rem] flex flex-col gap-3">
      <motion.div
        key={invoice.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{ opacity: 0, x: 3100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex mb-5 cursor-pointer" onClick={() => navigate(-1)}>
          <img src={arrowLeft} alt="" className="h-5" />
          <p className="    dark:text-[#fff]">Go back</p>
        </div>
        <div className="flex items-center   justify-between px-7 bg-[#fff] dark:bg-[#1f2139] py-5">
          <div className="flex gap-2">
            <p className="text-gray-400">Status</p>
            <InvoiceStatus invoice={invoice} />
          </div>

          <div className="flex">
            <button
              onClick={() => onDeleteButtonClick()}
              className=" ml-3 text-center  text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
            >
              Delete
            </button>

            {invoice.status === "pending" && (
              <button
                onClick={onMakePaidClick}
                className="ml-3 text-center text-white bg-[#7c5dfa] hover:opacity-80 p-3 px-7 rounded-full"
              >
                Make as Paid
              </button>
            )}
          </div>
        </div>
        <div className="bg-[#fff] dark:bg-[#1f2139] p-7">
          <div className="mb-10 ">
            <div className="flex justify-between mb-10 ">
              <div className="">
                <p className="text-[1.2rem] font-medium">
                  <span className="text-[#7c5dfa]">#</span>
                  <span className="text-[#fff]">{invoice.id}</span>
                </p>
                <p className="text-gray-600">{invoice.clientName}</p>
              </div>
              <div className="text-gray-400">
                <p>{invoice.senderAddress.street}</p>
                <p>{invoice.senderAddress.city}</p>
                <p>{invoice.senderAddress.postCode}</p>
                <p>{invoice.senderAddress.country}</p>
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-3">
              <div>
                <div className="mb-10">
                  <p className="text-gray-400">Invoice Date</p>
                  <p className="font-bold dark:text-[#fff]">
                    {formatDate(invoice.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Payment Due</p>
                  <p className="font-bold dark:text-[#fff]">
                    {formatDate(invoice.paymentDue)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-400">Bill to</p>
                <p className="font-bold dark:text-[#fff]">
                  {invoice.clientName}
                </p>
                <div className="text-gray-400">
                  <p>{invoice.clientAddress.street}</p>
                  <p>{invoice.clientAddress.city}</p>
                  <p>{invoice.clientAddress.postCode}</p>
                  <p>{invoice.clientAddress.country}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400">Sent to</p>
                <p className="font-bold dark:text-[#fff]">
                  {invoice.clientEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 py-10 dark:bg-[#252945]  ">
            <div className=" grid grid-cols-4 px-14 justify-items-center  text-gray-400 mb-3">
              <p>Item name</p>
              <p>Qty.</p>
              <p>Item price</p>
              <p>Total</p>
            </div>

            <div>
              {invoice.items.map((item) => {
                return (
                  <div className="grid grid-cols-4 justify-items-center  font-bold px-14 dark:text-[#fff]">
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                    <p>{item.price}</p>
                    <p>{item.total}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-700 text-[#fff] font-bold flex justify-between px-10 py-10 ">
            <p className="text-[1.4rem]">Amount Due</p>
            <p className="text-[1.8rem]">￡{invoice.total}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
