import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "../Modals/Menu";

function Header() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.href = "/login"; // hoặc dùng useNavigate
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
          {currentUser ? (
            <>
              <button
                className="px-4 flex items-center gap-2"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </button>
              <button className="px-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} /> {currentUser.email}
              </button>
              {currentUser.role === "admin" ? (
                <button className="px-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUserShield} /> Quản trị viên
                </button>
              ) : (
                <button className="px-4 flex items-center gap-2">Hồ sơ</button>
              )}
            </>
          ) : (
            <>
              <button href="/login">Login</button>
              <button href="/register">Register</button>
            </>
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
      <Menu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

export default Header;
