const UpdateSurveyBtn = document.getElementById('UpdateSurveyBtn')
const DeleteSurveyBtn = document.getElementById('DeleteSurveyBtn')
const loadingID = document.getElementById('loadingID')
const saveSurveyID = document.getElementById('saveSurveyID')

const editorOptions = {
    showEmbededSurveyTab: false,
    showTestSurveyTab: true,
    showJSONEditorTab: true,
    showTranslationTab: true,
    showOptions: false,
    showPropertyGrid: false,
    questionTypes: ["text", "checkbox", "radiogroup", "dropdown", "rating", "matrix", "comment"]

};
// pass the editorOptions into the constructor. It is an optional parameter.
const survey = new SurveyEditor.SurveyEditor("surveyEditorContainer", editorOptions);
survey.text = surveyData

UpdateSurveyBtn.addEventListener('click', async e => {
    //Step1 (This code run on Chrome)
    console.log('step1');
    const surveyTitle = JSON.parse(survey.text).title;

    if (!surveyTitle) {
        alert('Please give a title to the survey');
        return;
    }

    const requestData = { surveyText: survey.text, surveyTitle, surveyId }
    $(loadingID).show()
    $(saveSurveyID).text('Saving...')
    $(UpdateSurveyBtn).prop("disabled", true);
    try {
        const response = await jQuery.ajax({
            method: "PUT",
            url: "/admin/editSurvey",
            data: JSON.stringify(requestData),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        $(loadingID).hide()
        $(saveSurveyID).text('Update Survey')
        console.log('step3');
        console.log(response);
        console.log('Survey Data:', response.survey.surveyData)
        console.log('Title:', response.survey.title)
        alert('Survey updated')
    }
    catch (err) {
        console.error(err)
        alert('Something went wrong :-(')
    }
})


DeleteSurveyBtn.addEventListener('click', async e => {

    const confirmResponse = confirm('Delete this survey?')
    if (confirmResponse) {
        try {
            const response = await jQuery.ajax({
                method: "DELETE",
                url: `/admin/survey/${surveyId}`,
            })
            console.log(response);
            alert('Survey Deleted')
            window.location.href = `/admin/surveyList`
        }
        catch (err) {
            console.error(err)
            alert('Something went wrong :-(')
        }
    }
})
