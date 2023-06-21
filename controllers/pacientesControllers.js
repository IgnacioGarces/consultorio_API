const {uploadPaciente,fetchTodos,fetchUnPaciente,modifyPaciente,deletePaciente} = require('../utils/functionsDB');
    //Este módulo proporciona la conexión a la base de datos para realizar consultas.


const todosLosPacientes = async (req,res)=>{

     await fetchTodos(req,res);
    
}

const traerUnPaciente=async (req,res)=>{

    await fetchUnPaciente(req,res)
};

const cargarPaciente = async(req,res)=>{
    
    await uploadPaciente (req,res)
};

const editarPaciente = async (req,res)=>{
    await modifyPaciente(req,res)
}

const eliminarPaciente = async (req,res)=>{
    await deletePaciente(req,res)
}

module.exports= {todosLosPacientes,traerUnPaciente,cargarPaciente,editarPaciente,eliminarPaciente};