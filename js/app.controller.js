import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onMapClicked = onMapClicked;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'))
        .then(() => mapService.getMapEv().addListener(mapService.getMap(), 'click', onMapClicked));
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

function onMapClicked(ev) {
    // console.log('mapClicked', ev);

    const currLoc = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
    locService.getLocs().then(locs => {
        locs.forEach(savedLoc => {
            console.log(savedLoc, currLoc);
            if (savedLoc.lat === currLoc.lat && savedLoc.lng === currLoc.lng) {
                locService.updateLocation(currLoc, Date.now())
            }
        });
    });
    const place = prompt('what is this location name?');
    const weather = 'cool'; // TODO
    const createdAt = Date.now();

}



//  ====================================

