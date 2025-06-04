import React, { useState } from "react";
import BingwaOffers from "../v2/BingwaOffers";
import {
  MdDashboard,
  MdShoppingCart,
  MdStore,
  MdSettings,
  MdMessage,
  MdNotifications,
  MdPerson,
  MdLogout,
  MdMenu,
  MdLock,
  MdStars,
} from "react-icons/md";

const promotions = [
  {
    title: "Loan on Items",
    icon: <MdLock />,
    description:
      "Digitize and automate your collateral loan process. Includes SMS reminders, STK push for loan collection, and item tracking.",
  },
  {
    title: "Targeted SMS Campaigns",
    icon: <MdLock />,
    description:
      "Market your airtime and Bingwa offers with targeted SMS campaigns for better reach and conversions.",
  },
  {
    title: "SEO for Bingwa Offers",
    icon: <MdLock />,
    description:
      "Improve your Bingwa listings' visibility with strategic SEO, helping more people find and buy your products.",
  },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("Bingwa");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    {
      title: "Dashboard",
      component: (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            Welcome to the Dashboard
          </h2>
          <p className="text-gray-600 text-center max-w-md">
            Get a quick overview of your activity, manage your offers, and
            explore new features.
          </p>
        </div>
      ),
      icon: <MdDashboard className="text-xl" />,
    },
    {
      title: "Transactions",
      component: (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Transactions
          </h2>
          <p className="text-gray-600 text-center max-w-md">
            Your transaction records will appear here. Track your sales and
            purchases easily.
          </p>
        </div>
      ),
      icon: <MdShoppingCart className="text-xl" />,
    },
    {
      title: "Bingwa",
      component: <BingwaOffers />,
      icon: <MdStore className="text-xl" />,
    },
    {
      title: "Messages",
      component: (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <MdMessage className="text-3xl text-blue-400 mb-2" />
          <h2 className="text-lg font-semibold text-blue-700 mb-1">Messages</h2>
          <p className="text-gray-500">No messages yet.</p>
        </div>
      ),
      icon: <MdMessage className="text-xl" />,
    },
    {
      title: "Settings",
      component: (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <MdSettings className="text-3xl text-blue-400 mb-2" />
          <h2 className="text-lg font-semibold text-blue-700 mb-1">Settings</h2>
          <p className="text-gray-500">Settings coming soon.</p>
        </div>
      ),
      icon: <MdSettings className="text-xl" />,
    },
    {
      title: "Logout",
      component: (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <MdLogout className="text-3xl text-red-400 mb-2" />
          <h2 className="text-lg font-semibold text-red-600 mb-1">
            Logged Out
          </h2>
          <p className="text-gray-500">You have logged out.</p>
        </div>
      ),
      icon: <MdLogout className="text-xl" />,
    },
    ...promotions.map((promo) => ({
      title: promo.title,
      component: (
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto border border-blue-100 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 opacity-10 text-blue-300 text-[8rem] pointer-events-none select-none">
            <MdLock />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 rounded-full p-3 shadow">
              <MdLock className="text-blue-500 text-3xl" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-blue-800">{promo.title}</h2>
              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-medium border border-blue-200">
                Locked Feature
              </span>
            </div>
          </div>
          <p className="mb-8 text-gray-700 text-base leading-relaxed">
            {promo.description}
          </p>
          <button
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-200 text-lg"
            onClick={() => alert(`Request sent for: ${promo.title}`)}
          >
            Request Access
          </button>
        </div>
      ),
      icon: (
        <span className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-2 shadow">
          {promo.icon}
        </span>
      ),
      isPromotion: true,
    })),
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row  bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full md:h-auto bg-white/90 backdrop-blur-lg w-72 p-6 shadow border-r border-blue-100 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-600 rounded-full p-2">
            <MdStars className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            Mazeltov LTD
          </h2>
        </div>
        <nav className="flex-1 flex flex-col bg-slate-50 rounded-2xl p-2 shadow-md gap-1">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {index === 6 && (
                <h3 className="text-xs uppercase tracking-wider text-blue-400 font-bold mt-6 mb-2 pl-2">
                  Promotions
                </h3>
              )}
              <button
                onClick={() => {
                  setActiveTab(item.title);
                  setSidebarOpen(false);
                }}
                className={`group flex items-center gap-4 px-4 py-3 mb-1 w-full text-base rounded-xl transition-all
                  ${
                    activeTab === item.title
                      ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg font-bold"
                      : "text-blue-700 hover:bg-blue-100 hover:shadow"
                  }
                  ${item.isPromotion ? "border-l-4 border-blue-400" : ""}
                `}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.title}</span>
                {item.isPromotion && (
                  <span className="ml-auto text-xs text-blue-500 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Locked
                  </span>
                )}
              </button>
            </div>
          ))}
        </nav>
        {/* <div className="mt-auto flex items-center gap-3 pt-6 border-t border-blue-100">
          <MdPerson className="text-blue-400 text-2xl" />
          <div>
            <div className="font-semibold text-blue-700">John Doe</div>
            <div className="text-xs text-blue-400">Admin</div>
          </div>
        </div> */}
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur border-b border-blue-100 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-3xl text-blue-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="text-2xl font-bold text-blue-700 hidden md:block">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="hidden sm:block px-4 py-2 border border-blue-100 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
            />
            <button className="relative">
              <MdNotifications className="text-2xl text-blue-400 hover:text-blue-600" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <MdPerson className="text-2xl text-blue-400" />
              <span className="text-base hidden sm:block font-medium text-blue-700"></span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 flex flex-col items-center justify-center">
          <div className="w-full  bg-white/90 rounded-2xl shadow-xl border border-blue-100 p-6 min-h-[300px]">
            {sidebarItems.find((item) => item.title === activeTab)?.component}
          </div>
        </main>
      </div>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
