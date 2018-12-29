import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const db = mongoose.connection;
const mongo_url = process.env.MONGO_URL
const connection_options = { useNewUrlParser: true, useCreateIndex: true}

mongoose.connect(mongo_url, connection_options);

db.on('error',(err)=>console.log("Can't connect to mongo "+err));
db.once('open',()=>console.log('Connected to mongo succefuly'));

export default db;