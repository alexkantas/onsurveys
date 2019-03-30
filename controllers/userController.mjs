import User from '../models/user.model'
import Survey from '../models/survey.model'
import mongoose from 'mongoose'
import moment from 'moment'

const ObjectId = mongoose.Types.ObjectId;

export function homePage(req, res, next) {
    const title = 'User'
    res.render('user', { title, user: req.user })
}

export function myProfile(req, res, next) {
    const title = 'My Profile'
    res.render('myProfile', { title, user: req.user })
}

export async function updateMyProfile(req, res, next) {
    try {
        const { id, name, lastName, password } = req.body
        const user = await User.findById(ObjectId(id))
        if(!user) throw Error(`User with id [${id}] not found`)
        if(name) user.firstName = name
        if(lastName) user.lastName = lastName
        if(password) user.password = password
        await user.save();
        res.json({ id, name, lastName, user })
    } catch (err) {
        next(err)
    }
}

export async function userSurveyList(req, res, next){
    const title = ' My Survey List'
    const surveys = await Survey.find().sort({ createdAt: -1 })
    res.render('userSurveyList', { title, user: req.user, surveys, moment })
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


export async function viewAnsweredSurvey(req, res, next) {
    try {
        const title = ' View Answers'
    
        res.render('viewUserAnsweredSurvey', { title, user: req.user })
    }
    catch (err) {
        next(err)
    }
}
