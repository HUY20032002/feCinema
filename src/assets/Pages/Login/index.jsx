import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../../redux/apiRequest";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, email, password);
    navigate("/");
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
            md:flex-col md:items-center md:justify-center md:mt-10 md:gap-4"
      >
        {/* Form login */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          <label htmlFor="email">Email:</label>
          <input
            className="border-2 border-black rounded-md p-2 w-full my-3"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <div className="relative w-full">
            <input
              className="border-2 border-black rounded-md p-2 w-full my-3"
              type={isShow ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black"
            >
              <FontAwesomeIcon icon={isShow ? faEyeSlash : faEye} />
            </button>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 my-3 rounded-md hover:bg-blue-600 w-full"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Links ngoài form */}
        <div className="flex justify-center gap-6 mt-4">
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
