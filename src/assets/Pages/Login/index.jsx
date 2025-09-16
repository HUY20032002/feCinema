import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../../api/authRequest";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setShow] = useState(false);
  const [errors, setErrors] = useState({}); // ⚡ state lưu lỗi

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email không được để trống";
    if (!password.trim()) newErrors.password = "Password không được để trống";

    setErrors(newErrors);

    // Nếu có lỗi thì dừng lại
    if (Object.keys(newErrors).length > 0) return;

    // Nếu không có lỗi thì login
    try {
      login(dispatch, email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please try again.", error.message);
    }
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
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input
            className={`border-2 rounded-md p-2 w-full my-3 ${
              errors.email ? "border-red-500" : "border-black"
            }`}
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              // ⚡ Nếu đang có lỗi email mà user đã nhập => clear lỗi
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}

          {/* Password */}
          <div className="relative w-full">
            <label htmlFor="password">Password:</label>
            <input
              className={`border-2 rounded-md p-2 w-full my-3 ${
                errors.password ? "border-red-500" : "border-black"
              }`}
              type={isShow ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                // ⚡ Clear lỗi khi user nhập lại
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-14 -translate-y-1/2 bg-white text-black p-0"
            >
              <FontAwesomeIcon icon={isShow ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}

          {/* Button */}
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
