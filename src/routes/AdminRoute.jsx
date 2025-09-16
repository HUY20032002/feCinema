import { Routes, Route, Navigate } from "react-router-dom";
import ManageMovies from "../assets/Pages/Admin/ManageMovies";

function AdminRoutes() {
  return (
    <Routes>
      <>
        <Route path="/movies" element={<ManageMovies />} />
      </>
    </Routes>
  );
}

export default AdminRoutes;
