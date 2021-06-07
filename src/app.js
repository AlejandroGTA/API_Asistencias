const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const io = require('socket.io')(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});

const config = require('./appConfig');

require('./DataBase/Conexion');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.use('/Public',express.static(path.join(__dirname,'Public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: false
}));

app.use('/', require('./Routes/Home'));
app.use('/Maestro', require('./Routes/Maestros'));
app.use('/Asistencia', require('./Routes/Asistencia'));
app.use('/Admin', require('./Routes/Admin'));
 
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('AddUser', function (ms){
        socket.join(ms);
    });

    socket.on('AddAsistencia', function (ms){
        io.to(ms.MaestroId).emit('Alumno', ms);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log("Server ON: " + port);
});