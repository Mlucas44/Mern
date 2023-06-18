const User = require('./../models/userModel')

const getAdminPage = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

module.exports = { getAdminPage }
