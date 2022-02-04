import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login({ setActiveUser }) {

    const navigate = useNavigate()

    useEffect(() => {
        const activeUser = localStorage.getItem('activeUser')
        if (activeUser) navigate('/')
        return;
    })

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const loginUser = () => {
        const { email, password } = user
        if (email && password) {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('User Logged In Successfully')
                        setActiveUser({ _id: data._id })
                        localStorage.setItem('activeUser', data._id)
                        navigate('/')
                    } else {
                        alert('ERROR : ' + data.message)
                    }
                })
        }
    }

    return (
        <section className='form'>
            <h1>LOG IN HERE</h1>
            <input type="email"
                name="email"
                placeholder='Enter your e-mail'
                onChange={e => handleChange(e)}
            />
            <input type="password"
                name="password"
                placeholder='Enter your password'
                onChange={e => handleChange(e)}
            />
            <button onClick={loginUser}>LOG IN</button>
        </section>
    );
}

export default Login;
