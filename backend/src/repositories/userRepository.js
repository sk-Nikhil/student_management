const User = require('../models/user.js');

async function getUserByUsername(username){
    try {
        return await User.findOne({username:username});
    } catch (error) {
        // throws a error with a user defined error message if there is communication error with the database
        throw Error("unable to fetch user");
    }
};

async function addUser(username, hashedPassword){
    const user = new User({
        username:username, password:hashedPassword, type:'admin'
    });
    try{
        await user.save();
        return ("success");
    }
    catch(e){
        throw Error("unable to add user");
    }
};

module.exports = {
    getUserByUsername,
    addUser
};