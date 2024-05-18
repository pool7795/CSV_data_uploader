// src/config/swagger.ts

import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: "API de Upload de CSV",
      version: "1.0.0",
      description:
        "Documentación de la API para subir y gestionar archivos CSV",
    },
  },
  apis: ["src/controllers/*.ts"], // Rutas a los controladores que contienen las anotaciones Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
