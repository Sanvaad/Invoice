import React, { useState } from "react";

export default function BillReceiverSection({
  setClientName,
  setClientEmail,
  setClientStreet,
  setClientCity,
  setClientPostCode,
  setClientCountry,
  clientName,
  clientEmail,
  clientStreet,
  clientCity,
  clientPostCode,
  clientCountry,
  error,
}) {
  return (
    <div className="grid grid-cols-3 mx-1 space-y-4 mb-7">
      <div className="flex flex-col col-span-3">
        <label className="text-gray-400 font-light">Client Name</label>
        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          type="text"
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
        />
        {error.clientName && (
          <p className="text-red-500 text-sm">{error.clientName}</p>
        )}
      </div>

      <div className="flex flex-col col-span-3">
        <label className="text-gray-400 font-light">Client Email</label>
        <input
          type="text"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
        />
        {error.clientEmail && (
          <p className="text-red-500 text-sm">{error.clientEmail}</p>
        )}
      </div>

      <div className="flex flex-col col-span-3">
        <label className="text-gray-400 font-light">Street Address</label>
        <input
          type="text"
          value={clientStreet}
          onChange={(e) => setClientStreet(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
        />
        {error.clientStreet && (
          <p className="text-red-500 text-sm">{error.clientStreet}</p>
        )}
      </div>

      <div className="flex flex-col mr-4 col-span-1">
        <label className="text-gray-400 font-light">City</label>
        <input
          type="text"
          value={clientCity}
          onChange={(e) => setClientCity(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
        />
        {error.clientCity && (
          <p className="text-red-500 text-sm">{error.clientCity}</p>
        )}
      </div>
      <div className="flex flex-col mr-4 col-span-1">
        <label className="text-gray-400 font-light">Post Code</label>
        <input
          type="text"
          value={clientPostCode}
          onChange={(e) => setClientPostCode(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
        />
        {error.clientPostCode && (
          <p className="text-red-500 text-sm">{error.clientPostCode}</p>
        )}
      </div>
      <div className="flex flex-col col-span-1">
        <label className="text-gray-400 font-light">Country</label>
        <input
          type="text"
          value={clientCountry}
          onChange={(e) => setClientCountry(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] focus:outline-none rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
        />
        {error.clientCountry && (
          <p className="text-red-500 text-sm">{error.clientCountry}</p>
        )}
      </div>
    </div>
  );
}
