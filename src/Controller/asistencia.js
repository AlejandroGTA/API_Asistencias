const Alumnos = require('../Models/Alumnos');
const Aulas = require('../Models/Eventos');
const io = require("socket.io-client");
const config = require('../appConfig');
const jwt = require('jsonwebtoken');

const socket = io(config.API_URL,{
        withCredentials: true,
        extraHeaders: {
            "my-custom-header": "abcd"
        }
    });

exports.asistenciaAlumno = async function(req, res, next){
    let EventoId = req.params.id;
    let mensaje = "";
    let flagAsistenciaExistente = 0;
    const {NameAlumno, LastNameAlumno, NameEvent, Localizacion} = req.body;
    let DateAsistencia =  new Date();

    let aulaCheck = new Aulas();
    aulaCheck = await Aulas.findOne({
        _id:EventoId
    });
   
    let alumnoCheck = new Alumnos();
    alumnoCheck = await Alumnos.findOne({
        Name: NameAlumno,
        LastName: LastNameAlumno
    });

    let flagExp = 1;
    let flagPrimerDato = 0;
    let flagBadReques = 0;
    let Alumno = null;

    if(aulaCheck.Asistencia[0] == null){
        flagPrimerDato = 1;
    }
    else{
        for(let i = 0; i < aulaCheck.Asistencia.length; i++){
            if(aulaCheck.Asistencia[i].NameAlumno == NameAlumno && aulaCheck.Asistencia[i].LastNameAlumno == LastNameAlumno){
                flagAsistenciaExistente = 1;
            }
        }
        if(flagAsistenciaExistente == 1){
            mensaje = "Asistencia Existente";
            flagBadReques = 1;
        }
    }

    if(DentroDeTiempo(aulaCheck.TiempoInicio, aulaCheck.TiempoExpiracion, DateAsistencia) == 0 && flagBadReques == 0){
        mensaje = "Tiempo de Registro Caducado";
        flagBadReques = 1;
    }

    if(caluclar(aulaCheck.Localizacion, Localizacion) == 0 && flagBadReques == 0){
        flagBadReques == 1;
        mensaje = "No te encuentras dentro del area limite";
    }

    if(mensaje == ""){
        if(flagPrimerDato == 1){
            await Aulas.findOneAndUpdate(
                {
                    _id:EventoId
                },
                {
                    Asistencia:[{
                        NameAlumno:NameAlumno,
                        LastNameAlumno:LastNameAlumno,
                        Localizacion:Localizacion,
                        DateAsistencia:DateAsistencia
                    }]
                }
            );
        }
        else{
            let datosAlumnos = aulaCheck.Asistencia;
            datosAlumnos.push({
                NameAlumno:NameAlumno,
                LastNameAlumno:LastNameAlumno,
                Localizacion:Localizacion,
                DateAsistencia:DateAsistencia
            });

            await Aulas.findOneAndUpdate(
                {
                    _id:EventoId
                },
                {
                    Asistencia:datosAlumnos
                }
            );

        }

        Alumno ={
            MaestroId:aulaCheck.MaestroId,
            EventoId:EventoId,
            NameAlumno:NameAlumno,
            LastNameAlumno:LastNameAlumno,
            Localizacion: Localizacion,
            DateAsistencia:DateAsistencia
        };
        mensaje = "Datos guardados";
        socket.emit("AddAsistencia",Alumno);
    }   

    res.status(200).json({Mensaje: mensaje});
};

exports.validacionAlumnoYAula = async function(req, res, next){
    let {NameAlumno, LastNameAlumno} = req.body;
    let EventoId = req.params.id;
    
    let alumno = new Alumnos();
    let aula = new Aulas();

    let mensaje = "";

    alumno = await Alumnos.findOne({
        Name: NameAlumno,
        LastName: LastNameAlumno
    });

    aula = await Aulas.findOne({
        _id: EventoId
    });

    if(alumno == null){
        mensaje = "Alumno no registrado";
    }

    if(aula == null){
        if(mensaje == ""){
            mensaje = "Aula no encontrada"
        }
        else{
            mensaje = mensaje + " y Aula no encontrada";
        }
    }

    if(mensaje == ""){
        next();
    }
    else{
        res.send(mensaje);
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

function DentroDeTiempo(FechaCreacion, FechaExpiracion, Fechaasistencia){
    let DateAsistencia = new Date(Fechaasistencia);
    let DateCreacion = new Date(FechaCreacion);
    let DateExpiracion = new Date(FechaExpiracion);

    let difCE = DateExpiracion.getTime() - DateCreacion.getTime();
    let difCA = DateAsistencia.getTime() - DateCreacion.getTime();

    if(difCA <= difCE){
        return 1;
    }
    else{
        return 0;
    }
};

function caluclar(LocalizacionEvento, LocalizacionUsuario){
    let LE = LocalizacionEvento.split(',');
    let LU = LocalizacionUsuario.split(',');

    let x1 = LE[0] * (Math.PI / 180);
    let y1 = LE[1] * (Math.PI / 180);
    let x2 = LU[0] * (Math.PI / 180);
    let y2 = LU[1] * (Math.PI / 180);

    if(x1 == 0 && y1 == 0){
        return 1;
    }
    
    let distancia;
    let radioTierra = 6371; //kilometros
    
    let dLongitud = (x2 - x1);
    let dLatitud = (y2 - y1);
     
    let sinLongitud = Math.sin(dLongitud / 2);
    let sinLatitud = Math.sin(dLatitud / 2);

    let parteA = (sinLatitud * sinLatitud) + Math.cos(x1) * Math.cos(x2) * (sinLongitud*sinLongitud);
    let parteC = 2 * Math.asin (Math.min(1.0, Math.sqrt(parteA)));

    distancia = radioTierra * parteC * 1000;

    if(distancia <= 10){
        return 1;
    }
    else{
        return 0;
    }
    
    // tolerancia del -4.2822428547982 metros
}