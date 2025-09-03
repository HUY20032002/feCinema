import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isShow, setShow] = useState(false);
    const [isShow2, setShow2] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu trùng khớp
        if (password !== password2) {
            alert('Mật khẩu không khớp!');
            return;
        }

        // Lấy dữ liệu từ localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Kiểm tra email trùng
        const isExist = users.find(u => u.email === email);
        if (isExist) {
            alert("Email đã tồn tại!");
            return;
        }

        // Lưu user mới
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert('Đăng ký thành công!');
        setEmail('');
        setPassword('');
        setPassword2('');
        navigate('/login');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center mt-10 gap-4 
            border-2 border-black w-1/3 mx-auto p-10 rounded-lg shadow-lg bg-white"
        >
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
                className="text-sm text-blue-500"
            >
                {isShow ? "Hide" : "Show"} Password
            </button>

            <label htmlFor="password2">Nhập lại Password:</label>
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
                className="text-sm text-blue-500"
            >
                {isShow2 ? "Hide" : "Show"} Password
            </button>

            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    type="submit"
                >
                    Register
                </button>
            </div>

            <div>
                <a href="/forgot-password" className="text-blue-500 hover:underline">
                    Forgot Password?
                </a>
            </div>
        </form>
    );
}

export default Register;
