import React, { useEffect, useState } from "react";
import arrowDown from "../images/arrow-down.svg";
import arrowUp from "../images/arrow-up.svg";
import plus from "../images/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import CreateInvoice from "./CreateInvoice";
import { filterInvoice } from "../redux/invoiceSlice";

export default function InvoiceHeader({ filter }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filterValue, setfilterValue] = useState("");
  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);
  const dispatch = useDispatch();

  const invoices = useSelector(
    (state) => state.invoices.filteredInvoice.filteredInvoice || []
  );
  console.log(invoices);

  useEffect(() => {
    dispatch(filterInvoice({ status: filterValue }));
  }, [filterValue, dispatch]);

  return (
    <div className="flex items-center justify-between mb-7">
      <div className="">
        <h1 className=" lg:text-4xl md:text-2xl  text-xl  tracking-wide font-semibold dark:text-[#fff]">
          Invoices
        </h1>
        <p className=" text-gray-500 font-light">
          There are {invoices.length} total invoices.
        </p>
      </div>
      <div className="flex">
        <div className=" flex items-center gap-3">
          <p className="   dark:text-white font-medium">Filter by status</p>
          <div
            className="flex cursor-pointer"
            onClick={() => setOpenDropdown((e) => !e)}
          >
            {openDropdown ? (
              <img src={arrowUp} alt="" className="h-3" />
            ) : (
              <img src={arrowDown} alt="" className="h-3" />
            )}
          </div>
          {openDropdown && (
            <div className="  w-40 bg-white dark:bg-[#1E2139] dark:text-white flex px-6 py-4 flex-col  top-[160px] lg:top-[120px]  absolute  shadow-2xl rounded-xl space-y-2    ">
              {filter.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    item === filterValue
                      ? setfilterValue("")
                      : setfilterValue(item);
                  }}
                  className=" items-center cursor-pointer flex space-x-2 "
                >
                  <input
                    value={item}
                    checked={filterValue === item ? true : false}
                    type="checkbox"
                    className=" accent-[#7c5dfa] hover:accent-[#7c5dfa] "
                  />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setOpenCreateInvoice(true)}
          className=" hover:opacity-80 ml-4 md:ml-10 flex items-center py-2 px-2 md:space-x-3 space-x-2 bg-[#7c5dfa] rounded-full cursor-pointer"
        >
          <img
            src={plus}
            alt=""
            className="h-6 bg-[#fff] rounded-full font-bold"
          />
          <p className=" md:block hidden text-white font-bold text-lg">
            New invoice
          </p>
        </button>

        <AnimatePresence>
          {openCreateInvoice && (
            <CreateInvoice setOpenCreateInvoice={setOpenCreateInvoice} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
