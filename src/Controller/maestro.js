const Usuarios = require('../Models/Usuarios');
const Evento = require('../Models/Eventos');
const jwt = require('jsonwebtoken');
const qrcode = require("qrcode");
const config = require('../appConfig');

let url = config.API_URL;

exports.postEventos = async function(req, res, next){
    let {NameEvent, MaestroId, TiempoInicio, TiempoExpiracion, Localizacion} = req.body;
    
    let checkAulaExistent = await Evento.find({NameEvent, MaestroId});

    if(checkAulaExistent.length == 0){
        let newAula = new Evento();
          
        newAula.NameEvent = NameEvent;
        newAula.MaestroId = MaestroId;
        newAula.TiempoInicio = new Date(TiempoInicio);
        newAula.TiempoExpiracion = new Date(TiempoExpiracion);
        newAula.Localizacion = Localizacion;
        newAula.Asistencia = [];
        let datosQR =  `
            {
                "Name":"${NameEvent}",
                "EventoId":"${newAula._id}",
                "Url":"${url}"
            }
        `;
        const QR = await qrcode.toDataURL(datosQR);
        newAula.QR = QR;
        await newAula.save();
        res.status(200).json({Mensaje:"Success"});
    }
    else{
        res.status(400).json({Mensaje:"Evento ya existente"});
    }
};

exports.getQRPagina = async function(req, res, next){
    try {
        const QR = await qrcode.toDataURL(req.body.URL,{
            errorCorrectionLevel: 'H',
            width : "250"
        });
        res.status(200).json({QR});
    } catch (error) {
        res.status(400).json({Mensaje:"Error al generar codigo"});
    } 
};

exports.getAllEventos = async function(req, res, next){
    let MaestroId = req.params.id;
    
    try {
        let eventos = await Evento.find({MaestroId});
        res.status(200).json(eventos);
    } catch (error) {
        res.status(400).json({Mensaje:"No se encontro eventos con el ID proporcionado"});
    }
};

exports.putEventos = async function(req, res, next){
    let id = req.params.id;
    const {NameEvent, TiempoInicio, TiempoExpiracion, Localizacion} = req.body;
    try {
        let eventoDomain = new Evento();
        eventoDomain = await Evento.findOneAndUpdate(
            {_id: id},
            {
                NameEvent: NameEvent,
                TiempoInicio: new Date(TiempoInicio),
                TiempoExpiracion: new Date(TiempoExpiracion),
                Localizacion
            }
        );
    
        res.status(200).json({Mensaje:"Success"});
    } catch (error) {
        res.status(400).json({Mensaje:"Hubo un error"});
    }
};

exports.deleteEvento = async function(req, res, next){
    let id = req.params.id;
    
    try{
        await Evento.findOneAndDelete({_id:id});
        res.status(200).json({Mensaje:"Success"});
    }
    catch(error){
        res.status(400).json({Mensaje:"Id invalido"});
    }
    
};

exports.getAsistenciaEvento = async function(req, res, next){
    let id = req.params.id;
    let eventoDomain = new Evento();
    eventoDomain = await Evento.find({_id:id});
    if(eventoDomain.length != 0){
        res.status(200).json(eventoDomain);
    }
    else{
        res.status(400).json({Mensaje:"Id invalido"});
    }
};

exports.authUser = function(req, res, next){
    const token = req.header('Usuario-Token'); 
    if(typeof token !== 'undefined'){
        jwt.verify(token, config.secret, async function(err, data){
            if(err){
                res.status(400).json({Mensaje:"Token Exirado"});
            }
            else{
                let user;
                try {
                    user = await Usuarios.findOne({_id:data.user.id});
                    
                } catch (error) {
                    res.status(400).json({mensjae:"Id invalido"});
                }

                if(user.TypeUser == "Maestro"){
                    next();
                }
                else{
                    res.status(400).json({mensaje:"Accion Invalida"});
                }
            }
        });
    }
    else{
        res.status(400).json({Mensaje:"Token no existente"});
    }
};
