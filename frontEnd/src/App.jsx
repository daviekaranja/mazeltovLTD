import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ContactForm from "./components/pages/ContactUs";
import AboutUs from "./components/pages/AboutUs";
import ProductManager from "./components/ProductManager";
import AdminPage from "./components/pages/Admin";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/support" element={<ContactForm />} />
          <Route path="/manage" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
