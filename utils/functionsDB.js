const dbConnection=require("../config/database");


const fetchTodos = (req,res)=>{
    dbConnection.query("SELECT * FROM pacientes",(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send (data)
        }
    })
    //El método query() toma tres argumentos: la consulta SQL como una cadena, los valores de los parámetros para la consulta y un callback que se ejecutará después de que se complete la consulta.
}

const fetchUnPaciente = (req,res)=>{

    let nombre = req.params.nombre //Guardo el parametro del req..
    dbConnection.query('SELECT * FROM pacientes WHERE nombre= ?',[nombre],(err,data)=>{
        if (err) {
            res.send(err)
        }else{
            res.send(data)
        }
    })
}


const uploadPaciente = (req,res)=>{
    let {nombre,apellido,genero,edad,dni,cel,imagen} = req.body; 
    // const imagen=req.file.filename
    // console.log(imagen)
    
//dbConnection.query() ejecuta una consulta SQL para insertar un nuevo registro en la tabla "paciente" de la base de datos.
    dbConnection.query('INSERT INTO pacientes(nombre,apellido,genero,edad,dni,cel,imagen) VALUES(?,?,?,?,?,?,?)',
    [nombre,apellido,genero,edad,dni,cel,imagen],
    (err,data)=>{
        if (err) {
            res.send(err)
        } else {
            res.redirect('/infoCompletaPacientes')  
        }
    }
    )
};

const modifyPaciente = (req,res)=>{
    let editPaciente = req.params.edit;
    let {nombre,apellido,genero,edad,dni,cel}= req.body;
    dbConnection.query(
        `UPDATE pacientes SET nombre=?, apellido=?, genero=?, edad=?, dni=?, cel=? WHERE dni=${editPaciente}`,
        [nombre, apellido, genero, edad, dni, cel],
        (err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.redirect('/infoCompletaPacientes');
          }
        }
      );
    };


const deletePaciente= (req,res)=>{
    let borrarPaciente = req.params.borrar;
    dbConnection.query('DELETE FROM pacientes WHERE dni= ?',[borrarPaciente],(err,data)=>{
        if (err) {
            res.send(err);
        }else{
            res.send(data);
        }
    })
}






module.exports={
    uploadPaciente,
    fetchTodos,
    fetchUnPaciente,
    modifyPaciente,
    deletePaciente
}