const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DOOH Ad Manager API',
      version: '1.0.0',
      description: 'Backend API for screens, ads, and campaign scheduling',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
