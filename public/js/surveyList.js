const ListOptionsLinkBtn = $('.listOptionsLinkBtn')


ListOptionsLinkBtn.click(async function (e) {

    const surveyId = $(this).data('survey-id');

    try {
        const response = await jQuery.ajax({
            method: "PUT",
            url: `/admin/surveyVisibility/${surveyId}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        console.log(response);
        if (response.survey.visible === true) {
            console.log(`#${surveyId}`);
            $(`#${surveyId}`).html(`<i class="fas fa-eye"></i>Visible`)
        }
        if (response.survey.visible === false) {
            $(`#${surveyId}`).html(`<i class="fas fa-eye-slash text-muted"></i>Hidden`)
        }
        alert(`Survey "${response.survey.title}" is now ${response.survey.visible ? 'visible': 'hidden'}`);
    }

    catch (err) {
        console.error(err)
        alert('Something went wrong :-(')
    }
    // const requestData = {surveyText: survey.text, surveyTitle}
    // $(loadingID).show()
    // $(saveSurveyID).text('Saving...')
    // $(SaveSurveyBtn).prop("disabled",true);
    // try {
    //     const response = await jQuery.ajax({
    //         method: "POST",
    //         url: "/admin/createSurvey",
    //         data: JSON.stringify(requestData),
    //         contentType: "application/json; charset=utf-8",
    //         dataType: "json"
    //     })
    //     $(loadingID).hide()
    //     $(saveSurveyID).text('Save Survey')
    //     ////Step 3 (This code run on Chrome)
    //     console.log('step3');
    //     console.log(response);
    //     console.log('Survey Data:',response.surveyData)
    //     console.log('Title:',response.title)
    //     alert('Survey created')

    //     window.location.href=`/admin/surveyList`
    // }
    // catch (err) {
    //     console.error(err)
    //     alert('Something went wrong :-(')
    // }
})



