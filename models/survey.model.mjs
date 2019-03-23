import mongoose from 'mongoose'

const surveySchema = new mongoose.Schema({
    surveyData: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        default:false,
        required: false
    }
}, { timestamps: true });

export default mongoose.model('Survey', surveySchema);