import express from 'express'
import path from 'path'
import ejs from 'ejs'
import mainRouter from './routes/mainRoutes'
import dotenv from 'dotenv'
import morgan from 'morgan'
import session from 'express-session'
import dbConnection from './utils/dbConnection'
import adminRouter from './routes/adminRoutes.mjs';

dotenv.config()
const app = express();
const port = process.env.PORT;

//view engine that we use
app.use('/public', express.static('public'))
app.use('/public', express.static('node_modules/bootstrap/dist/'))
app.use(morgan('tiny'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.engine('ejs', ejs.renderFile)
app.use(userInitiallize)
app.use('/', mainRouter)
app.use('/admin', adminAuth, adminRouter)

app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Page not exist' })
})

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ success: false, error })
})

function userInitiallize(req, res, next) {
  req.user= {name:'admin!'}
  next();
}

function adminAuth(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(403).json({ success: false, error: 'Not Authorized' })
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})