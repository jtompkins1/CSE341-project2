// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: process.env.NODE_ENV === 'production'
  ? 'cse341-project2-es0o.onrender.com'
  : `localhost:${process.env.PORT || 3000}`,
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http']
};

const outputFile = './swagger.json';
const routes = [
  './routes/index.js',
  './routes/calendar.js',
  './routes/people.js'
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);