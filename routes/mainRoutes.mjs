import express from 'express'
import bodyParser from 'body-parser'
import * as mainController from '../controllers/mainController'

const mainRouter = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

mainRouter.get('/', mainController.homePage);
mainRouter.get('/about', mainController.aboutPage);
mainRouter.get('/login', mainController.loginPage);
mainRouter.post('/login', urlencodedParser, mainController.login);
mainRouter.get('/register', mainController.registerPage);
mainRouter.post('/register', urlencodedParser, mainController.register );
export default mainRouter