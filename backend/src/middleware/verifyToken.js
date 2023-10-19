const secretKey = 'thisisthefirsttokeniammakingformyproject';
const jwt = require('jsonwebtoken');

const tokenVerified = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        try{
            const decodedToken = jwt.verify(token, secretKey);
            if(decodedToken.type === 'admin'){
                next();
            }
            else{
                res.send({invalidToken:"unauthorized access"});
            }
        }
        catch(err){
            console.log("token verification error", err.message);
            res.send({invalidToken:err.message});
        }
    }
    else{
        res.send({invalidToken:"unauthorized access"});
    }
}

module.exports = tokenVerified;