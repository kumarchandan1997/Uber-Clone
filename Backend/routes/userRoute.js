const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/userController');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must at least 6 character long')
],userController.registerUser);




module.exports = router;