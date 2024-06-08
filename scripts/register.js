
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("reg_submitButton");
    button.addEventListener("click", register);
});

function register() {

    clearAllErrors();

    const email = document.getElementById("reg_email").value;
    const password = document.getElementById("reg_password").value;
    const confirmPassword = document.getElementById("reg_confirmPassword").value;
    errors = [];
    if (!emailFormat(email)) {
        errors.push("Имейлът не е с необходимият формат.");
    }
    if (!passwordFormat(password)) {
        errors.push("Паролата не е с необходимият формат. Поне 4 символа.");
    }
    if (password !== confirmPassword) {
        errors.push("Паролите не съвпадат.");
    }
    if (errors.length) {
        displayErrors(errors);
        return;
    }

    const bodyData = {
        email: email,
        password: password,
        isAdmin: false
    }
    fetch('./endpoints/register.php', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
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
            const bodyData = {
                email: response['email'],
                password: response['password']
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
                .catch(function () { displayErrors("Неуспешен вход") });
        })
        .catch(function () { displayErrors(["Неуспешна регистрация"]) });
}

function emailFormat(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function passwordFormat(password) {
    return password.length >= 4;
}

function displayErrors(errorMessages) {
    const errorMessageContainer = document.getElementById('reg_error_messages');

    errorMessages.map(errorMessage => {
        const element = document.createElement('div');
        element.classList.add("error_toast")
        const text = document.createTextNode(errorMessage);
        element.appendChild(text);
        return element;
    })
        .forEach(errorElement => {
            errorMessageContainer.appendChild(errorElement);
        });

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