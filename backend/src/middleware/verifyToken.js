const secretKey = 'thisisthefirsttokeniammakingformyproject';
const jwt = require('jsonwebtoken');

const tokenVerified = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(token) {
        try{
            const decodedToken = jwt.verify(token, secretKey);
            if(decodedToken.type === 'admin'){
                next();
            }
            else{
                // res.redirect('/login')
                res.send({error:"users token has been compromised"});
            }
        }
        catch(err){
            console.log("token verification error", err.message);
            res.send({error:"unverified user"});
        }
    }
    else{
        res.send({error:"unauthorized access"});
    }
}

module.exports = tokenVerified;