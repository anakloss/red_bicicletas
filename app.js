require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const passport = require('./config/passport');
const Usuario = require('./models/usuario');
const Token = require('./models/token');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const usuariosRouter = require('./routes/usuarios');
const tokenRouter = require('./routes/token');
const biciRouter = require('./routes/bicicletas');
const biciAPIRouter = require('./routes/api/bicicletas');
const authAPIRouter = require('./routes/api/auth');
const userAPIRouter = require('./routes/api/usuarios');


const store = new session.MemoryStore;
var app = express();

app.set('secretKey', 'jwt_pwd_12rfd34');

app.use(session({
  cookie: { maxAge: 240 * 60 * 60 * 1000 }, //time for cookie
  store: store, //we save in store
  saveUninitialized: true,
  resave: 'true',
  secret: 'red_bicicletas_!!!%&/&____234234' //Here you can put anything that is used to encrypt the cookie
}));

var mongoose = require('mongoose');

// var mongoDB = 'mongodb://localhost/red_bicicletas';
// var mongoDB = 'mongodb+srv://admin:adminpass@reddebicis.7v9ra.mongodb.net/?retryWrites=true&w=majority';
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
  res.render('session/login');
});
app.post('/login', (req, res, next) => {
  //method of passport
  passport.authenticate('local', (err, usuario, info) => {
    //if there is a error & continue with the next method of middleware
    if (err) return next(err);
    //if there is not a user return back to the same page(login) 
    if (!usuario) return res.render('session/login', {info});
    req.logIn(usuario, err => {
      if (err) return next(err);
      return res.redirect('/');
    });
  }) (req, res, next); //we execute the passport.authenticate function in order to passport has reference to req, res, next
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

app.get('/forgotPassword', (req, res) => {
  res.render('session/forgotPassword');
});
app.post('/forgotPassword', (req, res) => {
  Usuario.findOne({email: req.body.email}, (err, usuario) => {
    if(!usuario) return res.render('session/forgotPassword', {info: {message: 'No existe la clave'}});
    
    usuario.resetPassword(err => {
      if(err) return next(err);
      console.log('session/forgotPasswordMessage');
    });
    res.render('session/forgotPasswordMessage');
  });
});

app.get('/resetPassword/:token', (req, res, next) => {
  Token.findOne({token: req.params.token}, (err, token) => {
    if (!token) return res.status(400).send({type: 'not-verified', msg: 'No existe un usuario asociado al token. Verifique que su token no haya expirado.'});

    Usuario.findById(token._userId, (err, usuario) => {
      if (!usuario) return res.status(400).send({msg: 'No existe un usuario asociado al token.'});
      res.render('session/resetPassword', {errors: {}, usuario: usuario});
    });
  });
});
app.post('/resetPassword', (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    res.render('session/resetPassword', {errors: {confirm_password: {message: 'No coincide con el password ingresado.'}}, usuario: new Usuario({email: req.body.email})});
    return;
  }
  Usuario.findOne({email: req.body.email}, (err, usuario) => {
    usuario.password = req.body.password;
    usuario.save((err) => {
      if (err)
        res.render('session/resetPassword', {errors: err.errors, usuario: new Usuario({email: req.body.email})});
      else
        res.redirect('/login');
    });
  });
});


app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/users", loggedIn, usuariosRouter);
app.use("/token", loggedIn, tokenRouter);

app.use("/bikes", loggedIn, biciRouter);
app.use("/api/bikes", validarUsuario, biciAPIRouter);
app.use("/api/auth", authAPIRouter);
app.use("/api/users", userAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('user sin loguearse');
    res.redirect('/login');
  }
};

function validarUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      req.body.userId = decoded.id;
      console.log('jwt verify: ' + decoded);
      next();
    }
  });
};

module.exports = app;
