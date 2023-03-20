const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.listen(8080, () => {
    console.log("App started on port 8080")
});