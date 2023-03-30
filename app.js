const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

const usersRoutes = require('./routes/users')

app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.use(bodyParser.json()) // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/download', function(req, res){
    const file = `${__dirname}/data/resume_2023.pdf`;
    res.download(file); 
});

app.use('/users', usersRoutes)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({ message: message })
})

mongoose.connect(
    'mongodb+srv://admin_prathamesh:fDBN9Jc3d45pPhUt@cluster0.hm590.mongodb.net/Portfolio?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(8080, () => {
            console.log("App started on port 8080")
        });  
    })
    .catch(err => console.log(err))