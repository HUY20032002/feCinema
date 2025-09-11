import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/apiRequest";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [isShow, setShow1] = useState(false);
  const [isShow2, setShow2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      phone,
      name,
      birth,
    };
    try {
      register(dispatch, data);
    } catch (error) {
      console.log(error);
    }
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
        {/* Form đăng ký */}
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <div>
            <label htmlFor="name">Họ và Tên:</label>
            <input
              className="border-2 border-black rounded-md p-2 w-full"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="border-2 border-black rounded-md p-2 w-full"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <div className="relative w-full">
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
          </div>

          <div>
            <label htmlFor="phone">Số Điện Thoại:</label>
            <div className="relative w-full">
              <input
                className="border-2 border-black rounded-md p-2 w-full"
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="birth">Ngày sinh:</label>
            <input
              className="border-2 border-black rounded-md p-2 w-full"
              type="date"
              id="birth"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              required
            />
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            type="submit">
            Register
          </button>
        </form>

        {/* Link ngoài form */}
        <div className="flex justify-center gap-6 mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
