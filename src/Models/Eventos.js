const { Schema, model } =  require('mongoose');

const EventosSchema = new Schema({
    NameEvent:String,
    MaestroId:String,
    QR:String,
    TiempoInicio: String,
    TiempoExpiracion:String,
    Localizacion:String,
    Asistencia: [
        {
            NameAlumno:String,
            LastNameAlumno:String,
            Localizacion:String,
            DateAsistencia:String
        }
    ]
});

module.exports = model('EventosModel', EventosSchema);