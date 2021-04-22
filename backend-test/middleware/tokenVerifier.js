const jwt = require('jsonwebtoken')
const { User } = require('../models')

const verifyToken = (token, next) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        return { ...decoded, expired: false }
    } catch (err) {
        if (err) {
            if (err.name == "TokenExpiredError") {
                const decoded = jwt.decode(token);
                if (decoded) {
                    return { ...decoded, expired: true }
                } else return false
            } else return false
        }
    }
}

const tokenValidation = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (token) {
        req.token = token
        try {
            const decodedToken = verifyToken(req.token, next)
            if (!decodedToken) {
                res.status(401).send({
                    "STATUS": "AUTH_UNAUTHORIZED_TOKEN",
                    "MESSAGE": "User does not have token."
                })
            } else if (decodedToken.expired) {
                res.status(401).send({
                    "STATUS": "AUTH_UNAUTHORIZED_TOKEN",
                    "MESSAGE": "User token is expired please re-login."
                })
            } else {
                console.log(decodedToken.data.userId)
                res.locals.id = decodedToken.data.userId
                next();
            }

        } catch (err) {
            res.status(401).send({
                "STATUS": "AUTH_UNAUTHORIZED_TOKEN",
                "MESSAGE": "User token is error, please re-try again."
            })
        }
    } else {
        res.status(401).send({
            "STATUS": "AUTH_UNAUTHORIZED_TOKEN",
            "MESSAGE": "User does not have token."
        })
    }
}
module.exports = tokenValidation