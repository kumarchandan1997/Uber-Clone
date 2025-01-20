const userModel = require('../models/user.model');
const userService = require('../services/userService');
const {validationResult} = require('express-validator');
const BlacklistToken = require('../models/blacklistTokenModel');

module.exports.registerUser = async (req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password} = req.body;

    const hasPassword = await userModel.hasPassword(password);

    const userData = await userModel.findOne({email});

    if(userData){
       return res.status(409).json({
        'message':"Email al-ready use !"
       });
    }

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hasPassword
    });

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(201).json({
        token,user
    })
    
}

module.exports.userLogin = async (req,res,next) =>{

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'Invalid email or password !'});
    }

    const isMatch =await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password !'});
    }

    const token = user.generateAuthToken();

    res.status(200).json({token,user});
}

module.exports.getUserProfile = async (req,res,next) =>{
    res.status(200).json(req.user);
}

module.exports.userLogout = async (req,res,next) =>{
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];

  await BlacklistToken.create({token});

  res.status(200).json({message:'Logout successfully !'});
}