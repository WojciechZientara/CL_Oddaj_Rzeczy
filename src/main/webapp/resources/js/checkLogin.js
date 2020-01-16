$(function () {
    checkLogin()
});

function checkLogin() {
    var token = localStorage.getItem('charityToken')
    if (token !== null) {
        var userEmail = parseJwt(token).sub;
        getUserDetails(userEmail, token);
    }
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function getUserDetails(userEmail, token) {
    var bearerToken = 'Bearer ' + token;
    $.ajax({
        url: 'http://localhost:8080/getUserDetails',
        data: JSON.stringify({
            email: userEmail
        }),
        method: 'POST',
        contentType: "application/json",
        headers: {
            'Authorization': bearerToken
        },
        success: function (result) {
            displayLoggedMenu(result);
        }
    });
}

function displayLoggedMenu(dto) {
    $('#notLogged').hide();
    $('#userFullName').text("Witaj " + dto.firstName);
    $('#logged').show();
    $('#logout').on("click", function (event) {
        event.preventDefault()
        localStorage.removeItem('charityToken')
        window.location.href = '/';
    })
}