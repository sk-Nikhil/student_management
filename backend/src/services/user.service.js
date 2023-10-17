const userRepository = require('../repositories/userRepository.js')
const bcrypt = require('bcryptjs')
const generateToken = require('../middleware/generateToken.js')

async function getUserByUsername(username){
    const user = await userRepository.getUserByUsername(username)
    return user
}

async function addUser(username, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return userRepository.addUser(username, hashedPassword)
}


async function loginUser(password, user){
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid) {
        const token = generateToken(user)
        return token
    }
    else{
        throw Error("incorrect password")
    }
}

module.exports = {
    getUserByUsername,
    addUser,
    loginUser
}