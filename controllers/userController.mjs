import User from '../models/user.model'
import mongoose from 'mongoose'
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
        const { id, name, lastName, email, password } = req.body
        const user = await User.findById(ObjectId(id))
        if(!user) throw Error(`User with id [${id}] not found`)
        if(name) user.firstName = name
        if(lastName) user.lastName = lastName
        if(email) user.email = email
        if(password) user.password = password

        await user.save();
        res.json({ id, name, lastName, email, password, user })
    } catch (err) {
        next(err)
    }
}