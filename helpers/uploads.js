
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const subirArchivo=(files,extensionesValidas=['png', 'jpg', 'jpeg', 'gif','jfif'],carpeta='')=>{

    return new Promise((resolve,reject)=>{

        
        const { file } = files;

        const nameShort = file.name.split('.');
        const extension = nameShort[nameShort.length - 1]
    
      
    
        if (!extensionesValidas.includes(extension)) {
           
           return reject('extension no permitida')
            
    
        }
        const tempArchivo = uuidv4() + '.' + extension;
        uploadPath = path.join(__dirname, '../uploads/', carpeta,tempArchivo);
   
        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
            if (err)
                return reject(err)
    
           resolve(tempArchivo );
        });
    
    
    })
   

}
module.exports={
    subirArchivo
}