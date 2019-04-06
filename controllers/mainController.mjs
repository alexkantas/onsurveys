import User from '../models/user.model'
import passport from 'passport'
import bcrypt from 'bcrypt'

const navBarElements = []

export function homePage(request, response, next) {
    const title = 'Home'
    response.render('home', { title, navBarElements, user: request.user });
}

export function aboutPage(request, response, next) {
    const title = 'About'
    response.render('about', { title, navBarElements, user: request.user });
}

export function loginPage(request, response, next) {
    const title = 'Login'
    response.render('login', { title, navBarElements, user: request.user, wrongInput: false });
}

export function registerPage(request, response, next) {
    const title = 'Register'
    response.render('register', { title, navBarElements, user: request.user, wrongInput: false });
}

export async function register(request, response, next) {
    const title = 'Register'
    try {
        let { name: firstName, lname: lastName, email, password } = request.body
        const hashedPassword = await bcrypt.hash(password, 9);
        password = hashedPassword
        const user = new User({ firstName, lastName, email, password })
        await user.save();
        response.redirect('/login');
    } catch (error) {
        response.render('register', {title, navBarElements, user: request.user, wrongInput: true });
    }
}

export function login(request, response, next) {
    const title = 'Login'
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return response.render('login', { title, navBarElements, user: request.user, wrongInput: true }); }
        request.logIn(user, function (err) {
            if (err) { return next(err); }
            if(request.user.isAdmin) return response.redirect('/admin');
            return response.redirect('/user');
        });
    })(request, response, next);
}

export function logout(request,response,next){
    request.logout();
    response.redirect('/')
}