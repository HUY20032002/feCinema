import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dataBase = [
        { email: 'huy@gmail.com', password: '123456' },
        { email: 'cc3m@gmail.com', password: '123456' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý đăng nhập ở đây
        console.log('Email:', email);
        console.log('Password:', password);

        // Kiểm tra đăng nhập
        const user = dataBase.find(
            (user) => user.email === email && user.password === password
        );
        if (user) {
            alert('Đăng nhập thành công!');
        } else {
            alert('Sai email hoặc mật khẩu!');
        }
        // Reset form
        setEmail('');
        setPassword('');
        navigate('/');
    };

    return (
        <>
            <form onSubmit={handleSubmit} 
            className='flex flex-col items-center justify-center mt-10 gap-4 
            border-2 border-black w-1/3 mx-auto p-10 rounded-lg shadow-lg
            bg-white
            '>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                <label htmlFor="email">Email:</label>
                <input
                    className='border-2 border-black rounded-md p-2 w-full'
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                                    className='border-2 border-black rounded-md p-2 w-full'

                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="">   
                    <button className='mx-3' type="submit">Login</button>
                    <button  className='mx-3'type="submit">Register</button>
                </div>     
                <div className="">
                    <a href="#" className='text-blue-500'>Forgot Password?</a>
                </div>
            </form>
        </>
    );
}

export default Login;