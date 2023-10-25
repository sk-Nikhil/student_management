const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const User = require('./models/user.js');


const initializePassport = (passport)=>{
    passport.use('login',new LocalStrategy(
        async (username, password, done) => {
            const user = await User.findOne({username});
            if(user == null){
                return done(null, false);
            }

            try {
                if(await bcrypt.compare(password, user.password)){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            }
            catch (error) {
                console.log(error.message)
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

    // Define the JWT strategy
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "thisisthefirsttokeniammakingformyproject"
      }, async (jwtPayload, done) => {
        try{
            const user = await User.findById({_id:jwtPayload.id})
            if(user){
                console.log(user)
                return done(null, user)
            }
            console.log("unverified")
            return done(null, false,{message:"unverified user"})    
        }
        catch(err){
            console.log(err)
            return done(null, false )
        }
        // You can use jwtPayload to find the user in your database
        // Example: User.findById(jwtPayload.sub, (err, user) => {...})
      }));
}

module.exports = initializePassport;