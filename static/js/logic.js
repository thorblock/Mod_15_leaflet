// map object start
var map = L.map("map", {
    center: [40,-95],
    zoom: 4 
});

// base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// function to pick size of marker by magnitude
function markerSize(magnitude) {
    return magnitude * 5;
};
// function to pick color of marker by depth
function markerColor(depth) {
    if (depth <= 10) return "rgb(236, 235, 249)";
    else if (depth <= 30) return "rgb(214, 212, 241)";
    else if (depth <= 50) return "rgb(191, 187, 244)";
    else if (depth <= 70) return "rgb(157, 150, 244)";
    else if (depth <= 90) return "rgb(121, 113, 232)";
    else return "rgb(87, 77, 232)"
};


// hold off on layers for now, let's work geojson
var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// d3 to GET request
d3.json(earthquake_url).then(function(data) {
    // console log data, send data.features to createFeatures
    console.log(data);
    // features groups, 
    var features = data.features;
    // loop through returned data
    for (var i = 0; i <features.length; i++) {
        // coordinates has 3 parts: lng, lat, and depth
        var coordinates = features[i].geometry.coordinates;
        console.log(coordinates);
        // lng
        var longitude =  coordinates[0];
        // lat
        var latitude = coordinates[1];
        // depth
        depth = coordinates[2];
        
        // properties has a number of parts, but we only need 3 specifically: place, mag, and time
        var properties = features[i].properties;
        // place
        var place = properties.place;
        // mag
        var magnitude = properties.mag;
        // time ** having issues with the time setup, not sure how to make it legible
        var time = dayjs(properties.time);

        // actual earthquake markers
        earthquakes = L.circleMarker([latitude,longitude], {
            color: "black",
            weight: 1,
            fillColor: markerColor(depth),
            opacity: 1,
            fillOpacity: 1,
            radius: markerSize(magnitude)
        }).bindPopup(`<h3>${place}</h3><br/>Magnitude: ${magnitude}<br/>Depth: ${depth} km<br>Time: ${time}`).addTo(map)


    };





});