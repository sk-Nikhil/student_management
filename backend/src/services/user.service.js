const userRepository = require('../repositories/userRepository.js');
const bcrypt = require('bcryptjs');

async function getUserByUsername(username){
    const user = await userRepository.getUserByUsername(username);
    return user;
};

async function addUser(username, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return userRepository.addUser(username, hashedPassword);
};

module.exports = {
    getUserByUsername,
    addUser
};