const Users = require('../Models/Usuarios');
const jwt =  require('jsonwebtoken');
const config = require('../appConfig');

exports.signUpGoogle = async function(req, res, next){
    const {Name, LastName, Email} = req.body;
    let user;

    let UserCheck = new Users();
    UserCheck = await Users.findOne({Email:Email});
    
    if(UserCheck == null){
        let userModel = new Users({TypeUser:"Alumno"});
    
        userModel.Name = Name;
        userModel.LastName = LastName;
        userModel.Email = Email;
        
        await userModel.save();

        user =  new UserDomain( userModel._id, userModel.Name, userModel.LastName, userModel.TypeUser);
        const token = jwt.sign({user}, config.secret, {expiresIn:  60 * 60 * 24});
        user.Token = token;

        res.status(200).json(user);
    }
    else{
        let userDomain = await Users.findOne({Email:Email});
        let user =  new UserDomain( userDomain._id, userDomain.Name, userDomain.LastName, userDomain.TypeUser);
        const token = jwt.sign({user}, config.secret, {expiresIn:  60 * 60 * 24});
        user.Token = token;

        res.status(200).json(user);
    }
};

exports.signUpSaveUser = async function(req, res, next){
    const {Name, LastName, Email, Password} = req.body;
    if((typeof Name !== 'undefined' && typeof LastName !== 'undefined' && typeof Email !== 'undefined' && typeof Password !== 'undefined') && (Name != '' &&  LastName != '' &&  Email != '' &&  Password != '')){
        let UserCheck = new Users();
        UserCheck = await Users.findOne({Email:Email});
    
        if(UserCheck == null){
            let userDomain = new Users({TypeUser:"Alumno"});
        
            userDomain.Name = Name;
            userDomain.LastName = LastName;
            userDomain.Email = Email;
            userDomain.Password = await userDomain.EncriptPassword(Password);
            
            await userDomain.save();
            res.status(200).json({mensaje:"Success"});
        }
        else{
            res.status(400).json({mensaje:"Usuario ya existente"});
        }
    }
    else{
        res.status(400).json({mensaje:"Tienes campos vacios"});
    }
};

exports.signInAuthUser = async function(req, res, next){
    const {Email, Password} = req.body;
    let userModel = new Users();
    userModel = await Users.findOne({Email:Email});

    if(userModel != null){
        if(await userModel.ValidatePassword(Password) == true){
            let user =  new UserDomain( userModel._id, userModel.Name, userModel.LastName, userModel.TypeUser);
            const token = jwt.sign({user}, config.secret, {expiresIn:  60 * 60 * 24});
            user.Token = token;
    
            res.status(200).json(user);
        }
        else{
            res.status(400).json({mensaje:"Contraseña incorrecta"});
        }
    }
    else{
        res.status(400).json({mensaje:"Correo incorrecto"});
    }
};

exports.authTokenUser = function(req, res, next){
    const token = req.header('Usuario-Token');

    if(typeof token !== 'undefined'){
        jwt.verify(token, config.secret, function(err, data){
            if(err){
                res.status(400).json({Mensaje:"Token Exirado"});
            }
            else{
                res.status(200).json({Mensaje:"Token Valido"});
            }
        });
    }
    else{
        res.status(400).json({Mensaje:"Token no existente"});
    }
};

class UserDomain{
    constructor( id, Name, LastName, TypeUser, Token){
        this.id = id;
        this.Name = Name;
        this.LastName = LastName;
        this.TypeUser = TypeUser;
        this.Token = Token;
    }
}