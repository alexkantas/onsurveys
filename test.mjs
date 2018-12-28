
import User from './models/user.model'

import mongoose from 'mongoose'

const db = mongoose.connection;
const mongo_url = 'mongodb://localhost:27017/superSurvey'
const connection_options = { useNewUrlParser: true, useCreateIndex: true }


//callback
// mongoose.connect(mongo_url, connection_options, (err) => {
//     if (err) return console.log("Can't connect to mongo " + err);
//     console.log('Connected to mongo succefuly')
//     const user = new User({
//         firstName: 'Olympia',
//         lastName: 'Nk',
//         email: 'ol@boo.com',
//         password: '123'
//     })
//     user.save((err, user) => {
//         if (err) return console.log('Can not save user: ' + err);
//         console.log("User saved sucessfully", user);
//     });
// });

//Promises
// mongoose.connect(mongo_url, connection_options)
//     .then(() => {
//         console.log('Connected to mongo succefuly')
//         const user = new User({
//             firstName: 'Olympia',
//             lastName: 'Nk',
//             email: 'ol@boo.com',
//             password: '123'
//         })
//         return user.save();
//     }).then(() => {
//         console.log("User saved sucessfully", user);
//     }).catch(err => {
//         console.log('Error: ', err);
//     })

//Await async
async function start() {
    try {
        await mongoose.connect(mongo_url, connection_options) //otan h promise ginei resolve pane apo katw
        console.log('Connected to mongo succefuly')
        const user = new User({
            firstName: 'Olympia',
            lastName: 'Nk',
            email: 'ol@boo.com',
            password: '123'
        })
        await user.save();
        console.log("User saved sucessfully", user);
    } catch (err) {
        console.log('Error: ', err);
    }
}

start()


console.log('This will print fisrt');