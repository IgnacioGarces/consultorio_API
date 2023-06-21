
const express = require('express');
const server =express();
const cors = require('cors');
const routes = require('./routes/routes')
require('./config/database')
/*contiene la configuración y la conexión con la base de datos. Este archivo establece la conexión con la base de datos MySQL utilizada en tu proyecto.*/
require ('dotenv').config();
const port = process.env.PORT;

server.use(express.json());
//Si recibimos un documento en formato Json lo podemos entender

server.use(express.urlencoded({extended:true}));
/*Aquí se configura el middleware express.urlencoded(), 
que permite al servidor entender las solicitudes entrantes 
con datos codificados en URL. 
Esto es útil cuando se envían datos desde formularios HTML
utilizando el método POST.*/

server.use('/public',express.static('./images'));
//Configuramos endpoint para obtener imagenes o archivos guardados. 

server.use(cors());
/*Esta línea habilita el middleware cors, lo que permite las solicitudes de dominios cruzados. 
Básicamente, permite que tu API sea accedida por clientes que se encuentran en diferentes dominios. 
Esto puede ser útil para permitir que una SPA
(como la que estás construyendo) se comunique con el servidor API que está alojado en un dominio diferente.*/


server.use('',routes)
//Esta línea conecta el archivo routerPacientes.js con el servidor. Al utilizar server.use('', router), le estás diciendo al servidor que utilice ese enrutador para manejar las solicitudes entrantes.
//Al agregar el enrutador mediante server.use('', router), estás indicando que cualquier solicitud que llegue al servidor debe pasar por el enrutador para que se maneje correctamente.


server.listen(port,()=>{
    console.log(`server corriendo en el puerto ${port}`)
})
//inicia el servidor y lo pone en escucha en el puerto 4000

