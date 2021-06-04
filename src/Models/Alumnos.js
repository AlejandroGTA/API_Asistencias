const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const AlumnosSchema = new Schema({
    Name:String,
    LastName:String,
    Email:String,
    Password:String
});

AlumnosSchema.methods.EncriptPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

AlumnosSchema.methods.ValidatePassword = async function(password){
    return bcrypt.compare(password, this.Password);
};

module.exports = model('AlumnosModel', AlumnosSchema);