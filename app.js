const express = require('express');
const app = express();
const studentRouter = require('./api/router/student');
const userRouter = require('./api/router/login_logout');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://AB:archanab@ab.eoxpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true });

mongoose.connection.on('error', error => {
    console.log('connection failed...')
})

mongoose.connection.on('connected', connected => {
    console.log('connect with db...')
})

app.use(bodyParser.json());
app.use('/student', studentRouter);
app.use('/users', userRouter);

app.use((req, res, next) => {
    res.status(404).json({
        message : 'url not found...'
    })
})

module.exports = app;