import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { filterInvoice } from "../redux/invoiceSlice";

export default function BillSenderForm({
  setSenderStreet,
  setSenderCity,
  setSenderPostCode,
  setSenderCountry,
  senderStreet,
  senderCity,
  senderPostCode,
  senderCountry,
  error,
}) {
  const [filterValue, setfilterValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterInvoice({ status: filterValue }));
  }, [filterValue, dispatch]);

  return (
    <div className="grid grid-cols-3 mx-1 space-y-4">
      <div className="flex flex-col col-span-3">
        <label className="text-gray-400 font-light">Street Address</label>
        <input
          type="text"
          value={senderStreet}
          name="senderStreet"
          id="senderStreet"
          onChange={(e) => setSenderStreet(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
        />
        {error.senderStreet && (
          <p className="text-red-500 text-sm">{error.senderStreet}</p>
        )}
      </div>

      <div className="flex flex-col mr-4 col-span-1">
        <label className="text-gray-400 font-light">City</label>
        <input
          type="text"
          value={senderCity}
          onChange={(e) => setSenderCity(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] focus:outline-none rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
        />
        {error.senderCity && (
          <p className="text-red-500 text-sm">{error.senderCity}</p>
        )}
      </div>
      <div className="flex flex-col mr-4 col-span-1">
        <label className="text-gray-400 font-light">Post Code</label>
        <input
          type="text"
          value={senderPostCode}
          onChange={(e) => setSenderPostCode(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-purple-400 border-gray-300 dark:border-gray-800"
        />
        {error.senderPostCode && (
          <p className="text-red-500 text-sm">{error.senderPostCode}</p>
        )}
      </div>
      <div className="flex flex-col col-span-1">
        <label className="text-gray-400 font-light">Country</label>
        <input
          type="text"
          value={senderCountry}
          onChange={(e) => setSenderCountry(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] focus:outline-none rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
        />
        {error.senderCountry && (
          <p className="text-red-500 text-sm">{error.senderCountry}</p>
        )}
      </div>
    </div>
  );
}
