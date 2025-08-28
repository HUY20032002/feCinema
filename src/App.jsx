import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom"; // thêm Route
import "./App.css";
import Footer from "./assets/Components/Footer";
import Header from "./assets/Components/Header";
import HomePage from "./assets/Pages/Home";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
