import React from "react";

export default function InvoiceInfo({
  paymentTerms,
  setPaymentTerms,
  description,
  setDescription,
  selectDeliveryDate,
  setSelectDeliveryDate,
  deliveryTime,
  invoiceDate,
  setInvoiceDate,
  error,
}) {
  return (
    <>
      <div className="flex flex-col col-span-3">
        <label className="text-gray-400 font-light mb-3">Invoice Date</label>
        <input
          type="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] mb-3 focus:outline-none rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
        />
        {error.invoiceDate && (
          <p className="text-red-500 text-sm">{error.invoiceDate}</p>
        )}
      </div>

      <div className="flex flex-col col-span-3">
        <label className="text-gray-400 font-light">Payment Terms</label>
        <input
          type="text"
          value={paymentTerms}
          onChange={(e) => setPaymentTerms(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] mb-3 focus:outline-none rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
        />
        {error.paymentTerms && (
          <p className="text-red-500 text-sm">{error.paymentTerms}</p>
        )}
      </div>

      <div className="flex flex-col col-span-3 mb-3">
        <label className="text-gray-400 font-light">Project Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] focus:outline-none rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
        />
        {error.description && (
          <p className="text-red-500 text-sm">{error.description}</p>
        )}
      </div>

      <div className="flex flex-col col-span-3 mb-5">
        <label className="text-gray-400 font-light">Delivery Date</label>
        <select
          value={selectDeliveryDate}
          onChange={(e) => setSelectDeliveryDate(e.target.value)}
          className="dark:bg-[#1e2139] py-4 px-4 border-[.2px] focus:outline-none rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
        >
          <option value="">Select delivery time</option>
          {deliveryTime.map((option) => (
            <option key={option.value} value={option.text}>
              {option.text}
            </option>
          ))}
        </select>

        {error.selectDeliveryDate && (
          <p className="text-red-500 text-sm">{error.selectDeliveryDate}</p>
        )}
      </div>
    </>
  );
}
