const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// It's a secret/private key
const JWT_SECRET_KEY = require('../../config/keys').JWT_SECRET

//mongoose schema
const Users = require('../../models/Users')

// METHOD -> GET USERS ================
router.get('/users', async (req, res) => {
    const users = await Users.find()
    res.json(users)
})

// METHOD -> USER LOGIN ================
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await Users.findOne({ email: email }).lean()
    if (!user) {
        return res.json({ status: 'invalid', message: 'No Such User Exists' })
    } else {
        if (await bcrypt.compare(password, user.password)) {
            return res.json({ status: 'success', _id: user._id })
        } else {
            return res.json({ status: 'invalid', message: 'Invalid Credentials' })
        }
    }
})

// METHOD -> REGISTER NEW USER ================
router.post('/register', async (req, res) => {
    const { name, email, password, phoneNo, dob } = req.body
    const user = await Users.findOne({ email: email })

    if (user) {
        return res.json({ status: 'duplicate', message: 'User Already Exists' })
    } else {
        const encryptedPassword = await bcrypt.hash(password, 10)
        const token = jwt.sign({ email: email, name: name }, JWT_SECRET_KEY)
        const newUser = new Users({
            name,
            email,
            password: encryptedPassword,
            phoneNo,
            dob,
            token: token
        })
        await newUser.save(err => {
            if (err) {
                return res.send({ status: 'error', message: err.message })
            } else {
                return res.send({ status: 'success' })
            }
        })
    }
})

router.post('/updatePassword', async (req, res) => {
    const { email, newPassword } = req.body
    const user = await Users.findOne({ email })
    if (!user) {
        return res.json({ status: 'invalid', message: 'User Not Found' })
    } else {
        jwt.verify(user.token, JWT_SECRET_KEY, async err => {
            if (err) {
                return res.json({ status: 'error', message: err.message })
            } else {
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                await Users.updateOne({ email }, {
                    $set: { password: hashedPassword }
                })
                return res.json({ status: 'success' })
            }
        })
    }
})



module.exports = router