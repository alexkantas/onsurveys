import express from 'express'
import bodyParser from 'body-parser'
import * as userController from '../controllers/userController'

const userRouter = express.Router();
const jsonParser = bodyParser.json();

userRouter.get('/', userController.homePage);
userRouter.get('/myProfile', userController.myProfile);
userRouter.put('/myProfile/', jsonParser, userController.updateMyProfile);
userRouter.get('/userSurveyList', userController.userSurveyList);
userRouter.get('/answerSurvey/:id', userController.answerSurveyPage);
userRouter.post('/answerSurvey', jsonParser, userController.answerSurvey);
userRouter.get('/viewAnsweredSurvey/:id', userController.viewAnsweredSurvey);
export default userRouter