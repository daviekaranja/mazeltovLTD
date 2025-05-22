import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ContactForm from "./components/pages/ContactUs";
import AboutUs from "./components/pages/AboutUs";
import { AuthProvider } from "./components/AuthProvider";
import Sales from "./components/pages/DataAirtimeSales";
import ProductReview from "./components/ProductReviewPage";
import Policies from "./components/pages/Policies";
import ResetPassword from "./components/ResetPassword";
import AdminPage from "./components/pages/DashBoardPage";
import ProtectedRoute from "./components/ProtectRoute";
import BuyAirtime from "./components/BuyAirtime";
import DashboardPage from "./components/pages/DashBoardPage";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/support" element={<ContactForm />} />
            <Route path="/deals" element={<Sales />} />
            <Route path="/legal/data-policies" element={<Policies />} />
            <Route path="/buy-airtime" element={<BuyAirtime />} />
            <Route
              path="/recovery/reset-password"
              element={<ResetPassword />}
            />
            <Route
              path="/product-review/:productName"
              element={<ProductReview />}
            />
            <Route path="/manage" element={<DashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
