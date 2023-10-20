const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const userService = require('../services/user.service.js');

async function addUser(req,res){
    const {username, password} = {...req.body};
    try{
      const user = await userService.getUserByUsername(username);
      if(user) {
        res.send('user-exists');
        return;
      }
    }
    catch(err){
        console.log(err.msg)
        res.send(err.message);
        return;
    }

    try {
        await userService.addUser(username, password);
        res.status(201).send("successfully added new student");
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}


// async function loginUser(req,res){

//     console.log("sessionid", req.sessionID)
//     console.log("req.session.user",req.session.user)
//     req.session.user = req.body
//     console.log("req.session.user", req.session)
    
//     const {username, password} = {...req.body};

//     // check if the use exist with the username, 
//     // if not send a response with a message
//     // if any error occurs in communicating with database 
//     // send a response with status code 401 and a error message
//     let user;
//     try{
//         user = await userService.getUserByUsername(username);
//         if(!user){
//             res.send({err:"user not found, please check your username"});
//             return;
//         }
//     }
//     catch(err){
//         res.status(401).send({err:err.message});
//     }

//     // after the user with the username is fetched validate password entered by the user
//     // if successfully validated send a response with status code 200 and token generated
//     try{
//         const token = await userService.loginUser(password, user);
//         res.status(200).send({token:token});
//     }
//     catch(err){
//         console.log(err.message);
//         res.send({err:err.message});
//     }
// }


module.exports = {
    addUser,
    // loginUser
};