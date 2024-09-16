import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoicePage from "./pages/InvoicePage";
import Sidebar from "./components/Sidebar";
import InvoiceDetails from "./pages/InvoiceDetails";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<InvoicePage />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
