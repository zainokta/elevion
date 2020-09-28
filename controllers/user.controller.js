const { User } = require('../models')

exports.getProfile = async(req, res) => {
    const user = await User.findOne({
        where: {
            id: req.user.id
        },
        attributes: {
            exclude: ['password']
        }
    })
    res.jsend.success(user)
}