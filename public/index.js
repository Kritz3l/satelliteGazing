getSatelliteData = async () => {
    let data;
    const response = await fetch('/satellite');
    data = await response.json();
    let satData = JSON.parse(data);
    console.log(satData);
}

getAboveData = async () => {
    let data;
    const response = await fetch('/above');
    data = await response.json();
    let abData = JSON.parse(data)
    console.log(abData);

    drawPoint(abData);
}

drawPoint = (data) => {

    const svg = document.getElementsByTagName('svg')[0];
    const satellites = data.above;
    let allSatAlt = [];

    //push all altitudes to allSatAlt array
    for(let i =0; i<satellites.length; i++){
        allSatAlt.push(satellites[i].satalt);
    }

    // draw points for each satellite
    for(let i =0; i<satellites.length; i++){

        let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute("cx", satellites[i].satlat * 7);
        circle.setAttribute("cy", satellites[i].satlng * 7);
        circle.setAttribute("r", getRadius(allSatAlt, satellites[i].satalt));
        circle.style.fill = "#ffffff";
        svg.appendChild(circle);
    }
}

getRadius = (dataArray, currAlt) => {

    const altMax = Math.max(...dataArray);
    const altMin = Math.min(...dataArray);
    const altRange = altMax - altMin;

    let radius = Math.max(altMin, Math.min(altMax, currAlt));
    let targetRadius = (radius - altMin) / altRange;
    return (1 - targetRadius) * 4;
}