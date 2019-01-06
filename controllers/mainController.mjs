import User from '../models/user.model'

const navBarElements = [{ name: 'Home', link: '/' }, { name: 'About', link: '/about' }, { name: 'Login', link: '/login' }, { name: 'Register', link: '/register' }]

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
    response.render('login', { title, navBarElements, user: request.user });
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
    const { username: email, password } = request.body
    response.json({ success: true, email, password });
}

