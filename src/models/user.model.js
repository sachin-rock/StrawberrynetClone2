
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const adminSchema = new mongoose.Schema({
    name:{type : String },
    email : {type : String, required : true, unique:true},
    password : {type : String, required : true},
    role : {type:String,enum : ["admin","customer"],default:"customer"}
},{
    timestamps : true,
    versionKey : false,
})

adminSchema.pre("save", function(next){
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

adminSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password); //login nn varnna pasword,Hashed varnn
}


const Admin = mongoose.model("user", adminSchema)

module.exports = Admin;