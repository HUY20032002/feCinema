import { Routes, Route } from "react-router-dom";
import HomePage from "../assets/Pages/Home";
import Login from "../assets/Pages/Login";
import Register from "../assets/Pages/Register";
import ForgotPassword from "../assets/Pages/ForgotPassword";
import ResetPassword from "../assets/Pages/ResetPassword";
import Movie from "../assets/Pages/Movie";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/movie/:slug/:id" element={<Movie />} />
    </Routes>
  );
}

export default UserRoutes;
