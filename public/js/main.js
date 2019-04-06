const SaveSurveyBtn = document.getElementById('SaveSurveyBtn')
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


SaveSurveyBtn.addEventListener('click', async e => {
    console.log('step1');
    const surveyTitle = JSON.parse(survey.text).title;
    
    if(!surveyTitle) {
        alert ('Please give a title to the survey');
        return;    
    }

    const requestData = {surveyText: survey.text, surveyTitle}
    $(loadingID).show()
    $(saveSurveyID).text('Saving...')
    $(SaveSurveyBtn).prop("disabled",true);
    try {
        const response = await jQuery.ajax({
            method: "POST",
            url: "/admin/createSurvey",
            data: JSON.stringify(requestData),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        $(loadingID).hide()
        $(saveSurveyID).text('Save Survey')
        // console.log(response);
        // console.log('Survey Data:',response.surveyData)
        // console.log('Title:',response.title)
        alert('Survey created')

        window.location.href=`/admin/surveyList`
    }
    catch (err) {
        console.error(err)
        alert('Something went wrong :-(')
    }
})


