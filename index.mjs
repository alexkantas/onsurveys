import express from 'express'
import path from 'path'
import ejs from 'ejs'
import mainRouter from './routes/mainRoutes'
import dotenv from 'dotenv'
import morgan from 'morgan'
import session from 'express-session'
import dbConnection from './utils/dbConnection'

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
app.use('/', mainRouter)

app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Page not exist' })
})

app.use((error, req, res, next) => {
  res.status(500).json({ success: false, error })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})