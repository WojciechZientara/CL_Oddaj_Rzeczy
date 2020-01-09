$(function () {
    getData()
});

function getData() {
    $.ajax({
        url: "http://localhost:8080/getLandingPageDto",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function(result) {
        displayNumbers(result);
        displayInstitutions(result);
    });
}

function displayNumbers(dto) {
    var bags = $('#numberOfDonatedBags')
    $(bags).text(dto.collectedBags);
    var orgs = $('#numberOfSupportedOrganisations')
    $(orgs).text(dto.supportedOrganisations);
}

function displayInstitutions(dto) {
    var institutionsUl = $('ul.help--slides-items')
    for (var i = 0; i < dto.institutions.length; i++) {
        if (i % 2 === 0) {
            institutionsUl.append($("<li>"));
        }
        var lastLi = $(institutionsUl).children().last();
        var newDiv = $(
            '<div class = "col">' +
                '<div class = "title">' +
                    dto.institutions[i].name +
                '</div>' +
                '<div class = "subtitle">' +
                    dto.institutions[i].description +
                '</div>' +
            '</div>'
        )
        $(lastLi).append(newDiv);
    }
    if (dto.institutions.length % 2 === 1) {
        $(institutionsUl).children().last().append($('<div class = "col" style="visibility: hidden;">'));
    }
}