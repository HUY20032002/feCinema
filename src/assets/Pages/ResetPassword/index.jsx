import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy email từ query param (?email=...)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      alert("Link không hợp lệ!");
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Mật khẩu không khớp!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      alert("Email không tồn tại!");
      return;
    }

    // Cập nhật mật khẩu
    users[userIndex].password = password;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đổi mật khẩu thành công!");
    navigate("/login");
  };

  return (
    <div className="p-10 w-full">
      <section className="flex items-center justify-center text-2xl p-6">
        <Link to="/">LOGO CINEMA</Link>
      </section>

      <div
        className="items-center 
          border-2 border-black p-10 rounded-lg shadow-lg
          bg-white md:w-2/3 xl:w-1/3 md:mx-auto md:flex
          md:flex-col md:items-center md:justify-center md:mt-10 md:gap-4">
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <h2 className="text-2xl font-bold text-center">Đặt lại mật khẩu</h2>

          <div>
            <label htmlFor="password">Mật khẩu mới:</label>
            <input
              className="border-2 border-black rounded-md p-2 w-full"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password2">Xác nhận mật khẩu:</label>
            <input
              className="border-2 border-black rounded-md p-2 w-full"
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            type="submit">
            Xác nhận
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
