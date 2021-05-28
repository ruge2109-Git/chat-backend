const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true 
        });
        console.log('Conexión a la bd correcta');
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al conectar a la bd");
    }
}

module.exports = {
    dbConnection
};