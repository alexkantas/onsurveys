const surveyJSON = JSON.parse(surveyData)
const survey = new Survey.Model(surveyJSON);
console.log(surveyJSON);

$("#surveyContainer").Survey({
    model: survey,
    async onComplete(survey) {
        try {
            const surveyAnswers = JSON.stringify(survey.data);
            const surveyTitle = surveyJSON.title
            const requestData = { surveyData, surveyId, surveyAnswers, surveyTitle }

            const response = await jQuery.ajax({
                method: "POST",
                url: "/user/answerSurvey",
                data: JSON.stringify(requestData),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })

            // console.log(response);
            alert('Survey submitted successfully')
        }
        catch (err) {
            survey.clear(false)
            console.error(err)
            alert('Something went wrong while submiting your survey :-(')
        }
    }
});