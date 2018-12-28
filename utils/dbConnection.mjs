import mongoose from 'mongoose'

const db = mongoose.connection;
// const mongo_url = 'mongodb://localhost:27017/superSurvey'
const mongo_url = 'mongodb+srv://dbOnSurveys:HnhlsIYu5C3vVcTG@cluster0-dhtr7.mongodb.net/onsurvey?retryWrites=true'
const connection_options = { useNewUrlParser: true, useCreateIndex: true}

mongoose.connect(mongo_url, connection_options);

db.on('error',(err)=>console.log("Can't connect to mongo "+err));
db.once('open',()=>console.log('Connected to mongo succefuly'));

export default db;