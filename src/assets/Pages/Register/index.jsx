import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isShow, setShow1] = useState(false);
  const [isShow2, setShow2] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu trùng khớp
    if (password !== password2) {
      alert("Mật khẩu không khớp!");
      return;
    }

    // Lấy dữ liệu từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email trùng
    const isExist = users.find((u) => u.email === email);
    if (isExist) {
      alert("Email đã tồn tại!");
      return;
    }

    // Lưu user mới
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    setEmail("");
    setPassword("");
    setPassword2("");
    navigate("/login");
  };

  return (
    <div className=" p-10 w-full">
      <form
        onSubmit={handleSubmit}
        className="items-center 
            border-2 border-black p-10 rounded-lg shadow-lg
            bg-white md:w-2/3 xl:w-1/3 md:mx-auto md:flex
            md:flex-col md:items-center md:justify-center md:mt-10 md:gap-4">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <label htmlFor="email">Email:</label>
        <input
          className="border-2 border-black rounded-md p-2 w-full"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <div className="relative w-full">
          {" "}
          <input
            className="border-2 border-black rounded-md p-2 w-full"
            type={isShow ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShow1((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black">
            <FontAwesomeIcon icon={isShow ? faEyeSlash : faEye} />
          </button>
        </div>

        <label htmlFor="password2">Nhập lại Password:</label>
        <div className="relative w-full">
          <input
            className="border-2 border-black rounded-md p-2 w-full"
            type={isShow2 ? "text" : "password"}
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShow2((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black">
            <FontAwesomeIcon icon={isShow2 ? faEyeSlash : faEye} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShow2((prev) => !prev)}
          className="absolute right-2 top-2 text-blue-500">
          <FontAwesomeIcon icon={isShow2 ? faEyeSlash : faEye} />
        </button>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md hover:bg-blue-600 "
            type="submit">
            Register
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="submit">
            Login
          </button>
        </div>

        <div className="text-center">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
