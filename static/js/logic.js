// function to pick size of marker by magnitude
function markerSize(magnitude) {
    return magnitude * 5;
};
// function to pick color of marker by depth
function markerColor(depth) {
    if (depth <= 10) return "#ccccff";
    else if (depth <= 30) return "#cc99ff";
    else if (depth <= 50) return "#cc66ff";
    else if (depth <= 70) return "#884dff";
    else if (depth <= 90) return "#6600cc";
    else return "#400080"
};

// hold off on layers for now, let's work geojson
var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// d3 to GET, earthquakes
d3.json(earthquake_url).then(function(data) {
    // console log data
    console.log("Earthquake Data",data);
    // var for "Earthquake Data" features
    var features = data.features;
    var earthquakeMarkerArray = [];
    // loop through data
    for (var i = 0; i <features.length; i++) {
        // coordinates has 3 parts: lng, lat, and depth
        var coordinates = features[i].geometry.coordinates;
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
        // time; dayjs, tz stuff is trouble
        var time = dayjs(properties.time, "America/Toronto");
        // actual earthquake markers
        var earthquakeMarkers = L.circleMarker([latitude,longitude], {
            color: "black",
            weight: 0.5,
            fillColor: markerColor(depth),
            opacity: 1,
            fillOpacity: 1,
            radius: markerSize(magnitude)
        }).bindPopup(`<h4>${place}</h4>Magnitude: ${magnitude}<br>Depth: ${depth} km<br>Time: ${time}`).addTo(map)
        // bind each marker and push to premade array
        earthquakeMarkerArray.push(earthquakeMarkers);
    };
});

// d3 to GET, tectonic
d3.json("./static/data/PB2002_plates.json").then(function(plate_data) {
    console.log("Tectonic Plate Data", plate_data);
    // from each feature in "Tectonic Plate Data" 
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3> ${feature.properties.PlateName} Plate</h3>`);
    };

    // defining map style for tectonic boundaries
    var mapStyle = {
        color: "#FF934F",
        fillColor: "white",
        fillOpacity: 0.1,
        weight: 2.5
    };

    var plates = L.geoJson(plate_data, {
        style: mapStyle,
        onEachFeature: onEachFeature
    });
    //
    var plates = L.layerGroup(plates);
    console.log(plates);
});

// tile layers
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// one base layer at a time
var baseMaps = {
    "Street Map": street,
    "Topography Map": topo
};

var earf = L.layerGroup(earthquakeMarkerArray);
var plates = L.layerGroup(plates);


// map object start
var map = L.map("map", {
    center: [51,0],
    zoom: 4 
});

// base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);