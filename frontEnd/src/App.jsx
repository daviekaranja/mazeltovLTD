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
import Login from "./components/Login";

import AdminPage from "./components/pages/Admin";
import ProtectedRoute from "./components/ProtectRoute";
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
            <Route
              path="/product-review/:productName"
              element={<ProductReview />}
            />

            <Route
              path="/manage"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
