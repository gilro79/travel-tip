import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/storage.service.js'


window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onMapClicked = onMapClicked;
window.onMarkerClicked = onMarkerClicked;


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'))
        .then(() => mapService.getMapEv().addListener(mapService.getMap(), 'click', onMapClicked))
        .then(() => mapService.getMapEv().addListener(mapService.getMarker(), 'click', onMarkerClicked))
        .then(renderLocs);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(loc) {
    mapService.addMarker( loc );
    // mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
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
    const currLoc = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
    const place = prompt('what is this location name?');
    locService.addLoc(place, currLoc.lat, currLoc.lng);
    onAddMarker(currLoc);
    renderLocs();
}

function renderLocs() {
    locService.getLocs().then(locs => {
        const strHtmls = locs.map(loc => {
            const lat = loc.lat
            const lng = loc.lng
            onAddMarker({lat,lng})
            return `
            <tr>
            <td>${loc.id}</td>
            <td>${loc.name}</td>
            <td>${loc.lat}</td>
            <td>${loc.lng}</td>
            <td>${loc.weather}</td>
            </tr>
            `
        })
        document.querySelector('.locs').innerHTML = strHtmls.join('');
    })
}

function isLocSaved(currLoc, locs) {
    // move this function to loc.service
    return savedLoc.lat === currLoc.lat && savedLoc.lng === currLoc.lng;
}

function onMarkerClicked(ev) {
    console.log('ev',ev);
}


//  ====================================

