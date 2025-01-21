import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import '../../styles/RegisterStyles.css'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password });
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit} className='form-content'>
                <h2>Register</h2>
                <input className='input-form' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className='input-form' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='input-form' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='btn-primary' type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
