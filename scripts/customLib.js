function clearAllMessages() {
    const errorMessageContainer = document.getElementById('error_messages');
    errorMessageContainer.innerText = '';
    const successMessageContainer = document.getElementById('success_messages');
    successMessageContainer.innerText = '';
}

function displayError(errorMessage) {
    const errorMessageContainer = document.getElementById('error_messages');
    const element = document.createElement('div');
    element.classList.add("error_toast");
    const text = document.createTextNode(errorMessage);
    element.appendChild(text);
    errorMessageContainer.appendChild(element);
    window.setTimeout(() => { clearAllMessages();}, 4000);

}

function displaySuccess(successMessage) {
    const successMessageContainer = document.getElementById('success_messages');
    const element = document.createElement('div');
    element.classList.add("success_toast");
    const text = document.createTextNode(successMessage);
    element.appendChild(text);
    successMessageContainer.appendChild(element);
    window.setTimeout(() => { window.location.reload();}, 1500);

}