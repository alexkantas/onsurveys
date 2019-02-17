import User from '../models/user.model'

export function homePage(req, res, next) {
    const title = 'Admin'
    res.render('admin', { title, user: req.user })
}

export function addSurvey(req, res, next) {
    const title = 'Add Survey'
    res.render('adminAddSurvey', { title, user: req.user })
}



