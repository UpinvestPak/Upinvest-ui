import React from "react";

const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="relative w-1/2 max-w-3xl rounded-lg border-2 border-primary bg-white p-6 shadow-lg">
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 font-extrabold"
          onClick={onClose}
        >
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/office/40/multiply.png"
            alt="close"
          />
        </button>

        {/* Modal Content */}
        <h2 className="mb-4 text-center text-3xl font-bold text-black">
          Create Portfolio
        </h2>

        <form>
          {/* Portfolio Name */}
          <div className="mb-5">
            <label
              htmlFor="portfolioName"
              className="mb-2 block font-medium text-black"
            >
              Portfolio Name
            </label>
            <input
              id="portfolioName"
              type="text"
              placeholder="e.g. my savings"
              className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Initial Amount */}
          <div className="mb-4">
            <label
              htmlFor="initialAmount"
              className="mb-2 block font-medium text-black"
            >
              Initial Amount
            </label>
            <input
              id="initialAmount"
              type="number"
              placeholder="Type in PKR"
              className="w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block font-medium text-black"
            >
              Description <span className="text-sm text-gray-500">(Optional)</span>
            </label>
            <textarea
              id="description"
              placeholder="Add a brief description about what this portfolio is for"
              className="w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex w-full items-center gap-3">
            <button
              onClick={onClose}
              type="button"
              className="w-full rounded-xl border-none bg-gray-200 py-2.5 text-black transition duration-200 hover:bg-gray-300"
            >
              Discard
            </button>
            <button
              type="submit"
              className="w-full rounded-xl border-none bg-blue-600 py-2.5 text-white transition duration-200 hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
