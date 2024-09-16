import { createSlice } from "@reduxjs/toolkit";
import invoiceData from "../data/data.json";
import { randomId } from "../functions/generateId";
import { fetchFromLocalStorage, storeInLocalStorage } from "../utils/helper";
import formatDate from "../functions/formatDate";

const initialState = {
  invoices: fetchFromLocalStorage("savedInvoice") || [],
  filteredInvoice: fetchFromLocalStorage("savedInvoice") || [],
};

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

const formattedToday = dd + "/" + mm + "/" + yyyy;

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    initializeInvoices(state, action) {
      const formattedInvoices = action.payload.map((invoice) => ({
        ...invoice,
        createdAt: formatDate(invoice.createdAt),
        paymentDue: formatDate(invoice.paymentDue),
      }));
      state.invoices = formattedInvoices;
      state.filteredInvoice = formattedInvoices;
      storeInLocalStorage("savedInvoice", formattedInvoices);
    },

    addInvoice(state, action) {
      const {
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientName,
        clientEmail,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        description,
        paymentTerms,
        selectDeliveryDate,
        items,
      } = action.payload;

      const total = items.reduce((sum, item) => sum + item.total, 0);

      const finalData = {
        id: `${randomId()}`,
        createdAt: formattedToday,
        paymentDue: selectDeliveryDate,
        description: description,
        paymentTerms: paymentTerms,
        clientName: clientName,
        clientEmail: clientEmail,
        status: "pending",
        senderAddress: {
          street: senderStreet,
          city: senderCity,
          postCode: senderPostCode,
          country: senderCountry,
        },
        clientAddress: {
          street: clientStreet,
          city: clientCity,
          postCode: clientPostCode,
          country: clientCountry,
        },
        items: items,
        total: total,
      };

      state.invoices = [...state.invoices, finalData];
      storeInLocalStorage("savedInvoice", state.invoices);
    },

    filterInvoice(state, action) {
      const { invoices } = state;
      if (action.payload.status === "") {
        state.filteredInvoice = invoices;
      } else {
        const filteredData = invoices.filter((invoice) => {
          return invoice.status === action.payload.status;
        });
        console.log(filteredData);
        state.filteredInvoice = filteredData;
      }
      storeInLocalStorage("savedInvoice", state.filteredInvoice);
    },

    updateInvoiceStatus(state, action) {
      const { id, status } = action.payload;
      const invoiceToUpdate = state.invoices.find(
        (invoice) => invoice.id === id
      );
      if (invoiceToUpdate) {
        invoiceToUpdate.status = status;
      }
      // Update filteredInvoice as well
      const filteredInvoiceToUpdate = state.filteredInvoice.find(
        (invoice) => invoice.id === id
      );
      if (filteredInvoiceToUpdate) {
        filteredInvoiceToUpdate.status = status;
      }
      storeInLocalStorage("savedInvoice", state.filteredInvoice);
    },

    deleteInvoice(state, action) {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
      state.filteredInvoice = state.filteredInvoice.filter(
        (invoice) => invoice.id !== action.payload
      );

      storeInLocalStorage("savedInvoice", state.filteredInvoice);
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  filterInvoice,
  updateInvoiceStatus,
  initializeInvoices,
} = invoiceSlice.actions;
export default invoiceSlice;
