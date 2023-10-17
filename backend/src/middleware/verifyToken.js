const secretKey = 'thisisthefirsttokeniammakingformyproject'
const jwt = require('jsonwebtoken')

const tokenVerified = (req, res, next) => {
    const token = req.headers.authorization
    try{
        const decodedToken = jwt.verify(token, secretKey)
        if(decodedToken.type === 'admin'){
            next()
        }
        else{
            router.push('/signup')
        }
    }
    catch(e){
        console.log("token verification error", e)
    }
}

module.exports = tokenVerified