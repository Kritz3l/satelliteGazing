const svgNS = 'http://www.w3.org/2000/svg';


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

showInformation = (data) => {
    console.log('data', data)
    let string = `This is ${data.satname}, it was launched at ${data.launchDate} and is ${Math.floor(data.satalt)}km away.`;
    let textData = document.createElementNS(svgNS, 'text');
    let svg = document.getElementsByTagName('svg')[0];

    textData.setAttributeNS(null,'x', (data.satlat * 7) + 260);
    textData.setAttributeNS(null,'y', (data.satlng * 7) + 260);
    textData.setAttributeNS(null, 'fill', '#fff');
    textData.setAttributeNS(null,'font-size','15');
    textData.setAttributeNS(null, 'id', 'textNode'); //important so we can remove the node on mouseleave

    let textNode = document.createTextNode(string);
    textData.appendChild(textNode);
    svg.appendChild(textData);
}

goodBoy = () => {
    let goodBoy = document.createElementNS(svgNS, 'text');
    let svg = document.getElementsByTagName('svg')[0];

    goodBoy.setAttributeNS(null,'x', 600);
    goodBoy.setAttributeNS(null,'y', 670);
    goodBoy.setAttributeNS(null, 'fill', '#fff');
    goodBoy.setAttributeNS(null,'font-size','15');

    let textNode = document.createTextNode('This is Greg, he is a very good Boy');
    goodBoy.appendChild(textNode);
    svg.appendChild(goodBoy);

    removeGoodBoy = () => {
        svg.removeChild(goodBoy)
    }

    setTimeout(removeGoodBoy, 3000);
}

hideInformation = () =>{
    let svg = document.getElementsByTagName('svg')[0];
    let textNode = document.getElementById('textNode');
    svg.removeChild(textNode);
}

drawPoint = async (data) => {
    const svg = document.getElementsByTagName('svg')[0];
    const satellites = data.above;
    let allSatAlt = [];

    //push all altitudes to allSatAlt array
    for(let i =0; i<satellites.length; i++){
        allSatAlt.push(satellites[i].satalt);
    }

    // draw points for each satellite
    for(let i =0; i<satellites.length; i++){
        let satellite = satellites[i];

        let circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', (satellite.satlat * 7) + 250);
        circle.setAttribute('cy', (satellite.satlng * 7) + 250);
        circle.setAttribute('r', getRadius(allSatAlt, satellite.satalt));
        circle.style.fill = '#ffffff';
        // sleep to make them appear after one another and not at the same time
        await new Promise(r => setTimeout(r, 100));
        svg.appendChild(circle);
        circle.addEventListener('mouseover', showInformation.bind(circle, satellite)); //bind satellite info to circle
        circle.addEventListener('mouseleave', hideInformation.bind(circle)); //remove textNode from dom
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