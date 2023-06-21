//se importa el módulo mysql2 que proporciona funcionalidades para trabajar con la base de datos MySQL.
const mysql=require('mysql2');
require ('dotenv').config();



//contiene la configuración necesaria para establecer la conexión con la base de datos MySQL. 
const dataBaseInfo = {
    host:process.env.HOST,
    user:process.env.DB_USER,
    database:process.env.DB,
    password:process.env.PASSWORD
}


//se utiliza el método mysql.createConnection() para crear una conexión a la base de datos utilizando la configuración proporcionada en dataBaseInfo. Esta función devuelve un objeto que representa la conexión a la base de datos.
const dbConnection=mysql.createConnection(dataBaseInfo);

//Después de crear la conexión, se utiliza el método connect() en el objeto dbConnection para establecer la conexión con la base de datos.
dbConnection.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Coneccion con DB Mysql exitosa')
    }
}); 



module.exports=dbConnection;
