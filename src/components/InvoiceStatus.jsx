import React from "react";

export default function InvoiceStatus({ invoice }) {
  const classNames = {
    paid: ["text-[#33d69f] bg-[#33d69f0f]", "bg-[#33d69f]"],
    pending: ["text-[#ff8f00] bg-[#ff8f000f]", "bg-[#ff8f00]"],
    draft: ["text-[#dfe3fa] bg-[#dfe3fa0f]", "bg-[#dfe3fa]"],
  };

  return (
    <div>
      <p
        className={`${
          (invoice.status === "paid" && classNames.paid) ||
          (invoice.status === "pending" && classNames.pending) ||
          (invoice.status === "draft" && classNames.draft)
        }`}
      >
        {invoice.status}
      </p>
    </div>
  );
}
