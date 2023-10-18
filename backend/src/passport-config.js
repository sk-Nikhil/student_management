const passport = require('passport  ')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user.js')

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
passport.serializeUser((user, done)=>{
    if(user) done(null, user._id)
});

passport.deserializeUser((id, done)=>{
    User.findById(id, function(err, user){
        done(err,user)
    })
});

passport.use(new LocalStrategy(authenticateUser));

module.exports = initialize