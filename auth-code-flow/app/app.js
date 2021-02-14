const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { auth } = require('express-openid-connect')
require('dotenv').config()

const indexRouter = require('./routes/index')

const { DOMAIN, CLIENT_ID, CLIENT_SECRET, PORT } = process.env

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:${PORT}`,
  clientID: `${CLIENT_ID}`,
  issuerBaseURL: `https://${DOMAIN}`,
  secret: `${CLIENT_SECRET}`
}

var app = express()

app.use(auth(authConfig))

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
