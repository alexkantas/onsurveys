import express from 'express'
import path from 'path'
import ejs from 'ejs'
import mainRouter from './routes/mainRoutes'
import dbConnection from './utils/dbConnection'

const app = express();
const port = process.env.PORT || 8080;


//view engine that we use
app.use(express.static(path.join(path.resolve('./'), 'public')))
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