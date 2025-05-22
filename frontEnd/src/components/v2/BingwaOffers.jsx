import React from "react";
import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md"; // Material Design icons
import { useNavigate } from "react-router-dom";
import EditOfferModal from "./EditOfferModal";

const BingwaOffers = () => {
  const [offers, setOffers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (id) => {
    // Handle edit logic here
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/bingwa/delete-bingwa-offer/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedOffers = offers.filter((offer) => offer.id !== id);
        setOffers(updatedOffers);
      } else {
        console.error("Failed to delete offer.");
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${apiUrl}/bingwa/get-bingwa-offers`);
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);
  return (
    <div className="flex flex-col">
      <table className="min-w-full border-collapse  border-gray-200">
        <thead className="bg-white border-b text-sm">
          <tr>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Deal</th>
            <th className="p-2 text-left">Validity</th>
            <th className="p-2 text-left">Popularity</th>
            <th className="p-2 text-left">Sales</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {offers.map((offer, index) => (
            <tr
              key={index}
              className="hover:bg-slate-100 text-slate-600  bg-white border-b"
            >
              <td className="text-blue-400 p-2 text-sm">Kshs {offer.price}</td>
              <td className="text-sm  p-2">{offer.title}</td>
              <td className=" p-2">{offer.expiry}</td>

              <td className="font-bold p-2">0</td>
              <td className="font-bold p-2">0</td>
              <td className="p-2 flex gap-4">
                <button
                  onClick={setOpenModal(true)}
                  className="text-blue-500 flex items-center gap-2  hover:bg-blue-600 hover:text-white px-2 py-1 rounded"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="text-red-500 flex items-center gap-2 hover:bg-red-500 hover:text-white px-2 py-1 rounded"
                >
                  <MdDelete /> Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BingwaOffers;
// Compare this snippet from src/components/v2/BingwaOffers.jsx:
