const multer=require('multer');
// const upload= multer({dest:'./imagenes'}) -> si no configuro el tipo de documento a cargar(su extension) y otras configuraciones

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        const pathDocument='./imagenes'
        callback(null,pathDocument)
    },
    filename:(req,file,callback)=>{
        const ext=file.originalname.split(".").pop()
        const filename=`img-${Date.now()}.${ext}`
        callback(null,filename)
    },
});

const upload= multer({storage})

module.exports=upload;