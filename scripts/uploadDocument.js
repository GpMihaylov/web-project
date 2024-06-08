document.addEventListener("DOMContentLoaded", function () {
    const uploadDocumentBTN = document.getElementById("uploadDocumentBTN");
    uploadDocumentBTN.addEventListener("click", uploadDocument);
});

function uploadDocument() {

    clearAllMessages();

    var select = document.getElementById('categories');
    var category = select.options[select.selectedIndex].value;


    var uploadedDocuments = document.getElementById('uploaded_file').files;
    if (uploadedDocuments.length > 1) {
        displayError('Може да се качва само по един файл.');
        return;
    } else if (uploadedDocuments.length === 0) {
        displayError('Избери файл, който да качиш!');
        return;
    }

    let access_key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let formData = new FormData();
    formData.append("file", uploadedDocuments[0]);
    formData.append("username", "ivan");
    formData.append("access_key", access_key);
    formData.append("category", category);

    fetch('./endpoints/uploadDocument.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("");
            }
        })
        .then(function (response) {
            closeUploadForm();
            enableAccessKeyForm(access_key);
        })
        .catch(function (error) { 
            displayError('Файлът вече съществува!');
        });
}

function openUploadDocumentForm() {
    document.getElementById("upload_document_form").style.display = "block";
    document.getElementById("page").style.opacity = 0.3;
    document.getElementById("page").style.pointerEvents = "none";
}

function closeUploadForm() {
    document.getElementById("uploaded_file").value = "";
    document.getElementById("upload_document_form").style.display = "none";
    document.getElementById("page").style.opacity = 1;
    document.getElementById("page").style.pointerEvents = "all";
}

function enableAccessKeyForm(access_key) {
    document.getElementById("generated_key_popup").style.display = "block";
    document.getElementById("generated_access_key").value = access_key;
    document.getElementById("page").style.opacity = 0.3;
    document.getElementById("page").style.pointerEvents = "none";
}