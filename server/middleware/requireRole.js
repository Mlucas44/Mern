const User = require('./../models/userModel');

const requireRole = role => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id);
            if (user && user.role === role) {
                next();
            } else {
                res.status(403).json({ error: 'Forbidden' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
};

module.exports = requireRole;
