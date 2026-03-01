import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";

// Public Pages
import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";
import Trainers from "./pages/Trainers.jsx";
import Nutrition from "./pages/Nutrition.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";

// Admin
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminLogin from "./admin/pages/AdminLogin.jsx";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC WEBSITE ROUTES */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="page-wrapper">
                <Home />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/programs"
          element={
            <>
              <Navbar />
              <div className="page-wrapper">
                <Programs />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/trainers"
          element={
            <>
              <Navbar />
              <div className="page-wrapper">
                <Trainers />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/nutrition"
          element={
            <>
              <Navbar />
              <div className="page-wrapper">
                <Nutrition />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/pricing"
          element={
            <>
              <Navbar />
              <div className="page-wrapper">
                <Pricing />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <div className="page-wrapper">
                <Contact />
              </div>
              <Footer />
            </>
          }
        />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN PANEL */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
