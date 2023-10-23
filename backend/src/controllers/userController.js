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

module.exports = {
    addUser
};