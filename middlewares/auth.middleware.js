const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../lib/helpers')
const { User, Token } = require('../models')
const { JWT_SECRET } = process.env

exports.authenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.get('Authorization')
    let token;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]
    }
    if (!token) {
        return res.status(401).json({
            message: "Not Authenticated"
        })
    }
    
    try {
        let verify = jwt.verify(token, JWT_SECRET)
        req.user = await User.findOne({
            where: {
                id: verify.id
            }
        })
    } catch (error) {
        res.status(401).json({
            message: "Not Authenticated"
        })
    }

    let tokenFromDB = await Token.findOne({
        where: {
            user_id: req.user.id
        }
    })
    
    if(!tokenFromDB){
        return res.status(401).json({
            message: "Not Authenticated"
        })
    }

    if (token !== tokenFromDB.token) {
        return res.status(401).json({
            message: "Not Authenticated"
        })
    }

    next()
})