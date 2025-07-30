const mongoose = require("mongoose");

const schema =  mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "users",
        require: true
    },
    opt:{
        type:Number,
        require:true
    },
    otpToken: {
        type: String,
        require: true
    },
    purpose:{
        type: String,
        enum:["verify-email","reset-password"],
        require: true
    }
},
 {timestamps:true}
);

const otpModel = mongoose.model("opts", schema);

module.exports = otpModel;
