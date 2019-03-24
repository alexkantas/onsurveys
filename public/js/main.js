const SaveSurveyBtn = document.getElementById('SaveSurveyBtn')
const loadingID = document.getElementById('loadingID')
const saveSurveyID = document.getElementById('saveSurveyID')

const editorOptions = {
    // show the embeded survey tab. It is hidden by default
    showEmbededSurveyTab: false,
    // hide the test survey tab. It is shown by default
    showTestSurveyTab: true,
    // hide the JSON text editor tab. It is shown by default
    showJSONEditorTab: true,
    // show the "Options" button menu. It is hidden by default 
    showOptions: false,
    showPropertyGrid: false, 
    questionTypes: ["text", "checkbox", "radiogroup", "dropdown", "rating", "matrix", "comment"]

};

// pass the editorOptions into the constructor. It is an optional parameter.
const survey = new SurveyEditor.SurveyEditor("surveyEditorContainer", editorOptions);


SaveSurveyBtn.addEventListener('click', async e => {
    //Step1 (This code run on Chrome)
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
        ////Step 3 (This code run on Chrome)
        console.log('step3');
        console.log(response);
        console.log('Survey Data:',response.surveyData)
        console.log('Title:',response.title)
        alert('Survey created')

        window.location.href=`/admin/surveyList`
    }
    catch (err) {
        console.error(err)
        alert('Something went wrong :-(')
    }
})


