$(function () {
    checkAccessAndPerformAction("activateButtons")
});

function checkAccessAndPerformAction(functionName, object) {
    // console.log(functionName)
    // console.log(object)
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
    window.location.href = '/donate';
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
            if (result.roles[0].name !== 'ROLE_ADMIN') {
                accessDenied()
            } else if (functionName === "activateButtons") {
            activateBtns()
            } else {
                prepareRequest(functionName, object)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            accessDenied()
        }
    });
}

function activateBtns() {
    $('#institutions').on("click", function () {
        setupDiv()
        checkAccessAndPerformAction("getInstitutions")
        $('#institutionsDiv').show()
    })

    $('#admins').on("click", function () {
        setupDiv()
        checkAccessAndPerformAction("getAdmins")
        $('#adminsDiv').show()
    })

    $('#users').on("click", function () {
        setupDiv()
        checkAccessAndPerformAction("getUsers")
        $('#usersDiv').show()
    })
}

function setupDiv() {
    $('.panels').hide()
    $('#adminHeader').hide()
    // $('#addForm').clear
    $('#addForm').show()
    $('#adminContent').hide()
    $('.newItem').on('click', function () {
        $('#adminContent').show()
    })
}

function prepareRequest(functionName, object) {
    var token = localStorage.getItem('charityToken');
    if (token === null) {
        accessDenied()
    } else {
        var destination = ""
        if (functionName.includes("Institutions")) {
            destination = "Institutions"
        } else if (functionName.includes("Users")) {
            destination = "Users"
        } else if (functionName.includes("Admins")) {
            destination = "Admins"
        }

        var bearerToken = 'Bearer ' + token;

        if (functionName.startsWith("get")) {
            getRequest(destination, bearerToken)
        } else if (functionName.startsWith("post")) {
            postRequest(destination, object, bearerToken)
        } else if (functionName.startsWith("put")) {
            putRequest(destination, object, bearerToken)
        } else if (functionName.startsWith("delete")) {
            deleteRequest(destination, objectId, bearerToken)
        }


    }

}

function getRequest(destination, bearerToken) {
    $.ajax({
        url: 'http://localhost:8080/get' + destination,
        data: {},
        method: 'GET',
        contentType: "application/json",
        headers: {
            'Authorization': bearerToken
        },
        success: function (result) {
            populateAdminData(result, destination, bearerToken)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            accessDenied()
        }
    })
}

function populateAdminData(result, destination, bearerToken) {
    var objectProperties = Object.getOwnPropertyNames(result[0]);
    var objectForm = $('#objectForm');
    $(objectForm).html("")
    for (var i = 0; i < objectProperties.length; i++) {
        if (objectProperties[i] === "id") {
            newP = '<tr style="display: none;"><td>' + objectProperties[i] + ': </td><td><input data-propertynumber="' + i + '" type="text"></tr></td><br>'
            $(objectForm).append(newP)
        } else if (objectProperties[i] !== "roles") {
            newP = '<tr><td>' + objectProperties[i] + ': </td><td><input data-propertynumber="' + i + '" type="text"></tr></td><br>'
            $(objectForm).append(newP)
        }
    }
    if (destination !== "Institutions") {
        var number = objectProperties.length - 1;
        newP = '<tr><td>password: </td><td><input data-propertynumber="' + number + '" type="password"></tr></td><br>'
        $(objectForm).append(newP)
    }

    $(objectForm).append($('<tr id="sendObject"><td></td><td><button id="submit" style="float: right;">Zapisz</button></tr></td>'))

    $('#recordsHead').html("")
    $('#recordsBody').html("")
    for (var i = 0; i < objectProperties.length; i++) {
        $('#recordsHead').append($('<td>' + objectProperties[i] + '</td>'))
    }
    for (var i = 0; i < result.length; i++) {
        var newLine = "<tr>"
        $.each( result[i], function( key, value ) {
            if (!Array.isArray(value)) {
                newLine = newLine + '<td>' + value + '</td>'
            } else {
                newLine += '<td>'
                for (var j = 0; j < value.length; j++) {
                    newLine = newLine + value[j].name + " "
                }
                newLine += '</td>'
            }
        });

        newLine = newLine +
             "<td><button class='edit' data-id='" + result[i].id + "'>Edytuj</button> &nbsp;&nbsp;" +
             "<button class='del' data-id='" + result[i].id + "'>Usuń</button> &nbsp;&nbsp;" + "</td>" +
             "</tr>"
        $('#recordsBody').append(newLine)
    }

    $('#sendObject #submit').on('click',function (event) {
        event.preventDefault()
        var newObj = {}
        if (destination === 'Institutions') {
            newObj = {
                id: $('#objectForm input[data-propertynumber=0]').val(),
                name: $('#objectForm input[data-propertynumber=1]').val(),
                description: $('#objectForm input[data-propertynumber=2]').val()
            }
        } else {
            var roles = [];
            if ((destination === 'Users')) {
                roles = ["ROLE_USER"]
            } else {
                roles = ["ROLE_ADMIN"]
            }
            newObj = {
                id: $('#objectForm input[data-propertynumber=0]').val(),
                firstName: $('#objectForm input[data-propertynumber=1]').val(),
                lastName: $('#objectForm input[data-propertynumber=2]').val(),
                email: $('#objectForm input[data-propertynumber=3]').val(),
                password: $('#objectForm input[data-propertynumber=4]').val(),
                roles: roles
            }
        }
        $('#sendObject #submit').text("Zapisz")
        postRequest(destination, newObj, bearerToken)
    })
    activateEditButtons(destination, bearerToken)
    activateDeleteButtons(destination, bearerToken)
}

function postRequest(destination, object, bearerToken) {

    $.ajax({
        url: 'http://localhost:8080/post' + destination,
        data: JSON.stringify(object),
        method: 'POST',
        contentType: "application/json",
        headers: {
            'Authorization': bearerToken
        },
        success: function (result) {
            checkAccessAndPerformAction("get" + destination)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // accessDenied()
        }
    })
}

function activateEditButtons(destination, bearerToken) {

    var edits = $(".edit");
    for (var i = 0; i < edits.length; i++) {
        edits.eq(i).on("click", function () {
            var itemId = $(this).data("id")

            $.ajax({
                url: "http://localhost:8080/getOneOf" + destination + "/" + itemId,
                data: {},
                type: "GET",
                contentType: "application/json",
                headers: {
                    'Authorization': bearerToken
                },
                success: function (result) {
                    $('#adminContent').show()
                    $('#sendObject #submit').text("Uaktualnij")
                    $('#cancel').remove()
                    $('#sendObject #submit').parent().append($('<button id="cancel">Anuluj</button>'))
                    $('#cancel').on("click", function () {
                        $('#objectForm input').val("")
                        $('#cancel').remove()
                        $('#sendObject #submit').text("Zapisz")
                    })
                    if (destination === 'Institutions') {
                        $('#objectForm input[data-propertynumber=0]').val(result.id)
                        $('#objectForm input[data-propertynumber=1]').val(result.name)
                        $('#objectForm input[data-propertynumber=2]').val(result.description)
                    } else {
                        $('#objectForm input[data-propertynumber=0]').val(result.id)
                        $('#objectForm input[data-propertynumber=1]').val(result.firstName)
                        $('#objectForm input[data-propertynumber=2]').val(result.lastName)
                        $('#objectForm input[data-propertynumber=3]').val(result.email)
                        $('#objectForm input[data-propertynumber=4]').val("")
                    }
                }
            });

        })
    }
}

function activateDeleteButtons(destination, bearerToken) {

    var dels = $(".del");
    for (var i = 0; i < dels.length; i++) {
        dels.eq(i).on("click", function () {
            var itemId = $(this).data("id")

            $.ajax({
                url: "http://localhost:8080/delete" + destination + "/" + itemId,
                data: {},
                type: "GET",
                contentType: "application/json",
                headers: {
                    'Authorization': bearerToken
                },
                success: function (result) {
                    getRequest(destination, bearerToken)
                }
            });

        })
    }
}