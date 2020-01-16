$(function () {
    checkAccessAndPerformAction("getDonations")
});

function checkAccessAndPerformAction(functionName, object) {
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
            getUserDetailsAndContinue(userEmail, token, functionName, object)
        }
    }
}

function accessDenied() {
    window.location.href = '/';
}

function getUserDetailsAndContinue(userEmail, token, functionName, object) {
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
            if (functionName === "getDonations") {
            getDonations(result, bearerToken)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            accessDenied()
        }
    });
}

function getDonations(result, bearerToken) {
    $.ajax({
        url: 'http://localhost:8080/getDonations',
        data: JSON.stringify(result),
        method: 'POST',
        contentType: "application/json",
        headers: {
            'Authorization': bearerToken
        },
        success: function (result) {
            populateMyDonations(result, bearerToken)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            accessDenied()
        }
    })
}


function populateMyDonations(result, bearerToken) {
    console.log(result)


    for (var i = 0; i < result.length; i++) {
        var categories = ""
        for (var j = 0; j < result[i].categories.length; j++) {
            categories = categories + result[i].categories[j].name;
            if (j < result[i].categories.length - 1) {
                categories += "<br>"
            }
        }

        if (result[i].status === "!!!nie odebrano") {
            result[i].status = "nie odebrano"
        }

        var newLine = '<tr>' +
            '<td>' + result[i].institution.name + '</td>' +
            '<td>' + categories + '</td>' +
            '<td>' + result[i].quantity + '</td>' +
            '<td>' + result[i].street + '<br>' + result[i].city + '<br>' + result[i].zipCode + '</td>' +
            '<td>' + result[i].pickUpDate + '<br>' + result[i].pickUpTime + '</td>' +
            '<td>' + result[i].pickUpComment + '</td>' +
            '<td>' + result[i].status + '</td>' +
            "<td><button class='del' data-id='" + result[i].id + "'>Anuluj</button>" + "</td>" +
            "</tr>"

        $('#dbRecords #recordsBody').append(newLine)
    }
    activateDeleteButtons(bearerToken)
}

function activateDeleteButtons(bearerToken) {

    var dels = $(".del");
    for (var i = 0; i < dels.length; i++) {
        dels.eq(i).on("click", function () {
            var itemId = $(this).data("id")

            $.ajax({
                url: "http://localhost:8080/deleteDonation/"  + itemId,
                data: {},
                type: "GET",
                contentType: "application/json",
                headers: {
                    'Authorization': bearerToken
                },
                success: function (result) {
                    $('#dbRecords #recordsBody').html("");
                    checkAccessAndPerformAction("getDonations")
                }
            });

        })
    }
}