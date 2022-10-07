const express = require('express');
const  cors = require('cors');
const { dbConnection } = require('../db/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths={
            auth:'/api/auth',
            usuario:'/api/usuarios',
            categorias:'/api/categorias',
            productos:'/api/productos',
            buscar:'/api/buscar',
            uploads:'/api/uploads'
        }


        this.conectarDb();

        this.middlewares();
        this.routes();

    }

    async  conectarDb (){
        await dbConnection();
    }
    middlewares() {

        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this. app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuario, require('../routes/user'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/producto'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))

        
        // this.app.get('/api', (req, res) => {
        //     res.status(200)
            
        //       .json({
        //             msn: 'get'
        //         });
        // })
        // this.app.post('/api', (req, res) => {
        //     res.status(201)
            
        //       .json({
        //             msn: 'post'
        //         });
        // })
        // this.app.put('/api', (req, res) => {
        //     res.status(200)
            
        //       .json({
        //             msn: 'put'
        //         });
        // })
        // this.app.delete('/api', (req, res) => {
        //     res.status(200)
            
        //       .json({
        //             msn: 'delete'
        //         });
        // })
        // this.app.patch('/api', (req, res) => {
        //     res.status(200)
            
        //       .json({
        //             msn: 'patch'
        //         });
        // })
    }

    listen() {

        this.app.listen(this.port)
    }

}

module.exports = Server;