const mongoose = require("mongoose");


// const { default: mongoose, Schema } = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type:String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
},
 {timestamps:true}
);

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;
