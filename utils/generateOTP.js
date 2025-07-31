const generateOTP = ()=>
    Math.floor(Math.random() * 1000000);
//  console.log(generateOTP());
 
module.exports = generateOTP;
