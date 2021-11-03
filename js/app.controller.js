import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then((res) => {
            console.log('Map is ready',res);
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

//  ====================================

google.maps.event.addListener(map, 'click', function (e) {

    //Determine the location where the user has clicked.
    var location = e.latLng;
    console.log('location.lat()', location.lat());
    var place = prompt('what is this location?');
    // saveLocation(place, location.lat(), location.lng());

    //Create a marker and placed it on the map.
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });

    //Attach click event handler to the marker.
    // google.maps.event.addListener(marker, "click", function (e) {
    //     var infoWindow = new google.maps.InfoWindow({
    //         content: 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng()
    //     });
    //     infoWindow.open(map, marker);
    // });
});