
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("login_submitButton");
    button.addEventListener("click", login);
});

function login() {

    clearAllErrors();

    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;
    const bodyData = {
        email: email,
        password: password
    }
    fetch('./endpoints/login.php', {
        method: 'POST',
        body: JSON.stringify(bodyData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error();
        }
    })
    .then(function (response) {
        if (response['isAdmin']) {
            document.location = './home_page_admin.html';
        } else {
            document.location = './home_page.html';
        }
    })
    .catch(function () { displayError("Неуспешен вход") });
}

function displayError(errorMessage) {
    const errorMessageContainer = document.getElementById('login_error_messages');
    const element = document.createElement('div');
    element.classList.add("error_toast");
    const text = document.createTextNode(errorMessage);
    element.appendChild(text);
    errorMessageContainer.appendChild(element);
    errorMessageContainer.setAttribute('style', 'display:block');
}

function clearAllErrors() {
    const errorMessageContainerLogin = document.getElementById('login_error_messages');
    if (errorMessageContainerLogin) {
     errorMessageContainerLogin.setAttribute('style', 'display:none');
    errorMessageContainerLogin.innerText = '';

    }

    const errorMessageContainerReg = document.getElementById('reg_error_messages');
    if (errorMessageContainerReg) {
        errorMessageContainerReg.innerText = '';
    }


}