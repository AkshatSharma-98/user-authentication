import React, { useEffect, useState } from 'react';
import './registerForm.css'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('activeUser')
        if (user) navigate('/')
        return
    })

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
        phoneNo: "",
        dob: ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const registerUser = async () => {
        const { name, email, password, reEnterPassword, phoneNo, dob } = user
        if (name && email && password && reEnterPassword && phoneNo && dob) {
            if ((password === reEnterPassword) && !isNaN(phoneNo)) {
                await fetch(`/api/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        phoneNo,
                        dob
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === 'success') {
                            alert('User Registered Successfully')
                            navigate('/login')
                        } else {
                            alert('ERROR : ' + data.message)
                        }
                    })
            }
        } else {
            alert('Kindly Enter Valid Credentials')
        }
    }

    return (
        <section className='form'>
            <h1>REGISTER USER</h1>
            <input type='text'
                name='name'
                placeholder='Enter your Name'
                onChange={e => handleChange(e)}
            />
            <input type='email'
                name='email'
                placeholder='Enter your e-mail'
                onChange={e => handleChange(e)}
            />
            <input type='password'
                name='password'
                placeholder='Enter your password'
                onChange={e => handleChange(e)}
            />
            <input type='password'
                name='reEnterPassword'
                placeholder='Re-Enter your password'
                onChange={e => handleChange(e)}
            />
            <input type='tel'
                name='phoneNo'
                placeholder='Enter your Phone No.'
                onChange={e => handleChange(e)}
            />
            <input type='date'
                name='dob'
                onChange={e => handleChange(e)}
            />
            <button type='submit' onClick={registerUser}>REGISTER</button>
        </section>
    );
}

export default Register;
