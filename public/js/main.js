const SaveSurveyBtn = document.getElementById('SaveSurveyBtn')

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
    console.log(survey.text)
})