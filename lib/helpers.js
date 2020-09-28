const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET;
const expired = process.env.JWT_EXPIRE;


exports.asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

exports.generateTokens = async (user) => {
    const token = jwt.sign({
            id: user.id,
        },
        secretKey, {
            expiresIn: expired,
        }
    );
    return token;
};

exports.upsert = async (values, condition, MODEL) => {
    return MODEL.findOne({
      where: condition,
    }).then(function (obj) {
      if (obj) return obj.update(values);
  
      return MODEL.create(values);
    });
  };