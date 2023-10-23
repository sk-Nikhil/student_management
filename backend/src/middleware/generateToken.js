// const secretKey = 'thisisthefirsttokeniammakingformyproject'
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const user = {id:payload._id, type:payload.type};
    const token = jwt.sign(user,process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
}

module.exports = generateToken;