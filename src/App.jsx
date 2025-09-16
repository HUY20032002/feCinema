import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./assets/Components/Header";
import Footer from "./assets/Components/Footer";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <ToastContainer position="bottom-center" />
      <Footer />
    </>
  );
}

export default App;
