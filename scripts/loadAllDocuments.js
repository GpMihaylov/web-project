document.addEventListener("DOMContentLoaded", function () {
    var url = new URL(location.href);
    switch (url.searchParams.get('category')) {
        case "all":
            loadAllDocuments();
            break;
        case "Sesiq":
        case "UchebenOtdel":
        case "OtdelStudenti":
        case "KandidatStudenti":
        case "NoCategory":
            showByCategory(url.searchParams.get('category'));
            break;
        default:
            loadAllDocuments();
    }
});

class UploadedDocument {
    constructor({ file_name, user, location, category, archived,
        times_downloaded, access_key, document_priority, status }) {
        this.file_name = file_name;
        this.user = user;
        this.location = location;
        this.category = category;
        this.archived = archived;
        this.times_downloaded = times_downloaded;
        this.access_key = access_key;
        this.document_priority = document_priority;
        this.status = status;
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
        const name_text = document.createTextNode(`${this.file_name}`);
        document_name_div.appendChild(name_text);
        document_content_div.appendChild(document_name_div);


        //Owner row
        const document_owner_label_div = document.createElement('div');
        document_owner_label_div.classList.add("label");
        const owner_label_text = document.createTextNode("Owner");
        document_owner_label_div.appendChild(owner_label_text);
        document_content_div.appendChild(document_owner_label_div);

        const document_owner_div = document.createElement('div');
        document_owner_div.classList.add("content");
        const owner_text = document.createTextNode(`${this.user}`);
        document_owner_div.appendChild(owner_text);
        document_content_div.appendChild(document_owner_div);


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
        const priority_label_text = document.createTextNode("Priority");
        document_priority_label_div.appendChild(priority_label_text);
        document_content_div.appendChild(document_priority_label_div);

        const document_priority_div = document.createElement('div');
        document_priority_div.classList.add("content");
        const document_priority_text = document.createTextNode(`${this.document_priority}`);
        document_priority_div.appendChild(document_priority_text);
        document_content_div.appendChild(document_priority_div);


        //Is Archived row
        const document_archived_label_div = document.createElement('div');
        document_archived_label_div.classList.add("label");
        const archived_label_text = document.createTextNode("Is archived");
        document_archived_label_div.appendChild(archived_label_text);
        document_content_div.appendChild(document_archived_label_div);

        const document_archived_div = document.createElement('div');
        document_archived_div.classList.add("content");
        document_archived_div.classList.add("bottom-right");
        var document_archived_text;
        if (`${this.archived}` == 1) {
            document_archived_text = document.createTextNode("yes");
        } else {
            document_archived_text = document.createTextNode("no");
        }

        document_archived_div.appendChild(document_archived_text);
        document_content_div.appendChild(document_archived_div);


        //Status row
        const document_status_label_div = document.createElement('div');
        document_status_label_div.classList.add("label");
        const status_label_text = document.createTextNode("Status");
        document_status_label_div.appendChild(status_label_text);
        document_content_div.appendChild(document_status_label_div);

        const document_status_div = document.createElement('div');
        document_status_div.classList.add("content");
        const document_status_text = document.createTextNode(`${this.status}`);
        document_status_div.appendChild(document_status_text);
        document_content_div.appendChild(document_status_div);


        //archive button
        const archive_div = document.createElement('div');
        archive_div.classList.add("button-holder");

        const archive_button = document.createElement('button');
        archive_button.classList.add("priority-button")

        var archive_img = document.createElement('img');
        archive_img.setAttribute('src', 'images/archive.png');
        archive_button.appendChild(archive_img);
        archive_button.setAttribute('title', "Архивирай")
        archive_button.addEventListener("click", archiveFile.bind(null, this.file_name, this.user));
        archive_div.appendChild(archive_button);
        document_div.appendChild(archive_div);


        //unarchive button
        const unarchive_div = document.createElement('div');
        unarchive_div.classList.add("button-holder");

        const unarchive_button = document.createElement('button');
        unarchive_button.classList.add("delete-button");

        var unarchive_img = document.createElement('img');
        unarchive_img.setAttribute('src', 'images/unarchive.png');
        unarchive_button.appendChild(unarchive_img);
        unarchive_button.setAttribute('title', "Разархивирай")
        unarchive_button.addEventListener("click", unarchiveFile.bind(null, this.file_name, this.user));
        unarchive_div.appendChild(unarchive_button);
        document_div.appendChild(unarchive_div);


        //download button
        const download_div = document.createElement('div');
        download_div.classList.add("button-holder");

        const download_button = document.createElement('button');
        download_button.classList.add("download-button");

        var download_img = document.createElement('img');
        download_img.setAttribute('src', 'images/download.png');
        download_button.appendChild(download_img);
        download_button.setAttribute('title', "Изтегли")
        download_button.addEventListener("click", downloadFileAsAdmin.bind(null, this.file_name, this.user, this.location));
        download_div.appendChild(download_button);
        document_div.appendChild(download_div);


        //status button
        const status_div = document.createElement('div');
        status_div.classList.add("button-holder");

        const status_button = document.createElement('button');
        status_button.classList.add("status-button");

        var status_img = document.createElement('img');
        status_img.setAttribute('src', 'images/status.png');
        status_button.appendChild(status_img);
        status_button.setAttribute('title', "Задай статус")

        const status_dropdown = document.createElement('div');
        status_dropdown.classList.add('dropdown-menu');
        status_dropdown.style.display = 'none';

        const option1 = document.createElement('div');
        option1.classList.add('dropdown-option');
        option1.textContent = 'Одобрено';
        option1.addEventListener("click", changeStatus.bind(null, this.file_name, this.user, 'Одобрено'));

        status_dropdown.style.display = 'none';
        status_dropdown.appendChild(option1);

        const option2 = document.createElement('div');
        option2.classList.add('dropdown-option');
        option2.textContent = 'Отхвърлено';
        option2.addEventListener("click", changeStatus.bind(null, this.file_name, this.user, 'Отхвърлено'));
        
        status_dropdown.style.display = 'none';
        status_dropdown.appendChild(option2);

        status_button.addEventListener('click', function (event) {
            event.stopPropagation();
            if (status_dropdown.style.display === 'none') {
                status_dropdown.style.display = 'block';
            } else {
                status_dropdown.style.display = 'none';
            }
        });

        status_div.appendChild(status_button);
        document_div.appendChild(status_div);
        status_div.appendChild(status_dropdown);


        return document_div;
    }

}

function loadAllDocuments() {
    clearAllMessages();
    var url = new URL(location.href);
    if (url.searchParams.get('category') != "all") {
        url.searchParams.set('category', "all");
        location.href = url;
    }
    clearDocumentsDiv();

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
        .catch(function (error) { 
            displayError('Проблем със зареждането на документите.'); 
        });
}

function renderDocuments(documentsData) {
    const documentContainer = document.getElementById('all_documents');

    documentsData.map(documentData => new UploadedDocument(documentData))
        .map(document => document.createHTTMLDocumentElement())
        .forEach(documentElement => {
            documentContainer.appendChild(documentElement);
        });
}


function renderWelcomeDiv(username) {
    const welcomeContainer = document.getElementById('login_greeting');
    welcomeContainer.innerText = '';
    const text = document.createTextNode(`Добре дошъл, ${username}`);
    welcomeContainer.appendChild(text);
}


function archiveFile(file_name, username, event) {
    clearAllMessages();

    let formData = new FormData();
    formData.append("file_name", file_name);
    formData.append("username", username);
    formData.append("archive", "archive");

    fetch('./endpoints/archive.php', {
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
                displaySuccess("Файлът е архивиран успешно!");
            } else {
                displayError("Проблем с архивирането на файла!");
            }

        })
        .catch(function (error) { 
            displayError("Възникна грешка!");
        });
}


function unarchiveFile(file_name, username, event) {

    clearAllMessages();

    let formData = new FormData();
    formData.append("file_name", file_name);
    formData.append("username", username);
    formData.append("archive", "unarchive");

    fetch('./endpoints/archive.php', {
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
                displaySuccess("Файлът е разархивиран успешно!");
            } else {
                displayError("Проблем с разархивирането на файла!");
            }

        })
        .catch(function (error) { 
            displayError("Възникна грешка!");
        });

}


function downloadFileAsAdmin(file_name, username, location, event) {

    clearAllMessages();

    let formData = new FormData();
    formData.append("file_name", file_name);
    formData.append("username", username);

    fetch('./endpoints/downloadDocumentAdmin.php', {
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
            if (!response['success']) {
                displayError("Възникна грешка при изтеглянето на файла!");
            } else {
                window.location.reload();
                var link = document.createElement("a");
                link.setAttribute('download', file_name);
                link.href = location;
                link.click();
                link.remove();
            }
        })
        .catch(function (error) {             
            displayError("Възникна грешка!");
        });

}

function changeStatus(file_name, username, status) {
    clearAllMessages();
    
    console.log(`Changing status for file: ${file_name}, user: ${username}, status: ${status}`);
    
    let formData = new FormData();
    formData.append("file_name", file_name);
    formData.append("username", username);
    formData.append("status", status);

    fetch('./endpoints/changeStatus.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            console.log("Response status:", response.status);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("");
            }
        })
        .then(function (response) {
            console.log("Response JSON:", response);
            if (response['success']) {
                displaySuccess("Статусът е променен успешно!");
            } else {
                displayError("Проблем с промяната на статуса!");
            }

        })
        .catch(function (error) { 
            displayError("Възникна грешка!");
        });
}

function showByCategory(category) {
    clearAllMessages();
    var url = new URL(location.href);
    if (url.searchParams.get('category') != category) {
        url.searchParams.set('category', category);
        location.href = url;
    }
    clearDocumentsDiv();
    let formData = new FormData();
    formData.append("category", category);

    fetch('./endpoints/loadDocumentsByCategory.php', {
        method: 'POST',
        body: formData
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
    .catch(function (error) {
        displayError('Проблем със зареждането на документите.');
    });
}

function clearDocumentsDiv() {
    const documentContainer = document.getElementById('all_documents');
    documentContainer.innerText = '';
}