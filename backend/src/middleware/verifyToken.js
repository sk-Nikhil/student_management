const secretKey = 'thisisthefirsttokeniammakingformyproject'
const jwt = require('jsonwebtoken')

const tokenVerified = (req, res, next) => {
    const token = req.headers.authorization
    try{
        const decodedToken = jwt.verify(token, secretKey)
        if(decodedToken.type){
            console.log("token verified")
            next()
        }
    }
    catch(e){
        console.log("token verification error", e)
    }
}

module.exports = tokenVerified