import express from 'express'
import bodyParser from 'body-parser'
import * as userController from '../controllers/userController'

const userRouter = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

userRouter.get('/', userController.homePage);

export default userRouter