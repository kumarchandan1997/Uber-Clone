const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
 
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send(`<h1>Hello every one</h1>`);
});

app.use('/users',userRoutes);


module.exports = app;