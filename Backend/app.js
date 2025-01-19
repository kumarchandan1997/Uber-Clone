const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db');

connectToDb();


app.get('/',(req,res)=>{
    res.send(`<h1>Hello every one</h1>`);
});


module.exports = app;