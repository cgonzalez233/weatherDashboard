$(document).ready(function(){
    var cityList = JSON.parse(localStorage.getItem("cityList"));
    if(!cityList){
        cityList = [];
    }
    function printCity(){
        $("#cityList").empty()

        cityList.forEach(function(city){
            var liEl = $('<li class="list-group-item">' + city + '</li>')
            $("#cityList").prepend(liEl)
        });
    }

    printCity();


    const appid = "79dd979f094ce1d9748382241846b3d0";

    function weatherCall(city){
        var forecastCards = $("#forecastRow")
        var mainCard = $("#mainCard")
        const coordinates = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid;
    
        forecastCards.empty()
        mainCard.empty()


        $.ajax({
            url: coordinates,
            method: "GET"
        }).then(function(response){


            
            var lat = response.coord.lat
            var lon = response.coord.lon

            const queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + appid + "&units=imperial";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(res){
                console.log(res)

                var mainBody = $("<div>");
                mainBody.addClass("card-body");

                var cityName = $("<h3>");
                cityName.addClass("card-title");
                cityName.text(city + "  " + new Date(res.daily[0].dt * 1000).toLocaleDateString());

                var mainTemp = $("<p>");
                mainTemp.addClass("card-text");
                mainTemp.text("Temperature: " + res.daily[0].temp.day + " \u00B0F");

                var humidity = $("<p>");
                humidity.addClass("card-text");
                humidity.text("Humidity: " + res.daily[0].humidity + "%");

                var windSpeed = $("<p>");
                windSpeed.addClass("card-text");
                windSpeed.text("Wind Speed: " + res.daily[0].wind_speed + " MPH");

                var uvi = $("<p>");
                uvi.addClass("card-text");
                uvi.text("UV Index: " + res.daily[0].uvi);


                $("#mainCard").append(mainBody)
                mainBody.append(cityName, mainTemp, humidity, windSpeed, uvi);


                for (var i = 1; i < 6; i++){

                    var cardDiv = $("<div>");
                    cardDiv.addClass("card text-white bg-primary col-md cardFormat smallText");

                    var cardBody = $("<div>");
                    cardBody.addClass("card-body");

                    var cardDates = $("<h6>");
                    cardDates.addClass("cardDates");
                    cardDates.attr("id", "dates" + i);
                    cardDates.text(new Date(res.daily[i].dt * 1000).toLocaleDateString());

                    var cardIcons = $("<img>");
                    cardIcons.addClass("iconSizing");
                    cardIcons.attr("id", "icons" + i);
                    cardIcons.attr("src", "http://openweathermap.org/img/wn/" + res.daily[i].weather[0].icon + "@2x.png")

                    var cardTemp = $("<p>");
                    cardTemp.addClass("card-text");
                    cardTemp.attr("id", "temp" + i);
                    cardTemp.text("Temp: " + res.daily[i].temp.day + " \u00B0F")

                    var cardHumid = $("<p>");
                    cardHumid.addClass("card-text");
                    cardHumid.attr("id", "humid" + i);
                    cardHumid.text("Humidity: " + res.daily[i].humidity + "%")


                    cardBody.append(cardDates, cardIcons, cardTemp, cardHumid);
                    cardDiv.append(cardBody);
                    forecastCards.append(cardDiv);
                }
            })
        });
    }


    $(".btn").click(function(){
        var btnText = $(this).siblings("input").val();
        cityList.push(btnText);
        localStorage.setItem("cityList", JSON.stringify(cityList));

        weatherCall(btnText);
        printCity();

        console.log(btnText);

    });
});