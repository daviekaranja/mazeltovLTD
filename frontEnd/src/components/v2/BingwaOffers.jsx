import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdSave, MdClose, MdAdd } from "react-icons/md";
import axiosClient from "../../api/axiosClient";

const categories = [
  { key: "all", label: "All" },
  { key: "data", label: "Data" },
  { key: "sms", label: "SMS" },
  { key: "minutes", label: "Minutes" },
  { key: "minutesPlusData", label: "Minutes + Data" },
];
const itemsPerPage = 5;
// const baseUrl = "https://www.mazeltov.co.ke/api/v1";

function FeedbackModal({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 2500);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);
  return show ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white text-green-700 font-semibold px-8 py-5 rounded-xl shadow-2xl border border-green-200 animate-fade-in">
        {message}
      </div>
    </div>
  ) : null;
}

export default function BingwaOffers() {
  const [state, setState] = useState({
    offers: [],
    category: "all",
    form: null,
    editingId: null,
    modal: { show: false, msg: "" },
    page: 1,
  });

  const fetchOffers = async (cat = state.category) => {
    try {
      const url =
        cat === "all" ? `/bingwa/get-all` : `/bingwa/offers-by-category/${cat}`;
      console.log(url);
      const { data } = await axiosClient.get(url);
      if (data.length < 0) {
        setState((s) => ({ ...s, offers: data, page: 1 }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveOffer = async () => {
    const { editingId, form, category } = state;
    const method = editingId ? "put" : "post";
    const url = editingId ? `/bingwa/update/${editingId}` : "/bingwa/create";
    try {
      await axiosClient.request({ method, url, data: form });
      setState((s) => ({
        ...s,
        form: null,
        editingId: null,
        modal: {
          show: true,
          msg: editingId ? "Offer updated!" : "Offer created!",
        },
      }));
      fetchOffers(category);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteOffer = async (id) => {
    try {
      await axiosClient.delete(`/bingwa/delete/${id}`);
      fetchOffers(state.category);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchOffers(state.category);
  }, [state.category]);

  const { offers, category, form, editingId, modal, page } = state;
  const totalPages = Math.ceil(offers.length / itemsPerPage) || 1;
  const paginated = offers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const set = (obj) => setState((s) => ({ ...s, ...obj }));

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-gradient-to-br from-white via-slate-50 to-indigo-50 rounded-2xl shadow-xl border border-slate-200">
      <header className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-indigo-900 tracking-tight">
            Bingwa Offers
          </h2>
          <p className="text-slate-500 mt-1 text-base">
            Manage and customize your Bingwa offers with ease.
          </p>
        </div>
        <button
          onClick={() =>
            set({
              form: {
                price: "",
                label: "",
                validity: "",
                category: category === "all" ? "" : category,
              },
              editingId: null,
            })
          }
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-base font-semibold px-5 py-2.5 rounded-lg shadow-lg transition-all duration-150"
        >
          <MdAdd size={22} /> New Offer
        </button>
      </header>
      <nav className="flex gap-3 pb-3 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() =>
              set({ category: cat.key, form: null, editingId: null })
            }
            className={`px-5 py-2 text-base rounded-full capitalize font-medium transition-all duration-150
              ${
                category === cat.key
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-indigo-50"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg bg-white">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-900 font-bold text-left">
              <th className="p-4">Price</th>
              <th className="p-4">Deal</th>
              <th className="p-4">Validity</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {form && editingId == null && (
              <OfferFormRow
                form={form}
                setForm={(f) => set({ form: f })}
                onSave={saveOffer}
                onCancel={() => set({ form: null })}
              />
            )}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-slate-400 font-medium"
                >
                  No offers found in this category.
                </td>
              </tr>
            )}
            {paginated.map((offer, idx) =>
              editingId === offer.id ? (
                <OfferFormRow
                  key={offer.id}
                  form={form}
                  setForm={(f) => set({ form: f })}
                  onSave={saveOffer}
                  onCancel={() => set({ editingId: null, form: null })}
                />
              ) : (
                <tr
                  key={offer.id}
                  className={`border-b border-slate-100 hover:bg-indigo-50 transition-all duration-100 ${
                    idx % 2 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <td className="p-4 text-indigo-700 font-semibold">
                    <span className="bg-indigo-50 px-3 py-1 rounded-lg text-indigo-800 shadow-sm">
                      Ksh {offer.price}
                    </span>
                  </td>
                  <td className="p-4">{offer.label}</td>
                  <td className="p-4">{offer.validity}</td>
                  <td className="p-4 flex gap-2 justify-center whitespace-nowrap">
                    <button
                      onClick={() =>
                        set({ editingId: offer.id, form: { ...offer } })
                      }
                      className="flex items-center gap-1 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      <MdEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteOffer(offer.id)}
                      className="flex items-center gap-1 text-rose-600 hover:bg-rose-100 px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      <MdDelete /> Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <footer className="flex items-center justify-between text-base text-slate-600 pt-2">
        <button
          onClick={() => set({ page: Math.max(page - 1, 1) })}
          disabled={page === 1}
          className="px-4 py-2 border border-slate-200 rounded-lg bg-white shadow-sm hover:bg-indigo-50 disabled:opacity-40 transition"
        >
          Prev
        </button>
        <span className="font-medium">
          Page <span className="text-indigo-700">{page}</span> of{" "}
          <span className="text-indigo-700">{totalPages}</span>
        </span>
        <button
          onClick={() => set({ page: Math.min(page + 1, totalPages) })}
          disabled={page === totalPages || totalPages === 0}
          className="px-4 py-2 border border-slate-200 rounded-lg bg-white shadow-sm hover:bg-indigo-50 disabled:opacity-40 transition"
        >
          Next
        </button>
      </footer>
      <FeedbackModal
        show={modal.show}
        message={modal.msg}
        onClose={() => set({ modal: { show: false, msg: "" } })}
      />
    </div>
  );
}

function OfferFormRow({ form, setForm, onSave, onCancel }) {
  if (!form) return null;
  const handle = (f) => (e) => setForm({ ...form, [f]: e.target.value });
  return (
    <tr className="bg-yellow-50 border-b border-slate-200 animate-fade-in">
      {["price", "label", "validity"].map((f) => (
        <td key={f} className="p-3">
          <input
            type={f === "price" ? "number" : "text"}
            value={form[f]}
            onChange={handle(f)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-300 text-base shadow-sm transition"
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
          />
        </td>
      ))}
      <td className="p-3 flex gap-2 justify-center whitespace-nowrap">
        <button
          onClick={onSave}
          className="flex items-center gap-1 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg font-medium transition"
        >
          <MdSave /> Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg font-medium transition"
        >
          <MdClose /> Cancel
        </button>
      </td>
    </tr>
  );
}
