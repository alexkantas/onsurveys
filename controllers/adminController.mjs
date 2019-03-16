import User from '../models/user.model'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

export function homePage(req, res, next) {
    const title = 'Admin'
    res.render('admin', { title, user: req.user })
}

export function addSurvey(req, res, next) {
    const title = 'Add Survey'
    res.render('adminAddSurvey', { title, user: req.user })
}

export async function patientList(req, res, next) {
    const title = 'Patient List'
    const patients = await User.find({ isAdmin: { $ne: true } })
    res.render('patientList', { title, user: req.user, patients })
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