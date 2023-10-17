const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user.js')

function initialize(passport, getUserByUsername){
    const authenticateUser = async (username, password, done) =>{
        const user = await User.findOne({username:username});
        if(user == null){
            return done(null, false, {message:"No user with that username"});
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
            else{
                return done(null, false, { message : 'password incorrect'})
            }
        }
        catch (error) {
            return done(error)
        }

    }
    passport.use(new LocalStrategy({usernameField:'username'}), authenticateUser);
    passport.serializeUser((user, done)=>{});
    passport.deserializeUser((id, done)=>{});
}


module.exports = initialize