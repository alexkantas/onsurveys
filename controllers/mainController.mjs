import User from '../models/user.model'
import passport from 'passport'

const navBarElements = [{ name: 'Home', link: '/' }, { name: 'About', link: '/about' }, { name: 'Login', link: '/login', hideIfUserExists: true }, { name: 'Register', link: '/register', hideIfUserExists: true }]

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
    response.render('register', { title, navBarElements, user: request.user });
}

export async function register(request, response, next) {
    try {
        const { name: firstName, lname: lastName, email, password } = request.body
        const user = new User({ firstName, lastName, email, password })
        await user.save();
        response.json({ success: true, user: user });
    } catch (error) {
        response.json({ success: false, error })
    }
}

export function login(request, response, next) {
    const title = 'Login'
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { response.render('login', { title, navBarElements, user: request.user, wrongInput: true }); }
        request.logIn(user, function (err) {
            if (err) { return next(err); }
            return response.redirect('/admin');
        });
    })(request, response, next);
}

export function logout(request,response,next){
    request.logout();
    response.redirect('/')
}