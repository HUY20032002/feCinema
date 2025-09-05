import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lấy user từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    if (!user) {
      alert("Email không tồn tại trong hệ thống!");
      return;
    }

    // Giả lập gửi email (ở thực tế sẽ gọi API backend gửi mail)
    const resetLink = `http://localhost:3000/reset-password?email=${email}`;
    alert(`Link đổi mật khẩu đã được gửi tới email: ${email}\n\n${resetLink}`);

    setEmail("");
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
          <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

          <div>
            <label htmlFor="email">Nhập Email:</label>
            <input
              className="border-2 border-black rounded-md p-2 w-full my-2"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            type="submit">
            Gửi Link Đổi Mật Khẩu
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

export default ForgotPassword;
