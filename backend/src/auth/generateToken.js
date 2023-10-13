const secretKey = 'thisisthefirsttokeniammakingformyproject'
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    const {username, type} = {...user}
    const token = jwt.sign({username, type},secretKey, { expiresIn: '1h' });
    return token
}

module.exports = generateToken  