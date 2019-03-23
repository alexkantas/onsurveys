import User from '../models/user.model'
import Survey from '../models/survey.model'
import mongoose from 'mongoose'
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
    res.render('surveyList', { title, user: req.user })
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
    try{
        const { surveyTitle: title, surveyText: surveyData } = req.body;
    // const surveyData = req.body.surveyText
    // const title = req.body.surveyTitle
    const survey = new Survey({surveyData, title})
    await survey.save();
    res.json({ success: true, surveyData, title })
    }
    catch(error){
        next(error)
    }
}