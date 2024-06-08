document.addEventListener("DOMContentLoaded", function () {
  const logout_btn = document.getElementById("logout_btn");
  logout_btn.addEventListener("click", logout);
});

function logout() {
  fetch('./endpoints/login.php', {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(function (response) { document.location = './login.html'; })
    .catch(function (error) { alert("logout failed"); });
}