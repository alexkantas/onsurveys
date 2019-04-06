import User from '../models/user.model'
import Survey from '../models/survey.model'
import mongoose from 'mongoose'
import moment from 'moment'
import bcrypt from 'bcrypt'

const ObjectId = mongoose.Types.ObjectId;

export function homePage(req, res, next) {
    const title = 'User'
    res.render('user', { title, user: req.user })
}

export function myProfile(req, res, next) {
    const title = 'My Profile'
    const surveys = req.user.answeredSurveys.sort((a,b)=> -(a.createdAt - b.createdAt) )
    res.render('myProfile', { title, user: req.user, surveys, moment })
}

export async function updateMyProfile(req, res, next) {
    try {
        let { id, name, lastName, password } = req.body
        const user = await User.findById(ObjectId(id))
        if (!user) throw Error(`User with id [${id}] not found`)
        if (name) user.firstName = name
        if (lastName) user.lastName = lastName
        if (password) { 
            const hashedPassword = await bcrypt.hash(password, 9);
            password = hashedPassword
            user.password = password
        }
        await user.save();
        res.json({ id, name, lastName, user })
    } catch (err) {
        next(err)
    }
}

export async function userSurveyList(req, res, next) {
    const title = ' My Survey List'
    const surveys = await Survey.find().sort({ createdAt: -1 })
    const answeredSurveys = req.user.answeredSurveys
    const answeredSurveysIds = answeredSurveys.map(survey => (survey.surveyId).toString())
    const surveysExcludeAnsweredOnes = surveys.filter(survey => (!answeredSurveysIds.includes(survey._id.toString()) && survey.visible == true))
    res.render('userSurveyList', { title, user: req.user, surveys: surveysExcludeAnsweredOnes, moment })
}

export async function answerSurveyPage(req, res, next) {
    try {
        const title = ' Answer survey'
        const surveyId = req.params.id
        const survey = await Survey.findById(ObjectId(surveyId))
        if (!survey) throw Error(`Survey with id ${surveyId} not found`)
        const surveyData = survey.surveyData
        res.render('answerSurvey', { title, user: req.user, surveyData, surveyId })
    }
    catch (err) {
        next(err)
    }
}

export async function answerSurvey(req, res, next) {
    try {
        const { surveyData, surveyId, surveyAnswers, surveyTitle } = req.body
        const userId = req.user._id
        const user = await User.findById(ObjectId(userId));
        const alreadyAnswered = user.answeredSurveys.find(element => element.surveyId == surveyId)
        if (alreadyAnswered) throw Error(`Survey with id [${surveyId}] is already answered`)
        user.answeredSurveys.push({ surveyData, surveyAnswers, surveyId, surveyTitle })
        user.save();
        res.json({ success: true })
    } catch (err) {
        next(err)
    }
}

export async function viewAnsweredSurvey(req, res, next) {
    try {
        const title = ' View Answers'
        const answeredSurveys = req.user.answeredSurveys
        const surveyId = req.params.id
        const survey = answeredSurveys.find(survey => surveyId == survey.surveyId.toString())
        const surveyData = survey.surveyData
        const surveyAnswers = survey.surveyAnswers
        res.render('viewUserAnsweredSurvey', { title, user: req.user , surveyData, surveyAnswers})
    }
    catch (err) {
        next(err)
    }
}
