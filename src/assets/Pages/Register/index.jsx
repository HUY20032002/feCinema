import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/apiRequest";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [isShow, setShow1] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Họ và tên không được để trống";
    if (!email.trim()) newErrors.email = "Email không được để trống";
    if (!password.trim()) newErrors.password = "Password không được để trống";
    if (!phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
    if (!birth.trim()) newErrors.birth = "Ngày sinh không được để trống";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const data = { email, password, phone, name, birth };
    try {
      register(dispatch, data);
      navigate("/login");
      toast.success("Register successful! Please login.");
    } catch (error) {
      console.log(error);
      toast.error("Register failed. Please try again.", error.message);
    }
  };

  return (
    <div className="p-10 w-full">
      <section className="flex items-center justify-center text-2xl p-6">
        <Link to="/">LOGO CINEMA</Link>
      </section>

      <div
        className="items-center border-2 border-black p-10 rounded-lg shadow-lg
          bg-white md:w-2/3 xl:w-1/3 md:mx-auto md:flex
          md:flex-col md:items-center md:justify-center md:mt-10 md:gap-4"
      >
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          {/* Name */}
          <div>
            <label htmlFor="name">Họ và Tên:</label>
            <input
              className={`border-2 rounded-md p-2 w-full ${
                errors.name ? "border-red-500" : "border-black"
              }`}
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className={`border-2 rounded-md p-2 w-full ${
                errors.email ? "border-red-500" : "border-black"
              }`}
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">Password:</label>
            <div className="relative w-full">
              <input
                className={`border-2 rounded-md p-2 w-full ${
                  errors.password ? "border-red-500" : "border-black"
                }`}
                type={isShow ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              <button
                type="button"
                onClick={() => setShow1((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black"
              >
                <FontAwesomeIcon icon={isShow ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone">Số Điện Thoại:</label>
            <input
              className={`border-2 rounded-md p-2 w-full ${
                errors.phone ? "border-red-500" : "border-black"
              }`}
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
              }}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>

          {/* Birth */}
          <div>
            <label htmlFor="birth">Ngày sinh:</label>
            <input
              className={`border-2 rounded-md p-2 w-full ${
                errors.birth ? "border-red-500" : "border-black"
              }`}
              type="date"
              id="birth"
              value={birth}
              onChange={(e) => {
                setBirth(e.target.value);
                if (errors.birth) setErrors((prev) => ({ ...prev, birth: "" }));
              }}
            />
            {errors.birth && (
              <span className="text-red-500 text-sm">{errors.birth}</span>
            )}
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            type="submit"
          >
            Register
          </button>
        </form>

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
