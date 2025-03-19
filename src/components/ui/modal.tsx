import React from "react";
import { Button } from "./button";

interface ModalProps {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, onConfirm, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{title}</h2>
        <div className="mb-6 dark:text-gray-300">{children}</div>
        <div className="flex justify-end gap-4">
          <Button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;