import { useState } from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";

function EditOfferModal() {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogPanel>
        <div className="text-3xl flex flex-row text-gray-800 space-y-6 w-full justify-evenly">
          <input type="text" placeholder="Product Name" />
          <input type="text" placeholder="Price" />
          <input type="text" placeholder="Description" />
        </div>
      </DialogPanel>
    </Dialog>
  );
}

export default EditOfferModal;
