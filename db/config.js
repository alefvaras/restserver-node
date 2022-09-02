const mongoose = require('mongoose');

const dbConnection= async()=>{

    try {
        await mongoose.connect(process.env.MONDODB_CNN,{
        //     useNewUrlParser: true,
        //     useFindAndModify: false,
        //     useUnifiedTopology: true
        });

        console.log('online db')
    } catch (error) {
        console.log(error)
        throw new Error('error en la db')
    }

}

module.exports={
    dbConnection
}