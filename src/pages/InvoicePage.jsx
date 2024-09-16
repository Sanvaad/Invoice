import React from "react";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

export default function InvoicePage() {
  return (
    <div className="">
      <AnimatePresence>
        <Center />
      </AnimatePresence>
    </div>
  );
}
