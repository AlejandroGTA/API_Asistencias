const Usuarios = require('../Models/Usuarios');
const config = require('../appConfig');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async function(req, res, next){
    let usuarios = await Usuarios.find({},{Password:0, Email:0});

    res.status(200).json(usuarios);
};

exports.putUsuario = async function(req, res, next){
    let usaurioId = req.params.id;
    let mensaje = "";
    const {NameUsuario, LastNameUsuario, TypeUsuario} = req.body;
    try{
        await Usuarios.findOneAndUpdate({
            _id:usaurioId
        },{
            "Name": NameUsuario,
            "LastName": LastNameUsuario,
            "TypeUser": TypeUsuario
        });
        mensaje = "Actualizado";
        res.status(200).json({Mensaje:mensaje});
    }
    catch{
        mensaje = "No se completo la actualizacion";
        res.status(400).json({Mensaje:mensaje});
    }
};

exports.deleteUsuario = async function(req, res, next){
    let usaurioId = req.params.id;
    let mensaje = "";
    try{
        await Usuarios.findOneAndDelete({
            _id:usaurioId
        });
        mensaje = "Eliminado";
        res.status(200).json({Mensaje:mensaje});
    }
    catch{
        mensaje = "No se completo la eliminación";
        res.status(400).json({Mensaje:mensaje});
    }
}

exports.authUser = function(req, res, next){
    const token = req.header('Usuario-Token'); 
    if(typeof token !== 'undefined'){
        jwt.verify(token, config.secret, function(err, data){
            if(err){
                res.status(400).json({Mensaje:"Token Exirado"});
            }
            else{
                next();
            }
        });
    }
    else{
        res.status(400).json({Mensaje:"Token no existente"});
    }
};