const express = require("express");
const router = express.Router();
const Sequelize  = require("sequelize");
const sequelize = new Sequelize("mysql://root@localhost:3306/login");//inicializamos-conexión
const bodyParser = require ("body-parser");

router.use(bodyParser.json());

router.get("/", (req,res)=>{
    res.json("obtengo usuarios");
})

router.get("/listado", (req,res)=>{
    res.json("listado de usuarios");
})

//consultar datos de la bd
router.get("/usuarios" , (req,res) => {
    sequelize.query("SELECT * from usuarios",
    {type: sequelize.QueryTypes.SELECT}
    ).then(function(resultados){
        res.json(resultados);
    });

});
//con params se accede al id
router.get("/usuarios/:id" , (req,res) => {
    const userID = req.params.id;
    sequelize.query('SELECT * from usuarios where id = :id',
    {replacements:{id:userID, }, type: sequelize.QueryTypes.SELECT}
    ).then(function(resultados){
        res.json(resultados);
    });
    
});

// login
router.post("/login/:name:psw" , (req,res) => {
    const username = req.body.username; 
    const pass = req.body.pwd;    
    sequelize.query('SELECT * from usuarios where username = :name and pass = :pwd',    
    {replacements:{username:username}, type: sequelize.QueryTypes.SELECT}
        ).then(function(resultados){
                res.json(resultados);
        });    
});

//update 
router.post("/update/:pwd" , (req,res) => {
    const pass = req.body.pwd;   
    sequelize.query( 'UPDATE tabla SET campo ="pass" WHERE id = ?',
    {replacements:[2]}) 
    .then(function(resultados) { 
    console. log( resultados) 
    }); 
});

//insert
// router.get("/insert" , (req,res) => {
// sequelize.query( 'INSERT INTO personas (username, pass,nombre ,apellido,email) VALUES(?,?,?,?,?)',
// {replacements:  ['mati', '3322','matinas', ' gimenez','mg@mg.com']}) 
// .then(function(resultados){
// console. log( resultados ) 
//     });
// });


module.exports =router;

