// map object start
var map = L.map("map", {
    center: [40,-95],
    zoom: 4 
});

// base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// chi said to use mapbox, but i don't think there has ever been a mapbox example in class

// hold off on layers for now, let's work geojson
var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// d3 to GET request
d3.json(earthquake_url).then(function(data) {
    // console log data, send data.features to createFeatures
    console.log(data);
    // features groups, 
    var features = data.features;
    var depth_array = [];
    // loop through returned data
    for (var i = 0; i <features.length; i++) {
        var coordinates = features[i].geometry.coordinates;
        var longitude =  coordinates[0];
        var latitude = coordinates[1];
        
        // id depth and push to premade depth_array
        var depth = coordinates[2];
        depth_array.push(depth);

        var properties = features[i].properties;

        // id place & magnitude
        var place = properties.place;
        var magnitude = properties.mag;


    }
});