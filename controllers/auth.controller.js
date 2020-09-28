const {
    asyncHandler,
    generateTokens,
    upsert
} = require('../lib/helpers')
const bcrypt = require('bcryptjs')

const {
    User,
    Token
} = require('../models')
const salt = bcrypt.genSaltSync(10);

exports.register = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        password_confirmation,
        gender
    } = req.body

    if (!name || !email || !password || !password_confirmation || !gender) {
        return res.status(400).jsend.error({
            message: 'Please fill all required field.'
        })
    }

    if (gender !== 'male' && gender !== 'female') {
        return res.status(400).jsend.error({
            message: 'Please provide correct gender,'
        })
    }

    if(password.length < 6){
        return res.status(400).jsend.error({
            message: 'Password must be at least 6 characters.'
        })
    }

    if (password !== password_confirmation) {
        return res.status(400).jsend.error({
            message: 'Password confirmation did\'nt match.'
        })
    }

    const hashedPass = bcrypt.hashSync(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPass,
        gender: gender
    }).catch(err => {
        console.log(err)
        return res.status(400).jsend.error({
            message: 'Email address already in use'
        });
    })

    const token = await generateTokens(user);

    await Token.create({
        user_id: user.id,
        token: token
    })

    return res.jsend.success({
        token: token
    })

})

exports.login = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        return res.status(400).jsend.error({
            message: 'Invalid credentials'
        })
    }

    const user = await User.findOne({
        where: {
            email: email.toLowerCase(),
        },
    });

    if (!user) {
        return res.status(404).jsend.error({
            message: 'User not found!'
        })
    }

    let token

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (checkPassword) {
        token = await generateTokens(user);

        await upsert({
            token: token,
            user_id: user.id
        }, {
            user_id: user.id
        }, Token)
    } else {
        return res.status(404).jsend.error({
            message: "Password not match",
        });
    }

    res.jsend.success({
        token: token
    })
})