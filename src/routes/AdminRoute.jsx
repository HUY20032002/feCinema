import { Routes, Route, Navigate } from "react-router-dom";
import ManageMovies from "../assets/Pages/Admin/ManageMovies";
import ShowTime from "../assets/Pages/Admin/ShowTime";

function AdminRoutes() {
  return (
    <Routes>
      <>
        <Route path="/movies" element={<ManageMovies />} />
        <Route path="/showtime" element={<ShowTime />} />
      </>
    </Routes>
  );
}

export default AdminRoutes;
