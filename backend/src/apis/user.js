const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

const generateToken = require('../auth/generateToken.js')

router.post('/login', async(req,res)=>{
    const {username, password} = {...req.body}

    try{
        const user = await User.findOne({username:username})
        if(!user){
            res.send("not-authorized")
            return
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        let token
        if (isPasswordValid) {
            console.log("authorized")
            token = generateToken(user)
            res.send(token)
        }
        else {
            console.log("unauthorized")
            res.send();
        }
    }
    catch(e){
        console.log("catch")
        res.status(401).send(e)
    }
})


// router.get('/getUser', async(req,res)=>{
//     try{
//         const user = await User.find({username:username})
//         res.status(201).send(user)
//     }
//     catch(e){
//         res.status(401).send(e)
//     }
// })

router.post('/addUser', async(req,res)=>{
    const {username, password} = {...req.body}

    const saltRounds = 10; // Adjust the number of salt rounds as needed

    let user={}
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
            // Handle error
            } else {
                user = new User({
                    username:username, password:hash, type:'admin'
                })

                try{
                    await user.save()
                    res.status(201).send(user)
                }
                catch(e){
                    res.status(400).send(e)
                }
            }
        });
    });

    
})

module.exports = router