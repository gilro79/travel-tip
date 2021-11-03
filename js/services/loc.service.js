export const locService = {
    getLocs,
    updateLocation,
    addLoc
}

var gNextId = 101;

const locs = [
    { id: gNextId++, name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: 'cool', createdAt: 'timestamp', updatedAt: 'timestamp' },
    { id: gNextId++, name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: 'cool', createdAt: 'timestamp', updatedAt: 'timestamp' }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function updateLocation(location, updateTime) {
    console.log('updating here');
}

function addLoc(name, lat, lng, weather = 'cool',
    createdAt = Date.now(), updatedAt = Date.now()) {
    locs.push({ id: gNextId++, name, lat, lng, weather, createdAt, updatedAt });
    console.log(locs);
}


