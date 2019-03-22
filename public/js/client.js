const btnUpdate = document.getElementById('updateBtn')
const nameInput = document.getElementById('name-input')
const lastnameInput = document.getElementById('lastName-input')
const passwordInput = document.getElementById('password-input')
const idInput = document.getElementById('userId')
const fullnameId = document.getElementById('user-fullname')

btnUpdate.addEventListener('click', async e => {
    console.log(nameInput.value)
    console.log(lastnameInput.value)
    console.log(passwordInput.value)
    console.log(idInput.value)

    const data = {id: idInput.value}
    if(nameInput.value) data.name = nameInput.value
    if(lastnameInput.value) data.lastName = lastnameInput.value
    if(passwordInput.value) data.password = passwordInput.value

    console.log('Update profile')
    try {
        const response = await jQuery.ajax({
            method: "PUT",
            url: "/user/myProfile",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        })
        console.log(response)
        alert('Profile info updated succesully')
        fullnameId.innerText= `${response.name} ${response.lastName}`
    }
    catch (err) {
        console.error(err)
        alert('Something went wrong :-(')
    }
})
