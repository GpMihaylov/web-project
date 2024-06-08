document.addEventListener("DOMContentLoaded", function () {
    fetch('./endpoints/login.php', {
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
            if (!response['logged']) {
                document.location = './login.html';
            } else if (!response['isAdmin']) {
                document.location = './home_page.html';
            }
        })
        .catch(function () { });
});
