const secretKey = 'thisisthefirsttokeniammakingformyproject'
const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    const user = {username:payload.username, type:payload.type}
    const token = jwt.sign(user,secretKey, { expiresIn: '1h' });
    return token
}

module.exports = generateToken