import '../css/auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const credentials = { email, password }
        
        try {
            const res = await fetch("http://127.0.0.1:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })

            if (!res.ok) {
                const errText = await res.text()
                throw new Error(errText || res.statusText)
            }

            const data = await res.json()
            navigate(data.redirect)

            console.log(`Server response: ${data}`)
            setStatus("Signup sent ✔");

        } catch (err) {
            console.error(`Login error: ${err}`)
            setStatus(`Error: ${err.message}`)
        }
    }


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