const express = require("express");
const Sequelize  = require("sequelize");
const usuarios = require ("./modules/usuarios");//importamos el modulo usuarios
const sequelize = new Sequelize("mysql://root@localhost:3306/login");//inicializamos-conexión
const server = express();

server.use("/user",usuarios);

//consultar datos de la bd
server.get("/usuarios" , (req,res) => {
    sequelize.query("SELECT * from usuarios",
    {type: sequelize.QueryTypes.SELECT}
    ).then(function(resultados){
        res.json(resultados);
    });

});
//con params se accede al id
server.get("/usuarios/:id" , (req,res) => {
    const userID = req.params.id;
    sequelize.query("SELECT * from usuarios where id = :id",
    {replacements:{id:userID}, type: sequelize.QueryTypes.SELECT}
    ).then(function(resultados){
        res.json(resultados);
    });
});

server.listen(3000 , () => {
    console.log("servidor iniciado");
});