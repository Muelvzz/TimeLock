import '../css/auth.css';

export default function Login(){

    return (
        <>
            <div className="auth-page">
                <div className="auth-box">
                    <img src="\logo.png" alt="TimeLock logo" className="logo" />
                    <h1>Login</h1>

                    <div className="form-section">

                        <form action="">
                            <div className="input-group">
                                <input type="email" placeholder="Enter your email" required />
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Enter your password" required />
                            </div>

                            <button className="save-btn">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};