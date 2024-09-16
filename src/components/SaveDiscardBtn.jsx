import React from "react";

export default function SaveDiscardBtn({ setOpenCreateInvoice }) {
  return (
    <div className="flex items-center justify-between w-full dark:bg-[#141625] bg-white p-6">
      <div className="flex items-center justify-center w-full gap-5">
        <button
          onClick={() => setOpenCreateInvoice(false)}
          className="bg-[#252945] text-white font-semibold p-4 w-full rounded-3xl"
        >
          Discard
        </button>

        <button
          type="submit"
          className="bg-[#7c5dfa] text-white font-semibold p-4 w-full rounded-3xl"
        >
          Save & Send
        </button>
      </div>
    </div>
  );
}
