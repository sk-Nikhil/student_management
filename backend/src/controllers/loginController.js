const generateToken = require('../middleware/generateToken');
const passport = require('passport');

async function loginUser(req,res, next){
    passport.authenticate('login',{session:false}, (err, user)=>{
        if(err || !user){
            res.send({failure:"Invalid usrename of password"})
            return;
        }
        req.login(user, {session:false}, (err)=>{
            if(err){
                console.log(err)
                res.send(err)
                return;
            }
            const token = generateToken(user)
            res.send({"success":token})
        })
    })
    (req,res,next);
}

module.exports = {
    loginUser
}