import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('activeUser')
        if (user) navigate('/')
        return
    })

    const [user, setUser] = useState({
        email: "",
        newPassword: "",
        reEnterNewPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const updatePassword = () => {
        const { email, newPassword, reEnterNewPassword } = user
        if (email && newPassword && reEnterNewPassword && (newPassword === reEnterNewPassword)) {
            fetch('/api/updatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    newPassword
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Password Updated Successfully')
                        navigate('/login')
                    } else {
                        alert('Error => ' + data.error)
                    }
                })
        } else {
            alert('Kindly Enter Valid Credentials')
        }
    }

    return (
        <div className='form'>
            <h1>UPDATE YOUR PASSWORD</h1>
            <input
                type='email'
                name='email'
                placeholder='Enter your e-mail'
                onChange={e => handleChange(e)}
            />
            <input
                type='password'
                name='newPassword'
                placeholder='New password'
                onChange={e => handleChange(e)}
            />
            <input
                type='password'
                name='reEnterNewPassword'
                placeholder='Re-enter New password'
                onChange={e => handleChange(e)}
            />
            <button type="submit" onClick={updatePassword}>UPDATE PASSWORD</button>
        </div>
    );
}

export default UpdatePassword;
