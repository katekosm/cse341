const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'API Description'
    },
    // host: 'localhost:8080',
    // schemes: ['http']
    host: 'cse341-mvi1.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });