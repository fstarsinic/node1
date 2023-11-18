const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backyard Classics API',
      version: '1.0.0',
      description: 'API for Backyard Classics Basketball',
    },
  },
  // List of files to include (controller files)
  apis: ['./controllers/fileUploadController.js'], // Replace with the path to your controller files
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
