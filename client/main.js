/* 
  * Fires an API call to the server and adds the reported city as an alien city
  */
function postAlienEncounter() {
    var city = $("#city-post-input").val();

    // Fires an Ajax call to the URL defined in the index.js function file
    // All URLs to the Advanced I/O function will be of the pattern: /server/{function_name}/{url_path}
    $.ajax({
        url: "/server/bakes_cakes_function/", //If your Advanced I/O function is coded in the Java environment, replace the "alien_city_function" with "AlienCityAIO"
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            "city_name": city
        }),
        success: function (data) {
            alert(data.message);
        },
        error: function (error) {
            alert(error.message);
        }
    });
}

function OrderMethod() {
    var price = 0
    var quantity = 0;

    var flavour = document.getElementById("flav1").value
    var quantity = document.getElementById("quant1").value
    var location = document.getElementById("loc1").value

    // console.log(document.getElementById("flav1").value)
    // console.log(document.getElementById("quant1").value)
    // console.log(document.getElementById("loc1").value)
    // console.log(price);

    if(quantity > price){
        price = quantity * 200;
    }

    // in the url, the function name defined should be used to initialize the api call and objects that are used in the 
    // websites should be given as a string json format.

    $.ajax({
        url: "/server/bakes_cakes_function/alien", //If your Advanced I/O function is coded in the Java environment, replace the "alien_city_function" with "AlienCityAIO"
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            "flavour": flavour,
            "NewValue": "value"

        }),
        success: function (data) {
            alert(data.message);
        },
        error: function (error) {
            alert(error.message);

    }
});

    // return price
}
/**
 * Fires an API call to the server to check whether the given city is alien city or not
 */
function getAlienEncounter() {
    showLoader();
    var positive = "https://media.giphy.com/media/Y1GYiLui9NHcxVKhdo/giphy.gif";
    var negative = "https://media.giphy.com/media/fsPcMdeXPxSP6zKxCA/giphy.gif";
    var city = $("#city-get-input").val();

    // Fires an Ajax call to the URL defined in the index.js function file
    // All URLs to the function will be of the pattern: /server/{function_name}/{url_path}
    $.ajax({
        url: "/server/bakes_cakes_function/alien?city_name=" + city, //If your Advanced I/O function is coded in the Java environment, replace the "alien_city_function" with "AlienCityAIO"
        type: "get",
        success: function (data) {
            console.log(data);
            $("#result-text").text("");
            $("#result-text").text(data.message);
            var imagesrc = negative;
            if (data.signal == 'positive') {
                imagesrc = positive;
            }
            $("#result-image").html("");
            $("#result-image").html("<img src='" + imagesrc + "' />");
            hideLoader();
        },
        errror: function (error) {
            alert(error.message);
        }
    });
}

function showLoader() {
    $("#result-container").hide();
    $("#loader").show();
}

function hideLoader() {
    $("#loader").hide();
    $("#result-container").show();
}