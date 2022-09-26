const express = require('express');
const  cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath='/api/usuarios';
        this.auhtPath='/api/auth';

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
    }

    routes() {

        this.app.use(this.auhtPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/user'))



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