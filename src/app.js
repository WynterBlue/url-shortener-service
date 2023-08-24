const express = require("express");

const app = express();

app.use(express.json());

// TODO: Add code to meet the requirements and make the tests pass.
const urlsRouter = require('./urls/urls.router')
const usesRouter = require('./uses/uses.router')
app.use('/urls', urlsRouter)
app.use('/uses', usesRouter)
app.use((req, res, next) => {
    next({
        status: 404,
        message: `path not found: ${req.originalUrl}`
    })
})

app.use((error, req, res, next) => {
    const {status = 500, message = 'Something went wrong'} = error
    res.status(status).json({error: message})
})

module.exports = app;
