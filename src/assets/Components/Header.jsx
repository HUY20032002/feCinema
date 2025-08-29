import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [open, setOpen] = useState(false);

  const user = {
    name: "huy",
    accessToken: "123",
    role: "staff",
  };

  return (
    <header className="w-full bg-amber-500">
      <div className="custom-container flex items-center justify-between py-3 md:px-5">
        {/* Left */}
        <div className="left-content flex gap-4 text-sm">
          <a href="" className="px-3">
            X Cinema platform
          </a>
          <a href="" className="px-3">
            X Cinema Facebook
          </a>
        </div>

        {/* Desktop menu */}
        <div className="right-content hidden md:flex gap-2 ">
          {user.accessToken ? (
            <>
              <button className="px-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </button>
              <button className="px-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} /> Profile User
              </button>
              {user.role === "admin" ? (
                <button className="px-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUserShield} /> Quản trị viên
                </button>
              ) : (
                <button className="px-4 flex items-center gap-2">
                  Nhân viên
                </button>
              )}
            </>
          ) : (
            <>
              <button>Sign</button>
              <button>Register</button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden flex flex-col gap-2 p-4 ">
          {user.accessToken ? (
            <>
              <button className="px-4 text-left">Logout</button>
              <button className="px-4 text-left">Profile User</button>
              {user.role === "admin" ? (
                <button className="px-4 text-left">Quản trị viên</button>
              ) : (
                <button className="px-4 text-left">Nhân viên</button>
              )}
            </>
          ) : (
            <>
              <button className="px-4 text-left">Sign</button>
              <button className="px-4 text-left">Register</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
