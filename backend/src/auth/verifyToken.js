const secretKey = 'thisisthefirsttokeniammakingformyproject'
const jwt = require('jsonwebtoken')

const tokenVerified = (req, res, next) => {
    const token = req.headers['Authorization']
    try{
        const decodedToken = jwt.verify(token, secretKey)
        console.log(decodedToken)
        next()
    }
    catch(e){
        console.log("token verification error", e)
    }
}

module.exports = tokenVerified