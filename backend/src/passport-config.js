const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const User = require('./models/user.js');

passport.use('login',new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({username:username});
        if(user == null){
            return done(null, false, {message:"No user with that username"});
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, username);
            }
            else{
                return done(null, false, { message : 'password incorrect'});
            }
        }
        catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((username, done)=>{
    done(null, username)
});
passport.deserializeUser((username,  done) => {
    done(null, username );
});
module.exports = passport;