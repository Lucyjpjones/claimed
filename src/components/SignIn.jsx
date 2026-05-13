import { useState } from "react"
import "./SignIn.css"
import { FaEye, FaEyeSlash } from "react-icons/fa"


function SignIn({ onSubmit }) {
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(FaEyeSlash);

    const handleSubmit = () => {
        onSubmit?.({ date, time, people })
    }

    const handleTogglePassword = () => {
        if (type === 'password') {
            setIcon(FaEye);
            setType('text')
        } else {
            setIcon(FaEyeSlash)
            setType('password')
        }
    }

    return (
        <div className="signInContainer">
            <div className="inputGroup">
                <label className="inputLabel">Username</label>
                <input
                    className="signInInput"
                />
            </div>

            <div className="inputGroup">
                <label className="inputLabel">Password</label>
                <div className="inputWrapper">
                    <input
                        className="signInInput"
                        type={type}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <span class="inputIcon" onClick={handleTogglePassword}>
                        {icon}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignIn