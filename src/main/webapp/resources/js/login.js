$(function () {
    setupLoginForm()
});

function setupLoginForm() {
    $('#loginForm .btn[type=submit]').on("click", function (event) {
        event.preventDefault();
        var userDto = {
            email: $('#loginForm input[name=email]').val(),
            password: $('#loginForm input[name=password]').val()
        }
        loginUser(userDto);
    })

}

function loginUser(dto) {
    $.ajax({
        url: 'http://localhost:8080/authenticate',
        data: JSON.stringify({
            email: dto.email,
            password: dto.password
        }),
        method: 'POST',
        contentType: "application/json",
        success: function (result) {
            saveTokenAndGetUserData(result);
        }
    });
}

function saveTokenAndGetUserData(result) {
    localStorage.setItem('charityToken', result.token);
    var jwt = parseJwt(result.token)
    getUserDetailsAndRedirect(jwt.sub, result.token)

}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function getUserDetailsAndRedirect(userEmail, token) {
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
            if (result.roles[0].name === 'ROLE_ADMIN') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/donate';
            }
        }
    });
}