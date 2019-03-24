import User from '../models/user.model'
import Survey from '../models/survey.model'
import mongoose from 'mongoose'
import moment from 'moment'

const ObjectId = mongoose.Types.ObjectId;

export function homePage(req, res, next) {
    const title = 'Admin'
    res.render('admin', { title, user: req.user })
}

export async function patientList(req, res, next) {
    const title = 'Patient List'
    const patients = await User.find({ isAdmin: { $ne: true } })
    res.render('patientList', { title, user: req.user, patients })
}


export async function surveyList(req, res, next) {
    const title = 'Survey List'
    const surveys = await Survey.find().sort({ createdAt: -1 })
    res.render('surveyList', { title, user: req.user, surveys, moment })
}

export async function patientProfile(req, res, next) {
    try {
        const title = 'Patient Profile'
        const userId = req.params.id
        const patient = await User.findById(ObjectId(userId))
        if (!patient) throw Error(`Patient with id ${userId} not found`)
        res.render('patientProfile', { title, user: req.user, patient })
    }
    catch (err) {
        next(err)
    }
}

export function createSurveyPage(req, res, next) {
    const title = 'Create Survey'
    res.render('createSurvey', { title, user: req.user })
}

export async function createSurvey(req, res, next) {
    // Step 2 (This code run on OlyBoo PC  or on Heroku Computers)
    console.log('step2');
    try {
        const { surveyTitle: title, surveyText: surveyData } = req.body;
        // const surveyData = req.body.surveyText
        // const title = req.body.surveyTitle
        const survey = new Survey({ surveyData, title })
        await survey.save();
        console.log('HA HA trollarw ton  chrome kai den tou stelnw amesws to response');
        setTimeout(() => {
            res.json({ success: true, surveyData, title })
        }, 10000)

    }
    catch (error) {
        next(error)
    }
}

export async function surveyVisibility(req, res, next) {
    try {
        const surveyId = req.params.id
        const survey = await Survey.findById(ObjectId(surveyId))
        if (!survey) throw Error(`Survey with id ${surveyId} not found`)
        survey.visible = !survey.visible;
        await survey.save();
        res.json({ success: true, survey })
    }
    catch (err) {
        next(err)
    }
}
