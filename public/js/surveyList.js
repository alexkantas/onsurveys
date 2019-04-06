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
        // console.log(response);
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
})



