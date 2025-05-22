import React from "react";
import { Link } from "react-router-dom";
import BingwaOffers from "../v2/BingwaOffers";
import { useState } from "react";
import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdStore,
  MdSettings,
  MdMessage,
  MdNotifications,
  MdPerson,
  MdLogout,
} from "react-icons/md";

const DashboardPage = () => {
  const sidebarItems = [
    { title: "Dashboard", component: "", icon: <MdDashboard /> },
    { title: "Sales", component: "", icon: <MdShoppingCart /> },
    { title: "Bingwa", component: <BingwaOffers />, icon: <MdStore /> },
    { title: "Customers", component: "", icon: <MdPeople /> },
    { title: "Messages", component: "", icon: <MdMessage /> },
    { title: "Notifications", component: "", icon: <MdNotifications /> },
    { title: "Settings", component: "", icon: <MdSettings /> },
    { title: "Profile", component: "", icon: <MdPerson /> },
    { title: "Logout", component: "", icon: <MdLogout /> },
  ];
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex flex-row items-center px-4 w-full justify-between bg-white mb-4 h-14">
        <p className="text-xl">Mazeltov LTD</p>
        <div>{/* user profile */}</div>
        <div>{/* notifications icon */}</div>
        <div>{/* search bar */}</div>
      </div>
      <section className="w-full mb-4 flex gap-4">
        <div className="w-[300px] bg-white h-screen rounded-lg border border-slate-200">
          <div className="flex">
            <aside className="w-64 bg-white h-screen p-4 border-r">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(item.title)}
                  className={`flex items-center mb-4 gap-4 w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out 
              ${
                activeTab === item.title
                  ? "bg-blue-600 text-white px-6"
                  : "hover:bg-slate-100 hover:text-blue-600 hover:px-6"
              }`}
                >
                  {item.icon}
                  <p>{item.title}</p>
                </button>
              ))}
            </aside>
          </div>
        </div>
        {/* Main Content */}
        <main className="flex-1 p-4 bg-white rounded-lg border border-slate-200">
          {sidebarItems.find((item) => item.title === activeTab)?.component}
        </main>
      </section>
    </div>
  );
};

export default DashboardPage;
