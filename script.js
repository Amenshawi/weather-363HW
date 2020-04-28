function clear() {
    $('#city').val("");
    $("#F").prop("checked", false);
    $("#C").prop("checked", false);

    clearForecast();
}
function clearForecast() {
    $('#heading2').html('');
    $('#div1').empty();
    $('.weather-forecast').empty();
    $('#div2').empty();
}
$(function () {
    $('#search').on('click', function () {
        if ($('#city').val() == "") {
            alert('please enter a city!');
        }
        else if ($("input[name='degree']:checked").val() == undefined) {
            alert('please choose a degree!');
        }
        else {
            clearForecast();
            getForecast();
        }
    });
    $('#clear').on('click', function () {
        clear();
    });
});
function getForecast() {
    city = $('#city').val();
    degree = $("input[name='degree']:checked").val();
    $.ajax({
        url: "getForecast.php",
        type: "GET",
        dataType: "json",
        data: { "city": city, "degree": degree },
        success: function (data) {
            $('#heading2').html(city + ' Weather Status');

            $('#div1').append('<div>' + data['time'] + '</div>');
            $('#div1').append('<div>' + data['date'] + '</div>');
            $('#div1').append('<div>' + data['desc'] + '</div>');

            $('.weather-forecast').append('<img src="http://openweathermap.org/img/wn/' + data['icon'] + '.png" class="weather-icon" />');
            $('.weather-forecast').append(data['max-temp'] + $("input[name='degree']:checked").val());
            $('.weather-forecast').append('<span class="min-temperature"> ' + data['min-temp'] + $("input[name='degree']:checked").val() + '</span>');

            $('#div2').append('<div> Humidity: ' + data['humidity'] + '</div>');
            $('#div2').append('<div> Wind:' + data['wind'] + '</div>');
        },
        error: function (error) {
            alert('Error: \nThe city cannot be found !! \nPlease Check the spelling\n\nNote: if you\'re sure about the spelling the issue could be from our side, sorry :)')
        }
    });
}