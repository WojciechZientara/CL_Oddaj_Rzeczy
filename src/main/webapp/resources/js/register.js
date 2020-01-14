$(function () {
    setupRegisterForm()
});

function setupRegisterForm() {
    $('#registerForm .btn[type=submit]').on("click", function (event) {
        event.preventDefault();
        $('#passwordMatchError').hide()
        if ($('#registerForm input[name=password]').val() !== $('#registerForm input[name=password2]').val()) {
            $('#passwordMatchError').show()
        } else {
            var userDto = {
                firstName: $('#registerForm input[name=firstName]').val(),
                lastName: $('#registerForm input[name=lastName]').val(),
                email: $('#registerForm input[name=email]').val(),
                password: $('#registerForm input[name=password]').val()
            }
            registerUser(userDto);
        }

    })

}

function registerUser(dto) {
    $.ajax({
        url: 'http://localhost:8080/register',
        data: JSON.stringify({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: dto.password
        }),
        method: 'POST',
        contentType: "application/json",
        success: function (result) {
            displayRegistrationSuccess(result);
        }
    });
}

function displayRegistrationSuccess(result) {
    if (result !== null)  {
        $('#registerForm').hide();
        $('#registerConfirmation').show();
        $(window).scrollTop(0);
    }
}