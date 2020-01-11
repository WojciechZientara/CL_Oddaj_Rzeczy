$(function () {
    getData()
    activateFormDataCollection()
});

function getData() {
    $.ajax({
        url: "http://localhost:8080/getDonationCategories",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function(result) {
        displayDonationCategories(result);
        displayInstitutions(result);
    });
}

function displayDonationCategories(dto) {
    var categoriesSpan = $('#donationCategories')
    for (var i = 0; i < dto.categories.length; i++) {
        var newDiv = $(
            '<div class="form-group form-group--checkbox">' +
                '<label>' +
                    '<input type="checkbox" name="categories" value="' + dto.categories[i].id + '"/>' +
                    '<span class="checkbox"></span>' +
                    '<span class="description">' + dto.categories[i].name + '</span>' +
                '</label>' +
            '</div>'
        )
        $(categoriesSpan).append(newDiv);
    }
}

function displayInstitutions(dto) {
    var institutionsSpan = $('#organisationsToHelp')
    for (var i = 0; i < dto.institutions.length; i++) {
        var newDiv = $(
            '<div class="form-group form-group--checkbox">' +
                '<label>' +
                    '<input type="radio" name="institution" value="' + dto.institutions[i].id + '"/>' +
                    '<span class="checkbox radio"></span>' +
                    '<span class="description">' +
                        '<div class="title">' + dto.institutions[i].name + '</div>' +
                        '<div class="subtitle">' + dto.institutions[i].description + '</div>' +
                    '</span>' +
                '</label>' +
            '</div>'
        )
        $(institutionsSpan).append(newDiv);
    }
}

function activateFormDataCollection() {
    var lastNext = $('#lastNext')
    $(lastNext).click(function () {
        var categoriesCheckboxes = $('input[name="categories"]:checked');

        var categories = [];
        for (var i = 0; i < categoriesCheckboxes.length; i++) {
            categories.push(categoriesCheckboxes[i].value)
        }
        var quantity = $('input[name="quantity"]').first().val();
        var institution = $('input[name="institution"]:checked').first().val();
        var street = $('input[name="street"]').first().val();
        var city = $('input[name="city"]').first().val();
        var zipCode = $('input[name="zipCode"]').first().val();
        var phone = $('input[name="phone"]').first().val();
        var pickUpDate = $('input[name="pickUpDate"]').first().val();
        var pickUpTime = $('input[name="pickUpTime"]').first().val();
        var pickUpComment = $('textarea[name="pickUpComment"]').first().val();

        var donation = {
            categories : categories,
            quantity : quantity,
            institution : institution,
            street : street,
            city : city,
            zipCode : zipCode,
            phone : phone,
            pickUpDate : pickUpDate,
            pickUpTime : pickUpTime,
            pickUpComment : pickUpComment
        };

        sendDataToServer(donation);
    })
}

function sendDataToServer(donation) {
    $.ajax({
        url: "http://localhost:8080/verifyFormData",
        data: JSON.stringify({
            categories : donation.categories,
            quantity : donation.quantity,
            institution : donation.institution,
            street : donation.street,
            city : donation.city,
            zipCode : donation.zipCode,
            phone : donation.phone,
            pickUpDate : donation.pickUpDate,
            pickUpTime : donation.pickUpTime,
            pickUpComment : donation.pickUpComment
        }),
        method: "POST",
        contentType: "application/json"
    }).done(function(result) {
        checkErrors(result)
    });
}

function checkErrors(dto) {

    //SUMMARY

    //quantity
    var isError = false;
    for (var i = 0; i < dto.errors.length; i++) {
        if (dto.errors[i] === "quantity") {
            isError = true;
        }
    }
    var errorSpan = $('#quantitySummary');
    $(errorSpan).removeClass("summaryError");
    if (isError === true) {
        $(errorSpan).addClass("summaryError").text("[Nieprawidłowa ilość]")
    } else {
        $(errorSpan).text(dto.donation.quantity);
    }

    //categories
    var isError = false;
    for (var i = 0; i < dto.errors.length; i++) {
        if (dto.errors[i] === "categories") {
            isError = true;
        }
    }
    var errorSpan = $('#categoriesSummary');
    $(errorSpan).removeClass("summaryError");
    $(errorSpan).text("");
    if (isError === true) {
        $(errorSpan).addClass("summaryError").text("[Nie wybrano kategorii]")
    } else {
        for (var i = 0; i < dto.donation.categories.length; i++) {
            if (i < dto.donation.categories.length - 1) {
                $(errorSpan).append($('<span>' + dto.donation.categories[i].name + ', ' + '</span>'))
            } else {
                $(errorSpan).append($('<span>' + dto.donation.categories[i].name + '</span>'))
            }
        }
    }

    //institution
    var isError = false;
    for (var i = 0; i < dto.errors.length; i++) {
        if (dto.errors[i] === "institution") {
            isError = true;
        }
    }
    var errorSpan = $('#institutionSummary');
    $(errorSpan).removeClass("summaryError");
    if (isError === true) {
        $(errorSpan).addClass("summaryError").text("[Nie wybrano organizacji]")
    } else {
        $(errorSpan).text(dto.donation.institution.name);
    }

    //street
    var isError = false;
    for (var i = 0; i < dto.errors.length; i++) {
        if (dto.errors[i] === "street") {
            isError = true;
        }
    }
    var errorSpan = $('#streetSummary');
    $(errorSpan).removeClass("summaryError");
    if (isError === true) {
        $(errorSpan).addClass("summaryError").text("[Nie podano ulicy]")
    } else {
        $(errorSpan).text(dto.donation.street);
    }

    //city
    var isError = false;
    for (var i = 0; i < dto.errors.length; i++) {
        if (dto.errors[i] === "city") {
            isError = true;
        }
    }
    var errorSpan = $('#citySummary');
    $(errorSpan).removeClass("summaryError");
    if (isError === true) {
        $(errorSpan).addClass("summaryError").text("[Nie podano miasta]")
    } else {
        $(errorSpan).text(dto.donation.city);
    }

    //zipCode
    var isError = false;
    for (var i = 0; i < dto.errors.length; i++) {
        if (dto.errors[i] === "zipCode") {
            isError = true;
        }
    }
    var errorSpan = $('#zipCodeSummary');
    $(errorSpan).removeClass("summaryError");
    if (isError === true) {
        $(errorSpan).addClass("summaryError").text("[Nieprawidłowy kod pocztowy]")
    } else {
        $(errorSpan).text(dto.donation.zipCode);
    }

    //phone
    var isError = false;
    for (var i = 0; i < dto.errors.length; i++) {
        if (dto.errors[i] === "phone") {
            isError = true;
        }
    }
    var errorSpan = $('#phoneSummary');
    $(errorSpan).removeClass("summaryError");
    if (isError === true) {
        $(errorSpan).addClass("summaryError").text("[Nieprawidłowy telefon]")
    } else {
        $(errorSpan).text(dto.donation.phone);
    }

    //pickUpDate
    var isError = false;
    for (var i = 0; i < dto.errors.length; i++) {
        if (dto.errors[i] === "pickUpDate") {
            isError = true;
        }
    }
    var errorSpan = $('#pickUpDateSummary');
    $(errorSpan).removeClass("summaryError");
    if (isError === true) {
        $(errorSpan).addClass("summaryError").text("[Nieprawidłowa data]")
    } else {
        $(errorSpan).text(dto.donation.pickUpDate);
    }

    //pickUpTime
    var isError = false;
    for (var i = 0; i < dto.errors.length; i++) {
        if (dto.errors[i] === "pickUpTime") {
            isError = true;
        }
    }
    var errorSpan = $('#pickUpTimeSummary');
    $(errorSpan).removeClass("summaryError");
    if (isError === true) {
        $(errorSpan).addClass("summaryError").text("[Nieprawidłowy czas]")
    } else {
        $(errorSpan).text(dto.donation.pickUpTime);
    }

    //pickUpComment
    var errorSpan = $('#pickUpCommentSummary');
    if (dto.donation.pickUpComment === "" || dto.donation.pickUpComment === null) {
        $(errorSpan).text("Uwagi: Brak");
    } else {
        $(errorSpan).text("Uwagi: " + dto.donation.pickUpComment);
    }

    // FINALIZE BUTTON & FORM PAGES

    var errorFields = $('.formError')
    $(errorFields).hide();
    var submitBtn = $('#submitDonation');
    $(submitBtn).show();

    if (dto.errors.length > 0) {
        for (var i = 0; i < dto.errors.length; i++) {
            var errorName = dto.errors[i] + "Error";
            $('#' + errorName).show();
        }

        $(submitBtn).hide();
        alert("Formularz zawiera błędy! Proszę poprawić dane w miejscach oznaczonych komentarzem.")
    } else {
        var submitButton = $('#submitDonation')
        $(submitBtn).off()
        $(submitBtn).on("click", function (event) {
            console.log(dto)
            event.preventDefault();
            var donation = dto.donation;
            var categories = [];
            for (var i = 0; i < dto.donation.categories.length; i++) {
                categories.push(dto.donation.categories[i].id)
            }
            $.ajax({
                url: "http://localhost:8080/saveDonation",
                data: JSON.stringify({
                    categories : categories,
                    quantity : donation.quantity,
                    institution : donation.institution.id,
                    street : donation.street,
                    city : donation.city,
                    zipCode : donation.zipCode,
                    phone : donation.phone,
                    pickUpDate : donation.pickUpDate,
                    pickUpTime : donation.pickUpTime,
                    pickUpComment : donation.pickUpComment
                }),
                method: "POST",
                contentType: "application/json"
            }).done(function(result) {
                displayConfirmation(result)
            });
        })
    }
}

function displayConfirmation(result) {
    if (result === "success") {
        var toHide = $('.formProcess')
        console.log(toHide)
        $(toHide).hide();
        var toShow = $('#formSubmitConfirmation')
        $(toShow).show();
        $(window).scrollTop(0);
    }
}