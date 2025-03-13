import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]); // Add navigate as a dependency

    const collectData = async () => {
        try {
            console.log(name, email, password);
            let result = await fetch('http://localhost:4500/register', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            result = await result.json();
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));
            console.log(result);
            if (result) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="register">
            <h2>This is a sign up menu</h2>
            <input
                className="InputBox"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
            />
            <input
                className="InputBox"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />
            <input
                className="InputBox"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button type="button" onClick={collectData} className="appButton">
                Sign up
            </button>
        </div>
    );
}

export default Signup;
