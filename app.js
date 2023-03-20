const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

app.listen(8080, () => {
    console.log("App started on port 8080")
});