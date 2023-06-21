const express = require('express');
const router = express.Router();
    /*La función express.Router() es un método proporcionado por Express que se utiliza para crear un enrutador en una aplicación Express. 
    Un enrutador es un objeto que nos permite definir las rutas y los controladores asociados a esas rutas de forma modular y organizada. */
const {todosLosPacientes,traerUnPaciente,cargarPaciente,editarPaciente,eliminarPaciente}= require('../controllers/pacientesControllers');
const upload = require('../multer/cargaImagen')
const {verificacionUsuario} = require('../jwt/verificacionUsuario');
const {registrarUsuario,login} = require('../controllers/usuariosControllers')





router.post('/nuevoUsuario',registrarUsuario)

//Logeo --> Autenticacion y generacion de token para acceder a recursos.
router.post('/login',login)



router.get('/infoCompletaPacientes',todosLosPacientes)

router.get('/infoPaciente/:nombre',traerUnPaciente);

router.post('/cargarPaciente', upload.single('imagen') ,cargarPaciente);

router.put('/modificarPaciente/:edit',editarPaciente)

router.delete('/eliminarPaciente/:borrar',eliminarPaciente)

module.exports=router;
