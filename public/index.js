getSatelliteData = () => {
    fetch('/satellite')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

getAboveData = () => {

    fetch('/above')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}