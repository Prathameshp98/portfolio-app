const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDnptp2Db1lXb5Ysn9EAx8Wtlg2DyYnH20",
  authDomain: "portfolio-app-1bd01.firebaseapp.com",
  projectId: "portfolio-app-1bd01",
  storageBucket: "portfolio-app-1bd01.appspot.com",
  messagingSenderId: "273669198227",
  appId: "1:273669198227:web:40aa2f6b7f7b951bb99866",
  measurementId: "G-94N4XKY80V"
};

const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.listen(8080, () => {
    console.log("App started on port 8080")
});