const mongoose = require('mongoose');


const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        unique:true,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:8600
    }
});

module.exports = mongoose.model('BlacklistToken',blacklistTokenSchema);