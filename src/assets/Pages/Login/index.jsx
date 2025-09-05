import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setShow] = useState(false);

  const navigate = useNavigate();

  const dataBase = [
    { email: "huy@gmail.com", password: "123456" },
    { email: "cc3m@gmail.com", password: "123456" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = dataBase.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      alert("Sai email hoặc mật khẩu!");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-10 w-full">
      <section className="flex items-center justify-center text-2xl p-6">
        <a href="/"> LOGO CINEMA</a>
      </section>
      <div
        className="items-center 
            border-2 border-black p-10 rounded-lg shadow-lg
            bg-white md:w-2/3 xl:w-1/3 md:mx-auto md:flex
            md:flex-col md:items-center md:justify-center md:mt-10 md:gap-4">
        {/* Form login */}
        <form onSubmit={handleSubmit} className="">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <label htmlFor="email">Email:</label>
          <input
            className="border-2 border-black rounded-md p-2 w-full my-3"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <div className="relative w-full">
            <input
              className="border-2 border-black rounded-md p-2 w-full my-3 "
              type={isShow ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black ">
              <FontAwesomeIcon icon={isShow ? faEyeSlash : faEye} />
            </button>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 my-3 rounded-md hover:bg-blue-600 w-full "
            type="submit">
            Login
          </button>
        </form>
        <div className="flex justify-center gap-6 mt-4">
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>

      {/* Các nút ngoài form */}
    </div>
  );
}

export default Login;
