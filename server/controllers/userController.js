const mongoose = require('mongoose')
const User = require("./../models/userModel")
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SCRET, { expiresIn: '3d' });
}

//inscription d'un new user
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


//connexion d'un user
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

// récupère les infos de l'user connecté 
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) throw Error('User not found');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// vérifie l'email
const checkEmail = async (req, res) => {
    const checkEmail = await User.findOne({ email: req.params.email });
    if (checkEmail) {
        res.status(200).send({ exists: true });
    } else {
        res.status(200).send({ exists: false });
    }
};

// récupère tous les users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// ajoute un user
const addUser = async (req, res) => {
    const { name, email, username, password, role } = req.body;

    try {
        const user = await User.addUser(name, email, username, password, role);
        // Return the newly created user
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//modifie un utilisateur 
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!user) throw Error('User not found');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// supprime un user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) throw Error('User not found');
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { signupUser, loginUser, getUserInfo, checkEmail, getAllUsers, addUser, updateUser, deleteUser}