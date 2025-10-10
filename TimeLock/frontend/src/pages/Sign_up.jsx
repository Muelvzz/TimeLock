import '../css/auth.css';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function Sign_up(){

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState(null)

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const regex = /\d/;

    const hasProperLength = password.length >= 8 && password.length <= 72;
    const hasDigit = regex.test(password);
    const hasUpperLower = hasUppercase && hasLowercase;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const credentials = { username, email, password }
        
        try {
            const res = await fetch("http://127.0.0.1:5000/api/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })

            if (!res.ok) {
                const errText = await res.text()
                throw new Error(errText || res.statusText)
            }

            const data = await res.json()
            console.log(`Server response: ${data}`)
            setStatus("Signup sent ✔");

        } catch (err) {
            console.error(`Signup error: ${err}`)
            setStatus(`Error: ${err.message}`)
        }
    }

    return (
        <>
            <div className="auth-page">
                <div className="auth-box">
                    <img src="\logo.png" alt="TimeLock logo" className="logo" />
                    <h1>Sign-up</h1>

                    <div className="form-section">
                        <ul className="rules">
                            <li className={hasProperLength ? "valid" : "invalid" } >between 8 to 72 characters</li>
                            <li className={hasUpperLower ? "valid" : "invalid" } >lower and upper case letters</li>
                            <li className={hasDigit ? "valid" : "invalid" } >at least one number</li>
                        </ul>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Create Username"
                                    onChange={(e) => setUsername(e.target.value)} 
                                    value={username}
                                    required />
                            </div>
                            <div className="input-group">
                                <input 
                                    type="email"
                                    placeholder="Enter your email" 
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required />
                            </div>
                            <div className="input-group">
                                <input 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password} />
                            </div>

                            <button className="save-btn" onClick={handleSubmit} >Sign-up</button>
                            <p className='login-link'> <Link to='/login'>Already have an account?</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};