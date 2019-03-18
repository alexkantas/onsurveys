import express from 'express'
import bodyParser from 'body-parser'
import * as userController from '../controllers/userController'

const userRouter = express.Router();
const jsonParser = bodyParser.json();

userRouter.get('/', userController.homePage);
userRouter.get('/myProfile', userController.myProfile);
userRouter.put('/myProfile/', jsonParser, userController.updateMyProfile);

export default userRouter