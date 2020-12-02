const express = require("express");
const usuarios = require ("./modules/usuarios");//importamos el modulo usuarios
const bodyParser = require ("body-parser");
const jwt = require("jsonwebtoken");
const server = express();

server.use("/user",usuarios);
server.use(bodyParser.json());


//creo una funcion encargada de verificar el token

const verificarToken = (req,res,next) =>{
    try{
        //obtengo el token
        const token = req.headers.authorization.split(' ')[1];
        //split toma una cadena y la transforma en un array y obtiene la 2° posición o posición[1]

        //verificación del token con la palabra secreta
        const verifyJWT = jwt.verify(token,"SecretW0rd")//se pasa el token y la firma
        if(verifyJWT){
            next();
        }
    }catch(e){
        res.json({Error: "Error al validar usuario"});
    }
}



function validarUsuario(user, pass){
    if(user =="belu" && pass == "1234"){
        return true;
    }
  return false;
}

server.post("/seguro",verificarToken, (req,res) =>{
    res.json("Entro correctamente");
});

//endpoint
server.post("/logueando",(req,res) =>{
    const {user, pass} = req.body;//se tiene q llamar igual en el body
    const valido = validarUsuario(user,pass);

    if(!valido){
        res.json("el usuario o contraseña son invalidos");
        return;
    }
    const token = jwt.sign({
        user
    }, "SecretW0rd");//firma
    res.json({token});//retorno
});






server.listen(3000 , () => {
    console.log("servidor iniciado");
});