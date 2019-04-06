import express from 'express'
import bodyParser from 'body-parser'
import * as adminController from '../controllers/adminController'

const adminRouter = express.Router();
const jsonParser = bodyParser.json();

adminRouter.get('/', adminController.homePage);
adminRouter.get('/patientList', adminController.patientList);
adminRouter.get('/surveyList', adminController.surveyList);
adminRouter.put('/surveyVisibility/:id', adminController.surveyVisibility);
adminRouter.get(['/patientProfile/', '/patientProfile/:id'], adminController.patientProfile);
adminRouter.get('/createSurvey', adminController.createSurveyPage);
adminRouter.post('/createSurvey', jsonParser, adminController.createSurvey);
adminRouter.get('/editSurvey/:id', adminController.editSurveyPage);
adminRouter.put('/editSurvey/',jsonParser, adminController.editSurvey);
adminRouter.delete('/survey/:id', adminController.deleteSurvey);
adminRouter.get('/viewAnsweredSurvey/:userId/:surveyId', adminController.viewAnsweredSurvey);

export default adminRouter