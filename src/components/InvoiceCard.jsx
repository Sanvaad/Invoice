import React, { FC, useState } from "react";
import InvoiceStatus from "./InvoiceStatus";
import arrowRight from "../images/arrow-right.svg";

import { Link } from "react-router-dom";

const InvoiceCard = ({ invoice }) => {
  return (
    <div>
      <div className={`flex flex-col gap-3 `}>
        <Link
          to={`/invoice/${invoice.id}`}
          key={invoice.id}
          className="hover:border dark:bg-[#1f2139] border-purple-500 outline-none shadow-sm  bg-[#fff] rounded-2xl py-6 px-3 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-7">
            <p>
              <span className="text-[#7c5dfa]">#</span>
              <span className="dark:text-[#fff]">
                {invoice.id.toUpperCase()}
              </span>
            </p>
            <h2 className="text-sm text-gray-400 font-light ">
              Due {invoice.createdAt}
            </h2>
            <h2 className="text-sm text-gray-400 font-light text-right">
              {invoice.clientName}
            </h2>
          </div>
          <div className="flex items-center gap-7">
            <h1 className="text-xl dark:text-white">￡{invoice.total}</h1>
            <InvoiceStatus invoice={invoice} />
            <img src={arrowRight} alt="" className="h-3" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default InvoiceCard;
