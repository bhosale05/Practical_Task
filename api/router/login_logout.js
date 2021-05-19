const express = require('express');
const mongoose  = require('mongoose');
const router = express.Router();
const User = require('../model/user');

function validate(username, res) {
      let error = null;
      if(typeof username != 'string'){
        return {error :  `username is not String for ${username}`};
      } else{
        return username;
      }
}

router.post('/login', (req, res) => {
    let username = req.body.username;
    username = validate(username, res);
    if(username.error) {
        res.status(500).json({error: username.error});
        return;
    } else {
      username = username;
    }
    let password = req.body.password;
    if(username && password) {
        User.findOne({username: username, password: password}, (error,result) => {
          if(!result){
            console.log(`Invalid Username Id or Password!`);
            res.status(500).json({error :`Invalid Ssername Id or Password!`})
          }else{
            console.log(`User loggedin successfully...`);
            res.status(200).json({success :`User loggedin successfully! ${result}`})
          }
        })
    } else{
        console.error(`Please check Username and Password in payload`);
        res.status(500).json({ error: `Please check Username and Password in payload` });
    }
})

router.get('/logout',(req, res) => {
  req.session.destroy((err) => {  
        if(err){  
            console.error(err);
            res.status(500).json({ error: err });
        } else{  
            console.error(`User logged out successfully!`);
            res.status(200).json({ success: `User logged out successfully!` });
        }  
    });
})

module.exports = router