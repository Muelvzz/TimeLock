import '../css/auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    fetch("http://127.0.0.1:5000/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token)
                alert("Login successful!");
            } else {
                alert(data.error || "Login failed")
            }
        })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                // Clear form
                setEmail("");
                setPassword("");
                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong, try again later');
        }
    };


    return (
        <>
            <div className="auth-page">
                <div className="auth-box">
                    <img src="\logo.png" alt="TimeLock logo" className="logo" />
                    <h1>Login</h1>

                    <div className="form-section">

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <input 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>

                            <button className="save-btn" type="submit">Login</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};