import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dataBase = [
    { email: "huy@gmail.com", password: "123456" },
    { email: "cc3m@gmail.com", password: "123456" },
  ];
  const [isShow, setShow] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây
    console.log("Email:", email);
    console.log("Password:", password);

    // Kiểm tra đăng nhập
    const user = dataBase.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      alert("Đăng nhập thành công!");
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
    // Reset form
    setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <div className=" p-10  w-full">
      <form
        onSubmit={handleSubmit}
        className="items-center 
            border-2 border-black p-10 rounded-lg shadow-lg
            bg-white md:w-1/3 md:mx-auto md:flex
            md:flex-col md:items-center md:justify-center md:mt-10 md:gap-4
            ">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          className="border-2 border-black rounded-md p-2 w-full"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black">
            <FontAwesomeIcon icon={isShow ? faEyeSlash : faEye} />
          </button>
        </div>
        <div className="mb-2 mt-3">
          <button className="mx-3" type="submit">
            Login
          </button>
          <button className="mx-3" type="submit">
            Register
          </button>
        </div>
        <div className="flex items-center justify-center">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
