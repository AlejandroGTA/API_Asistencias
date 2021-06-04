const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const MaestrosSchema = new Schema({
    Name:String,
    LastName:String,
    Email:String,
    Password:String
});

MaestrosSchema.methods.EncriptPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

MaestrosSchema.methods.ValidatePassword = async function(password){
    return bcrypt.compare(password, this.Password);
};

module.exports = model('MaestrosModel', MaestrosSchema);