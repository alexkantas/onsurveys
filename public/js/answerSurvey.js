// var data = {"question1":"item1","question2":"Dispaly mode"};
var surveyJSON = JSON.parse(surveyData)
const survey = new Survey.Model(surveyJSON);
console.log(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    // mode:'display',
    // data,
    onComplete(survey) {
        var resultAsString = JSON.stringify(survey.data);
        console.log(resultAsString); //send Ajax request to your web server.
    }
});