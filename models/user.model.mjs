import mongoose from 'mongoose'

const answeredSurveysSchema = new mongoose.Schema({
    surveyData: String,
    surveyAnswers: String,
    surveyId: mongoose.Schema.Types.ObjectId,
    surveyTitle: String
}, { _id: false,timestamps: true })

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    answeredSurveys: [answeredSurveysSchema]
});

export default mongoose.model('User', userSchema);