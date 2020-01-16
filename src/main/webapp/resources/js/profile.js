$(function () {
    checkAccess()
});

function checkAccess() {
    var token = localStorage.getItem('charityToken');
    if (token === null) {
        accessDenied()
    } else {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var jwt = JSON.parse(jsonPayload);
        if (Date.now() >= jwt.exp * 1000) {
            localStorage.removeItem("charityToken")
            window.location.href = '/'
        } else {
            var userEmail = jwt.sub
            getUserDetails(userEmail, token)
        }
    }
}

function accessDenied() {
    window.location.href = '/';
}

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
            populateData(result, bearerToken)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            accessDenied()
        }
    });
}

function populateData(result, bearerToken) {

    $('#notLogged').hide();
    $('#userFullName').text("Witaj " + result.firstName);
    $('#logged').show();
    $('#logout').on("click", function (event) {
        event.preventDefault()
        localStorage.removeItem('charityToken')
        window.location.href = '/';
    })

    $('#myDataForm input[data-propertynumber=1]').val(result.firstName)
    $('#myDataForm input[data-propertynumber=2]').val(result.lastName)
    $('#myDataForm input[data-propertynumber=3]').val(result.email)

    $('#sendObject #submit').on('click',function (event) {
        event.preventDefault()
        pass1 = $('#myDataForm input[data-propertynumber=4]').val();
        pass2 = $('#myDataForm input[data-propertynumber=5]').val();
        if (pass1 === pass2 && pass1 !== "") {
            newObj = {
                firstName: $('#myDataForm input[data-propertynumber=1]').val(),
                lastName: $('#myDataForm input[data-propertynumber=2]').val(),
                email: $('#myDataForm input[data-propertynumber=3]').val(),
                password: $('#myDataForm input[data-propertynumber=4]').val(),
            }
            postUserDetails(newObj, bearerToken)
        }
    })
}

function postUserDetails(object, bearerToken) {

    $.ajax({
        url: 'http://localhost:8080/updateUserProfile',
        data: JSON.stringify(object),
        method: 'POST',
        contentType: "application/json",
        headers: {
            'Authorization': bearerToken
        },
        success: function (result) {
            window.location.href = '/profile';
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
    })
}