import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceCard from "./InvoiceCard";
import { motion } from "framer-motion";
import { initializeInvoices } from "../redux/invoiceSlice";
import prePopulatedData from "../data/data.json";

export default function Center() {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.filteredInvoice);
  const filter = ["paid", "pending", "draft"];

  useEffect(() => {
    if (invoices.length === 0) {
      dispatch(initializeInvoices(prePopulatedData));
    }
  }, [dispatch, invoices.length]);

  return (
    <div className="w-[49rem] max-h-[64px] my-20 mx-60">
      <InvoiceHeader invoices={invoices} filter={filter} />
      {invoices.map((invoice, index) => (
        <motion.div
          key={invoice.id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <InvoiceCard invoice={invoice} />
        </motion.div>
      ))}
    </div>
  );
}
