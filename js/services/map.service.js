export const mapService = {
    initMap,
    getMapEv,
    getMap,
    addMarker,
    panTo
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            // startListening();
            console.log('google.maps.event',google.maps.event);
        })

}

function getMapEv() {
    return google.maps.event;
}

function getMap(){
    return gMap;
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBqjYUOEt06B7mMyZeBnF5m_b3oKEZ4hPU'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



function startListening() {
    google.maps.event.addListener(gMap, 'click', function (e) {
        console.log('inside listening');
        //Determine the location where the user has clicked.
        var location = e.latLng;
        console.log('location.lat()', location.lat());
        var place = prompt('what is this location name?');
        // saveLocation(place, location.lat(), location.lng());

        //Create a marker and placed it on the map.
        var marker = new google.maps.Marker({
            position: location,
            map: gMap
        });

        //Attach click event handler to the marker.
        // google.maps.event.addListener(marker, "click", function (e) {
        //     var infoWindow = new google.maps.InfoWindow({
        //         content: 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng()
        //     });
        //     infoWindow.open(map, marker);
        // });
    });
}