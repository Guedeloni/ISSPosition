let latitude, longitude, map, circle;

jQuery(document).ready(
    function ($) {
        $.ajax({
            url: 'http://api.open-notify.org/iss-now.json',
            method: 'GET'
        })
        .done(
            (data) => {
                displayInfos(data);
                
                map = L.map('map').setView([latitude, longitude], 8);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: '© OpenStreetMap'
                }).addTo(map);

                displayMarker();
            }
        );

        $.ajax({
            url: 'http://api.open-notify.org/astros.json',
            method: 'GET'
        })
        .done(
            (data) => {
                displayPeople(data);
            }
        );
    }
)
setInterval(call, 3000);

function displayInfos(data) {
    $("#date").text(new Date(data.timestamp*1000).toLocaleString("fr-FR"));
    latitude = data.iss_position.latitude;
    longitude = data.iss_position.longitude;
    $("#position").text(`Position actuelle - Lat. : ${latitude} - Long. : ${longitude}`);
}

function displayMarker() {
    circle = L.circle([latitude, longitude], {
        stroke: true,
        color: 'red',
        weight: 1,
        fillColor: '#4e75a9',
        fillOpacity: 0.5,
        radius: 10000
    }).addTo(map);
}

function displayPeople(data) {
    $("#people>h3").text(`${data.number} membres d'équipage`);
    data.people.forEach(element => {
        $("#people>ul").append('<li>' + element.name + '</li>')
    });
}

function call() {
    $.ajax({
        url: 'http://api.open-notify.org/iss-now.json',
        method: 'GET'
    })
    .done(
        (data) => {
            displayInfos(data);
            map.flyTo([latitude, longitude]);
            displayMarker();
        }
    );
}

// window.setTimeout(function() { location.reload(); }, 10000);

