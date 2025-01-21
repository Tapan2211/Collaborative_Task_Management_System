import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import '../../styles/RegisterStyles.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token } = await loginUser({ email, password });
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit} className='form-content'>
                <h2>Login From</h2>
                <input className='input-form' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='input-form' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='btn-primary' type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
