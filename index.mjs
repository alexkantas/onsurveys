import express from 'express'
import path from 'path'
import ejs from 'ejs'
import mainRouter from './routes/mainRoutes'
import dotenv from 'dotenv'
import morgan from 'morgan'
import session from 'express-session'
import dbConnection from './utils/dbConnection'
import adminRouter from './routes/adminRoutes.mjs';
import userRouter from './routes/userRoutes.mjs';
import passport from 'passport'
import passportLocal from 'passport-local'
import User from './models/user.model'

dotenv.config()
const app = express();
const port = process.env.PORT;
const LocalStrategy = passportLocal.Strategy;

//view engine that we use
app.use('/public', express.static('public'))
app.use('/public', express.static('node_modules/bootstrap/dist/'))
app.use(morgan('tiny'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.engine('ejs', ejs.renderFile)
app.use(session({ secret: '0n$urv4ys', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ email: username, password }, function (err, user) {
      if (err) { return done(err); }
      if (user) { return done(null, user); }
      return done(null, false, { message: 'Incorrect credentials' });
    });
  }
));

app.use('/', mainRouter)
app.use('/admin', adminAuth, adminRouter)
app.use('/user', userAuth, userRouter)

app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Page not exist' })
})

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ success: false, error:error.message })
})


function adminAuth(req, res, next) {
  // req.user = {
  //   email:'ADMIN'
  // }
  // return next();
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.redirect('/login')
  }
}

function userAuth(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(403).json({ success: false, error: 'Not Authorized' })
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})