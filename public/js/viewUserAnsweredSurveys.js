const surveyJSON = JSON.parse(surveyData)
const data = JSON.parse(surveyAnswers)
const survey = new Survey.Model(surveyJSON);
console.log(surveyJSON);

$("#surveyContainer").Survey({
    model: survey,
    mode:'display',
    data,
    onComplete(survey) {
        var resultAsString = JSON.stringify(survey.data);
        console.log(resultAsString); //send Ajax request to your web server.
    }
});