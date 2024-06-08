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
      if (response['logged']) {
        if (response['isAdmin']) {
          document.location = './home_page_admin.html';
        } else {
          document.location = './home_page.html';
        }
      }
    })
    .catch(function () { });
});
