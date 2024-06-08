document.addEventListener("DOMContentLoaded", function () {
    loadUserDocuments();

    const download_in_form_btn = document.getElementById('download_in_form_btn');
    download_in_form_btn.addEventListener("click", downloadFileFireEvent);
});

class UploadedDocument {
    constructor({ file_name, user, location, category, archived,
        times_downloaded, access_key, document_priority }) {
        this.file_name = file_name;
        this.user = user;
        this.location = location;
        this.category = category;
        this.archived = archived;
        this.times_downloaded = times_downloaded;
        this.access_key = access_key;
        this.document_priority = document_priority;
    }

    createHTTMLDocumentElement() {
        const document_div = document.createElement('div');
        document_div.classList.add("document-wrapper");

        const document_content_div = document.createElement('div');
        document_content_div.classList.add("document-content");

        document_div.appendChild(document_content_div);

        //Name row
        const document_name_label_div = document.createElement('div');
        document_name_label_div.classList.add("label");
        const name_label_text = document.createTextNode("Name");
        document_name_label_div.appendChild(name_label_text);
        document_content_div.appendChild(document_name_label_div);

        const document_name_div = document.createElement('div');
        document_name_div.classList.add("content");
        const name_text = document.createTextNode(`${this.file_name} `);
        document_name_div.appendChild(name_text);
        document_content_div.appendChild(document_name_div);


        //Category row
        const document_category_label_div = document.createElement('div');
        document_category_label_div.classList.add("label");
        const category_label_text = document.createTextNode("Category");
        document_category_label_div.appendChild(category_label_text);
        document_content_div.appendChild(document_category_label_div);

        const document_category_div = document.createElement('div');
        document_category_div.classList.add("content");
        const category_text = document.createTextNode(`${this.category} `);
        document_category_div.appendChild(category_text);
        document_content_div.appendChild(document_category_div);


        //Times downloaded row
        const document_times_downloaded_label_div = document.createElement('div');
        document_times_downloaded_label_div.classList.add("label");
        const times_downloaded_label_text = document.createTextNode("Downloaded");
        document_times_downloaded_label_div.appendChild(times_downloaded_label_text);
        document_content_div.appendChild(document_times_downloaded_label_div);

        const document_times_downloaded_div = document.createElement('div');
        document_times_downloaded_div.classList.add("content");
        const times_downloaded_text = document.createTextNode(`${this.times_downloaded} times`);
        document_times_downloaded_div.appendChild(times_downloaded_text);
        document_content_div.appendChild(document_times_downloaded_div);


        //Priority row
        const document_priority_label_div = document.createElement('div');
        document_priority_label_div.classList.add("label");
        const document_priority_label_text = document.createTextNode("Priority");
        document_priority_label_div.appendChild(document_priority_label_text);
        document_content_div.appendChild(document_priority_label_div);

        const document_priority_div = document.createElement('div');
        document_priority_div.classList.add("content");
        document_priority_div.classList.add("bottom-right");
        const document_priority_text = document.createTextNode(`${this.document_priority}`);
        document_priority_div.appendChild(document_priority_text);
        document_content_div.appendChild(document_priority_div);


        if (this.document_priority === "low") {

            //increase priority button
            const increase_priority_div = document.createElement('div');
            increase_priority_div.classList.add("button-holder");

            const increase_priority_button = document.createElement('button');
            increase_priority_button.classList.add("priority-button")
            increase_priority_button.setAttribute('title', "Увеличи приоритета")

            var priority_img = document.createElement('img');
            priority_img.src = "images/increase.png";
            //const increase_priority_button_text = document.createTextNode('Увеличи приоритета');

            increase_priority_button.appendChild(priority_img);
            increase_priority_button.addEventListener("click", increasPriority.bind(null, this.file_name));
            increase_priority_div.appendChild(increase_priority_button);
            document_div.appendChild(increase_priority_div);
        }

        if (this.document_priority === "high") {


            //decrease priority button
            const decrease_priority_div = document.createElement('div');
            decrease_priority_div.classList.add("button-holder");

            const decrease_priority_button = document.createElement('button');
            decrease_priority_button.classList.add("priority-button")
            decrease_priority_button.setAttribute('title', "Намали приоритета")

            var priority_img = document.createElement('img');
            priority_img.src = "images/decrease.png";

            decrease_priority_button.appendChild(priority_img);
            decrease_priority_button.addEventListener("click", decreasPriority.bind(null, this.file_name));
            decrease_priority_div.appendChild(decrease_priority_button);
            document_div.appendChild(decrease_priority_div);
        }

        
        //delete button
        const delete_div = document.createElement('div');
        delete_div.classList.add("button-holder");

        const delete_button = document.createElement('button');
        delete_button.classList.add("delete-button");
        delete_button.setAttribute('title', "Изтрий файла");

        var delete_img = document.createElement('img');
        delete_img.setAttribute('src', 'images/delete.png');

        delete_button.appendChild(delete_img);
        delete_button.addEventListener("click", deleteDocument.bind(null, this.file_name));
        delete_div.appendChild(delete_button);
        document_div.appendChild(delete_div);


        
        const download_div = document.createElement('div');
        download_div.classList.add("button-holder");

        const download_button = document.createElement('button');
        download_button.classList.add("download-button");

        var download_img = document.createElement('img');
        download_img.setAttribute('src', 'images/download.png');

        download_button.setAttribute('title', "Изтегли файла");
        download_button.appendChild(download_img);
        download_button.addEventListener("click", downloadDocument.bind(null, this.file_name));
        download_div.appendChild(download_button);
        document_div.appendChild(download_div);

        return document_div;
    }
}

function loadUserDocuments() {

    clearAllMessages();

    fetch('./endpoints/loadUserDocuments.php', {
        method: 'GET'
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error();
            }
        })
        .then(function (response) {
            renderWelcomeDiv(response['username']);
            renderDocuments(response['documents']);
        })
        .catch(function () {displayError('Проблем със зареждането на документите.'); });
}

function renderDocuments(documentsData) {
    const documentContainer = document.getElementById('documentsForUser');

    documentsData.map(documentData => new UploadedDocument(documentData))
        .map(document => document.createHTTMLDocumentElement())
        .forEach(documentElement => {
            documentContainer.appendChild(documentElement);
        });
}

function renderWelcomeDiv(username) {
    const welcomeContainer = document.getElementById('login_greeting');
    const text = document.createTextNode(`Добре дошъл, ${username}`);
    welcomeContainer.appendChild(text);
}


function increasPriority(file, event) {

    clearAllMessages();

    let formData = new FormData();
    formData.append("file_name", file);

    fetch('./endpoints/increasePriorityForDocument.php', {
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
            if (response['success']) {
                displaySuccess('Приоритета е зададен като висок.');
            } else {
                displayError('Проблем с промяната на приоритета.');
            }
        })
        .catch(function () {
            displayError('Грешка при задаването на приоритет.');
        });
}

function decreasPriority(file, event) {

    clearAllMessages();

    let formData = new FormData();
    formData.append("file_name", file);

    fetch('./endpoints/decreasePriorityForDocument.php', {
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
            if (response['success']) {
                displaySuccess('Приоритета е зададен като нисък.');
            } else {
                displayError('Проблем с промяната на приоритета.');
            }
        })
        .catch(function () {
            displayError('Грешка при задаването на приоритет.');
        });
}


function deleteDocument(file, event) {

    clearAllMessages();

    let formData = new FormData();
    formData.append("file_name", file);


    fetch('./endpoints/deleteDocument.php', {
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
            if (response['success']) {
                displaySuccess('Файлът е изтрит успешно!');
            } else {
                displayError('Грешка при триенето на файла!');
            }
        })
        .catch(function (error) { 
            displayError('Грешка при триенето на файла!'); 
        });
}



function downloadDocument(file, event) {
    document.getElementById("download_form").style.display = "block";
    document.getElementById("hidden_file_name").value = file;
    document.getElementById("page").style.opacity = 0.3;
    document.getElementById("page").style.pointerEvents = "none";
}

function downloadFileFireEvent() {

    clearAllMessages();

    document.getElementById("download_form").style.display = "none";
    var file_name = document.getElementById("hidden_file_name").value;
    var access_key = document.getElementById("access_key_input").value;

    let formData = new FormData();
    formData.append("file_name", file_name);
    formData.append("access_key", access_key);

    fetch('./endpoints/downloadDocument.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("File already exists");
            }
        })
        .then(function (response) {
            if (response['error']) {
                closeDownloadForm();
                displayError(response['error']);
                
            } else if (response['url'] && response['file_name']) {
                var link = document.createElement("a");
                link.setAttribute('download', response['file_name']);
                link.href = response['url'];
                link.click();
                link.remove();
                window.location.reload();
                closeDownloadForm();
            }
        })
        .catch(function (error) { 
            displayError('Грешка при изтеглянето!');
        });
}


function closeDownloadForm() {
    document.getElementById("download_form").style.display = "none";
    document.getElementById("access_key_input").value = '';
    document.getElementById("page").style.opacity = 1;
    document.getElementById("page").style.pointerEvents = "all";
}

function closeAccessKeyForm() {
    document.getElementById("generated_key_popup").style.display = "none";
    document.getElementById("generated_access_key").value = '';
    window.location.reload();
    document.getElementById("page").style.opacity = 1;
    document.getElementById("page").style.pointerEvents = "all";
}

function copyAccessKey() {
    var copyText = document.getElementById("generated_access_key");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    document.getElementById("generated_key_popup").style.display = "none";
    document.getElementById("generated_access_key").value = '';
    document.getElementById("page").style.opacity = 1;
    document.getElementById("page").style.pointerEvents = "all";
    displaySuccess("Ключът е копиран успешно.");
}
