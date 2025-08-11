const mongoose = require('mongoose')
const conn = mongoose.connect('mongodb://localhost:27017/myData')

conn.then(()=>{
    console.log("Connection successfull")
}).catch(()=>{
    console.log("Unsuccesfull")
})


const userSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true},
    Tel: { type: String, required: true },
    Password: { type: String, required: true }
})

// export const collection = mongoose.model('Forms',loginSchema)

const User = mongoose.model('User', userSchema);
module.exports = User;
