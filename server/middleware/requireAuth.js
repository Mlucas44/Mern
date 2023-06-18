const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const requireAuth = async (req, res, next) => {
    //verify authentication

    const { authorization } = req.headers;
    console.log(authorization)
    if (!authorization) {
        return res.status(401).json({ error: "authorization token required" })
    }
    const token = authorization.split(' ')[1];
    console.log(token)
    try {
        const { _id } = jwt.verify(token, process.env.SCRET)

        req.user = await User.findOne({ _id }).select('_id');

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "request is not authorized" })
    }

}

module.exports = requireAuth