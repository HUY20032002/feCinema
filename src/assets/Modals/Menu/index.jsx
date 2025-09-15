import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

function Menu({ open, user, onClose, handleLogout }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] md:hidden mt-15"
      onClick={onClose} // click overlay -> đóng
    >
      <div
        className={`bg-white w-full p-6 gap-4 
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-y-0" : "-translate-y-full"}`}
        onClick={(e) => e.stopPropagation()} // chặn click lan ra overlay
      >
        {user?.user?._id ? (
          <div className="flex flex-col gap-2">
            {/* Logout */}
            <Link
              to="/"
              className="bg-blue-500 px-3 py-2 rounded-lg text-white"
              onClick={() => {
                handleLogout();
                onClose(); // đóng menu
              }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </Link>

            {/* User name */}
            <Link
              to="/"
              className="bg-blue-500 px-3 py-2 rounded-lg text-white"
            >
              <FontAwesomeIcon icon={faUser} /> {user?.user.name}
            </Link>
            <Link
              to="/"
              className="bg-blue-500 px-3 py-2 rounded-lg text-white"
              onClick={onClose} // đóng menu
            >
              Hồ sơ
            </Link>

            {/* Admin role */}
            {user?.user.role === "admin" && (
              <Link
                to="/admin"
                className="bg-blue-500 px-3 py-2 rounded-lg text-white"
                onClick={onClose} // đóng menu
              >
                <FontAwesomeIcon icon={faUserShield} /> Quản trị viên
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              className="bg-blue-500 px-3 py-2 rounded-lg text-white"
              onClick={onClose} // đóng menu
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 px-3 py-2 rounded-lg text-white"
              onClick={onClose} // đóng menu
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
