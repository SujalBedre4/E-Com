import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('');
    const naviage = useNavigate();

    // Here, we are adding the property of not adding the url by manually after log in. And it is specifically for the Login and the Sign Up.
    const auth = localStorage.getItem('user')
    useEffect(() => {
        if (auth) {
            naviage('/')
        }
    })
    const handleLogin = async () => {
        console.log(email, password)
        // Here, we are integrating an API for the working model
        let result = await fetch('http://localhost:4500/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        result = await result.json()
        console.log(result)
        if (result.auth) {
            // For storing the data in the Local storage
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.auth))
            naviage("/")
        }
        else {
            alert("Please enter correct details")
        }
    }
    return (<>
        <div className="login">
            <h1>Login Page</h1>
            <input className="InputBox" type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email" />
            <input className="InputBox" type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    </>)
}

export default Login