import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ContactForm from "./components/pages/ContactUs";
import AboutUs from "./components/pages/AboutUs";
import { AuthProvider } from "./components/AuthProvider";
import ProductManager from "./components/ProductManager";
import AdminPage from "./components/pages/Admin";
import Login from "./components/Login";
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
            <Route path="/login" element={<Login />} />

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
