require('./db/db');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const userController = require('./controllers/controller');

//midddleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'))

//routes
app.use('/users', userController);


app.listen(3000, () => {
    console.log('server listening');
})