// JavaScript source code
console.log("Now running scripts.");

// Path to GeoJSON resource
var GeoJSONpath = "Points.geojson"; //Path to download GeoJSON from
var GeoJSONData; //Empty, to hold loaded GeoJSON data later...

// Configure map starting position and zoom
var mymap = L.map('map');
mymap.setView([60.170562, 24.941521], 13); //Set viewing position to Kaivokatu

// Add map from HKI Server
var HKI_basemap = L.tileLayer.wms("https://kartta.hel.fi/ws/geoserver/avoindata/wms?", {
    layers: 'avoindata:Opaskartta_PKS_harmaa',
    format: 'image/png',
    transparent: false,
    attribution: "Helsingin opaskartta &#169; Kaupunkimittaus, Helsingin kaupunki"
});
HKI_basemap.addTo(mymap);

// Function to adjust map height to fit MDL menu
function SetHeight() {
	// Adjust map height to fit with MDL menu
	var height = document.getElementById("content_area").offsetHeight;
	document.getElementById('map').style.height = height + "px";
}

// Bind to run after everything loaded
window.addEventListener('load', (event) => {
  SetHeight();
});

// Load GeoJSON
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       console.log("Loaded!");
	   GeoJSONData = xhttp.responseText;
	   GeoJSONData = JSON.parse(GeoJSONData);	
	   
	   var i = 0;
	   while (i < GeoJSONData.features.length) {

			// Add marker
			var Marker = L.marker([GeoJSONData.features[i].geometry.coordinates[1], GeoJSONData.features[i].geometry.coordinates[0]]).addTo(mymap);	   
			
			// Bind pop-up to Marker
			Marker.bindPopup(
			"<b>" + 
			GeoJSONData.features[i].properties.name
			+ "</b></br/>" +
			GeoJSONData.features[i].properties.facility
			+ "<br/><br/>" +
			"<a target='contentRenderer' onclick='document.getElementById(&#34;embedCard&#34;).style.visibility=&#34;visible&#34;;' href='" + GeoJSONData.features[i].properties.matterport  + "'>Avaa panoraamakuva</a><br/>" +
			"<a target='contentRenderer' onclick='document.getElementById(&#34;embedCard&#34;).style.visibility=&#34;visible&#34;;' href='" + GeoJSONData.features[i].properties.varaamo  + "'>Varaa tila</a><br/>" +
			"<a target='contentRenderer' onclick='document.getElementById(&#34;embedCard&#34;).style.visibility=&#34;visible&#34;;' href='" + GeoJSONData.features[i].properties.servicemap  + "'>Reitti & saavutettavuustiedot</a>"
			);
			i++;
	   }

    }
};
xhttp.open("GET", GeoJSONpath, true);
xhttp.send();
