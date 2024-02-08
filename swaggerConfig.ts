// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Brain-AG API",
      version: "1.0.0",
      description: "API documentation for Brain-AG backend",
    },
  },
  apis: ["./src/app/routes/swagger-documentation.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;
