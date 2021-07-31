// url for data
var dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab data
d3.json(dataURL).then(function(data) {
    // call createFeatures function
    createFeatures(data.features);

});

function createFeatures(earthquakeData) {

// style for circles
var markerOptions = {
    radius: feature.properties.mag * 5, 
    color: chooseColor(feature.geometry.coordinates[2]), 
    fillColor: chooseColor(feature.geometry.coordinates[2]),
    fillOpacity: 0.6,
    weight: 1
};    

// Give each feature a popup describing the place and time of the earthquake
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3>
                        <hr><p>Date: ${new Date(feature.properties.time)}<br>
                        Depth: ${feature.geometry.coordinates[2]}<br>
                        Size: ${feature.properties.mag}`);
}

// return circle marker
return L.circleMarker(latlng, markerOptions)
};

//set colors for circles based on depth
function chooseColor(depth) {
    switch (depth) {
    case (depth <= 10):
        return "GreenYellow";
        break
    case (depth <= 30):
        return "Yellow";
        break
    case (depth <= 50):
        return "Gold";
        break
    case (depth <= 70):
        return "Orange";
        break
    case (depth <=90):
        return "Coral";
        break
    default:
        return "Red";
    }
};

// map variables
var usCenter = [37.0902, -95.7129];
var zoom = 2;

// create map, center on US
var myMap = L.map("map", {
    center: usCenter,
    zoom: zoom, 
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(myMap);



  