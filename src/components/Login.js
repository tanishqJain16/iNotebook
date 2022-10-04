import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    let navigate = useNavigate()
    const [creds, setCreds] = useState({ Email: "", password: "" })
    const host = "http://localhost:5000"
    const handlesubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: creds.Email, password: creds.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            props.showAlert("Successfully Login", "success")
        }
        else {
            props.showAlert("Wrong Credentials", "danger")
        }
    }
    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }
    return (
            <div className='container mt-3'>
                <h2>Login to continue with iNotebook</h2>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3 my-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={creds.Email} onChange={onchange} id="Email" name="Email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={creds.password} onChange={onchange} id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            )
}

            export default Login
