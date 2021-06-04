const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    Name:String,
    LastName:String,
    Email:String,
    Password:String,
    TypeUser:String
});

UsuarioSchema.methods.EncriptPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

UsuarioSchema.methods.ValidatePassword = async function(password){
    return bcrypt.compare(password, this.Password);
};

module.exports = model('UsuariosModel', UsuarioSchema);