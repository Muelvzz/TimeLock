import '../css/auth.css';
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Sign_up(){

    const [password, setPassword] = useState("")

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const regex = /\d/;

    const hasProperLength = password.length >= 8 && password.length <= 72;
    const hasDigit = regex.test(password);
    const hasUpperLower = hasUppercase && hasLowercase;

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

                        <form action="">
                            <div className="input-group">
                                <input type="text" placeholder="Create Username" required />
                            </div>
                            <div className="input-group">
                                <input type="email" placeholder="Enter your email" required />
                            </div>
                            <div className="input-group">
                                <input 
                                    type="password" 
                                    placeholder="Enter your password" required
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <button className="save-btn">Sign-up</button>
                            <p className='login-link'> <Link to='/login'>Already have an account?</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};