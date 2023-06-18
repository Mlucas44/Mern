const mongoose = require('mongoose')
const User = require("./../models/userModel")
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SCRET, { expiresIn: '3d' });
}

//singnup user
const signupUser = async (req, res) => {

    const { name, email, username, password, role } = req.body;

    try {
        const user = await User.signup(name, email, username, password, role);

        //creating jwt token
        const token = createToken(user._id);

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const name = user.name;
        //creating jwt token
        const token = createToken(user._id);
        res.status(200).json({ name, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) throw Error('User not found');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { signupUser, loginUser, getUserInfo }