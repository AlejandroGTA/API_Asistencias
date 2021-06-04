const Maestro = require('../Models/Maestros');
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

exports.getAllEventos = async function(req, res, next){
    let MaestroId = req.params.id;

    let eventos = await Evento.find({MaestroId});

    res.status(200).json(eventos);
};

exports.putEventos = async function(req, res, next){
    let id = req.params.id;
    const {NameEvent, TiempoInicio, TiempoExpiracion, Localizacion} = req.body;

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
        // console.log(eventoDomain.Asistencia);
        // if(typeof eventoDomain.Asistencia !== 'undefined'){
            res.status(200).json(eventoDomain);
        // }
        // else{
        //     res.status(200).json([]);
        // }
    }
    else{
        res.status(400).json({Mensaje:"Id invalido"});
    }
};

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
