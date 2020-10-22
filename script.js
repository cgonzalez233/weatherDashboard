var forecastCards = $("#forecastRow")


for (var i = 0; i < 5; i++){

    var cardDiv = $("<div>");
    cardDiv.addClass("card text-white bg-primary mb-2 cardFormat");

    var cardBody = $("<div>");
    cardBody.addClass("card-body");

    var cardDates = $("<h6>");
    cardDates.addClass("cardDates");
    cardDates.attr("id", "dates" + i);

    var cardIcons = $("<img>");
    cardIcons.addClass("iconSizing");
    cardIcons.attr("id", "icons" + i);

    var cardTemp = $("<p>");
    cardTemp.addClass("card-text");
    cardTemp.attr("id", "temp" + i);

    var cardHumid = $("<p>");
    cardHumid.addClass("card-text");
    cardHumid.attr("id", "humid" + i);


    cardBody.append(cardDates, cardIcons, cardTemp, cardHumid);
    cardDiv.append(cardBody);
    forecastCards.append(cardDiv);

}