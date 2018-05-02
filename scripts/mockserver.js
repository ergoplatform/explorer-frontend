const express = require('express');
const path = require('path');
const swaggerMiddleware = require('swagger-express-middleware-with-chance');
const Converter = require('api-spec-converter');
const tmp = require('tmp');
const fs = require('fs');

const app = express();

let apiPath = path.resolve(__dirname, '../api.yaml');

Converter.convert({
  from: 'openapi_3',
  to: 'swagger_2',
  source: apiPath
})
  .then((converted) => {
    let tmpFile = tmp.fileSync();

    fs.writeFileSync(tmpFile.name, converted.stringify());

    swaggerMiddleware(tmpFile.name, app, (err, middleware) => {
      app.use(
        middleware.metadata(),
        middleware.parseRequest(),
        middleware.validateRequest(),
        middleware.mock()
      );

      app.listen(8000, () => {
        console.log('MockServer is now running at http://localhost:8000');
      });
    });
  });
