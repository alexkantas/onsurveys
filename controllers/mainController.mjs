import User from '../models/user.model'
import passport from 'passport'

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
        const { name: firstName, lname: lastName, email, password } = request.body
        const user = new User({ firstName, lastName, email, password })
        await user.save();
        // response.json({ success: true, user: user });
        response.redirect('/login');

    } catch (error) {
        // throw Error(`Something went wrong.`)
        response.render('register', {title, navBarElements, user: request.user, wrongInput: true });
        // response.json({ success: false, error })
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