require ('dotenv').config();
const passSeg = process.env.PASS_SEGURA;
const jwt = require('jsonwebtoken');
const dbConnection = require('../config/database');
const bcrypt = require('bcrypt');



const registrarUsuario = async (req,res)=>{
    //traemos la info del front a guardar
   const {user,password} = req.body;

   //encriptacion de la password
   let passEncriptada = await bcrypt.hash(password,10);
    
   //guardamos la data en la DB
   dbConnection.query('INSERT INTO users (user,password) VALUES(?,?)',[user,passEncriptada],(err,data)=>{
    if (err) {
        res.send(err)
    } else {
        res.send('usuario registrado')
    }
   })
}



const login = (req,res)=> {
    const {user,password} = req.body; 

    dbConnection.query("SELECT * FROM users WHERE user=?",[user],async(err,data)=>{
        if(err){
            res.send("Error en el servidor "+ err)
        }else{
            //si la peticion es correcta pero no existe un usuario con ese nombre...
            if (data.length == 0) {
                return res.status(204).json("usuario no registrado")
            }
            //Si ubica al usuario.. 
            let info= data[0];

            //BCRYPT
            const passwordOk=await bcrypt.compare(password,info.password)//devuelve un booleano 
          
            console.log(info)
            console.log(info.password)
            console.log(password)
            console.log(passwordOk)
            if( passwordOk == true){
    
                //JWT
                //generar el token para devolverlo y que pueda usarlo para cargar una pelicula
                jwt.sign({user},passSeg,{expiresIn:'30m'},(error,token)=>{
                    if(error){
                        res.send(error);
                    }else{
                        res.json({
                            message:"usuario logeado",
                            tokenLogIn:token
                        });
                    }
                })
            }else{
                res.status(401).json({message:"Password incorrecta"})
            }
        }
        

    })
};



module.exports={registrarUsuario, login}