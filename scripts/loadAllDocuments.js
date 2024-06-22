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
        times_downloaded, access_key, document_priority, status, upload_date, change_date }) {
        this.file_name = file_name;
        this.user = user;
        this.location = location;
        this.category = category;
        this.archived = archived;
        this.times_downloaded = times_downloaded;
        this.access_key = access_key;
        this.document_priority = document_priority;
        this.status = status;
        this.upload_date = upload_date;
        this.change_date = change_date;
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

        // Upload date row
        const document_upload_date_label_div = document.createElement('div');
        document_upload_date_label_div.classList.add("label");
        const upload_date_label_text = document.createTextNode("Upload date");
        document_upload_date_label_div.appendChild(upload_date_label_text);
        document_content_div.appendChild(document_upload_date_label_div);

        const document_upload_date_div = document.createElement('div');
        document_upload_date_div.classList.add("content");

        const upload_date = new Date(this.upload_date);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
            timeZone: 'Europe/Sofia'
        };
        const upload_date_text = document.createTextNode(upload_date.toLocaleString('bg-BG', options));
        document_upload_date_div.appendChild(upload_date_text);
        document_content_div.appendChild(document_upload_date_div);

        // last change date row
        const document_last_change_label_div = document.createElement('div');
        document_last_change_label_div.classList.add("label");
        const last_change_label_text = document.createTextNode("Last change");
        document_last_change_label_div.appendChild(last_change_label_text);
        document_content_div.appendChild(document_last_change_label_div);

        const document_last_change_div = document.createElement('div');
        document_last_change_div.classList.add("content");

        const change_date = new Date(this.change_date);
        const last_change_text = document.createTextNode(change_date.toLocaleString('bg-BG', options));
        document_last_change_div.appendChild(last_change_text);
        document_content_div.appendChild(document_last_change_div);


        //Is Archived row
        const document_archived_label_div = document.createElement('div');
        document_archived_label_div.classList.add("label");
        const archived_label_text = document.createTextNode("Is archived");
        document_archived_label_div.appendChild(archived_label_text);
        document_content_div.appendChild(document_archived_label_div);

        const document_archived_div = document.createElement('div');
        document_archived_div.classList.add("content");
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


        //send button
        const forward_div = document.createElement('div');
        forward_div.classList.add("button-holder");

        const forward_button = document.createElement('button');
        forward_button.classList.add("forward-button");

        var forward_img = document.createElement('img');
        forward_img.setAttribute('src', 'images/forward.png');
        forward_button.appendChild(forward_img);
        forward_button.setAttribute('title', "Препрати")



        const dropdown_menu = document.createElement('div');
        dropdown_menu.classList.add('dropdown-menu');
        dropdown_menu.style.display = 'none';

        if (`${this.category}` != 'OtdelStudenti') {
            const option1 = document.createElement('div');
            option1.classList.add('dropdown-option');
            option1.textContent = 'Отдел студенти';
            option1.addEventListener("click", forwardTo.bind(null, this.file_name, this.user, 'OtdelStudenti'));
            dropdown_menu.style.display = 'none';
            dropdown_menu.appendChild(option1);
        }
        if (`${this.category}` != 'UchebenOtdel') {
            const option2 = document.createElement('div');
            option2.classList.add('dropdown-option');
            option2.textContent = 'Учебен отдел';
            option2.addEventListener("click", forwardTo.bind(null, this.file_name, this.user, 'UchebenOtdel'));
            dropdown_menu.style.display = 'none';
            dropdown_menu.appendChild(option2);
        }
        if (`${this.category}` != 'KandidatStudenti') {
            const option3 = document.createElement('div');
            option3.classList.add('dropdown-option');
            option3.textContent = 'Кандидат-студенти';
            option3.addEventListener("click", forwardTo.bind(null, this.file_name, this.user, 'KandidatStudenti'));
            dropdown_menu.style.display = 'none';
            dropdown_menu.appendChild(option3);
        }
        if (`${this.category}` != 'Sesiq') {
            const option4 = document.createElement('div');
            option4.classList.add('dropdown-option');
            option4.textContent = 'Сесия';
            option4.addEventListener("click", forwardTo.bind(null, this.file_name, this.user, 'Sesiq'));
            dropdown_menu.style.display = 'none';
            dropdown_menu.appendChild(option4);
        }

        forward_button.addEventListener('click', function (event) {
            event.stopPropagation();
            if (dropdown_menu.style.display === 'none') {
                dropdown_menu.style.display = 'block';
            } else {
                dropdown_menu.style.display = 'none';
            }
        });


        forward_div.appendChild(forward_button);
        document_div.appendChild(forward_div);
        forward_div.appendChild(dropdown_menu);

      
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
                displaySuccess("Файлът е изтеглен успешно! Промяна на статуса...");
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

    let formData = new FormData();
    formData.append("file_name", file_name);
    formData.append("username", username);
    formData.append("status", status);

    fetch('./endpoints/changeStatus.php', {
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
                displaySuccess("Статусът е променен успешно!");
            } else {
                displayError("Проблем с промяната на статуса!");
            }
        })
        .catch(function (error) { 
            displayError("Възникна грешка!");
        });
}

function forwardTo(file_name, username, new_category, event) {
    clearAllMessages();

    let formData = new FormData();
    formData.append("file_name", file_name);
    formData.append("username", username);
    formData.append("new_category", new_category);

    fetch('./endpoints/forward.php', {
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
                displaySuccess("Файлът е препратен успешно!");
            } else {
                displayError("Проблем с препращането на файла!");
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