import User from '../models/user.model'

export function homePage(req, res, next) {
    const title = 'User'
    res.render('user', {title, user:req.user})
}
