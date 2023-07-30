const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    // const tasks = await Task.find({})
    const { name, email,  password } = req.body

    if(!name || !password || !email) {
        res.status(400)
        throw new Error("Please as all fields")
    }
    const userExist = await User.findOne({email})

    if(userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    // hash the password

    const salt  = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password: hashedPass,
        
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalide] user Data")
    }

})

const loginUser = asyncHandler(async (req, res) => {
    // const tasks = await Task.find({})
    const  {email, password } = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error("Invalide credentials")
    }
   
})

const getMe = asyncHandler(async (req, res) => {
    // const tasks = await Task.find({})
    // const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json(req.user)
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}