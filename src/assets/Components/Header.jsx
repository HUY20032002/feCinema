import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../Modals/Menu";
import { useSelector } from "react-redux";
import { logoutUser } from "../../api/authRequest"; // 👈 đúng
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  const currentUser = useSelector(
    (state) => state.auth?.login.currentUser || null
  );
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle logout
  const handleLogout = () => {
    const refreshToken = currentUser?.refreshToken;
    try {
      logoutUser(dispatch, refreshToken);
      // reset auth slice
      navigate("/");
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Logout failed. Please try again.", error.message);
    }
  };

  return (
    <header className="w-full bg-amber-500">
      <div className="custom-container flex items-center justify-between py-3 md:px-5">
        {/* Left */}
        <div className="left-content flex gap-4 text-sm">
          <a href="/" className="px-3">
            X Cinema platform
          </a>
          <a href="/" className="px-3">
            X Cinema Facebook
          </a>
        </div>

        {/* Desktop menu */}
        <div className="right-content hidden md:flex gap-2">
          {currentUser?.user?._id ? (
            <div className="flex items-center justify-center">
              <Link
                to="/"
                className="bg-blue-500 px-3 py-2 rounded-lg text-white mr-2"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </Link>
              <Link
                to="/"
                className="bg-blue-500 px-3 py-2 rounded-lg text-white mr-2"
              >
                <FontAwesomeIcon icon={faUser} /> {currentUser?.user.name}
              </Link>
              {currentUser?.user.role === "admin" ? (
                <Link
                  to="/"
                  className="bg-blue-500 px-3 py-2 rounded-lg text-white mr-2"
                >
                  <FontAwesomeIcon icon={faUserShield} /> Quản trị viên
                </Link>
              ) : (
                <Link
                  to="/"
                  className="bg-blue-500 px-3 py-2 rounded-lg text-white"
                >
                  Hồ sơ
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Link
                to="/login"
                className="mr-2 bg-blue-500 px-3 py-2 rounded-lg text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 px-3 py-2 rounded-lg text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden lg:hidden">
          <button onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile modal menu */}
      <Menu
        open={open}
        user={currentUser}
        onClose={() => setOpen(false)}
        handleLogout={handleLogout}
      />
    </header>
  );
}

export default Header;
