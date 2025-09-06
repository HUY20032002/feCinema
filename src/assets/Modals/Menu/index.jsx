import React from "react";

function Menu({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] md:hidden mt-15"
      onClick={onClose} // click vào overlay -> đóng
    >
      <div
        className={`bg-white w-full p-6 flex flex-col gap-4 
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-y-0" : "-translate-y-full"}`}
        onClick={(e) => e.stopPropagation()} // chặn click lan ra overlay
      >
        {/* Menu items cố định */}
        <button className="px-4 text-left">Sign</button>
        <button className="px-4 text-left">Register</button>
        <button className="px-4 text-left">Profile User</button>
        <button className="px-4 text-left">Logout</button>
      </div>
    </div>
  );
}

export default Menu;
