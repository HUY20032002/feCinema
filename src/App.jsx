import React from "react";
import { Routes, Route } from "react-router-dom"; // thêm Route
import "./App.css";
import Footer from "./assets/Components/Footer";
import Header from "./assets/Components/Header";
import HomePage from "./assets/Pages/Home";
import Login from "./assets/Pages/Login";
import Register from "./assets/Pages/Register";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
