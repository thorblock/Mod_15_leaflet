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

// d3 earthquake data, mimicing L4 borough
d3.json(earthquake_url).then(function(data) {
    console.log(data);
    // geojson retrieved
    L.geoJson(data, {
        // adding a style: feature
        style: function(feature) {
            return{
                color: "red",// needs scaling component, i think it needs to be predefine though
                fillColor: earthquake_color,
                fillOpacity: 0.5,
                weight: 1,
                radius: markerSize(locations[i].)
            };
        },
        onEachFeature: function
    });
});