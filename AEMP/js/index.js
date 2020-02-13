//set up base map


var mymap = L.map('mapid').setView([34.041581, -118.221645], 15);
var bounds = [
    [34.056659, -118.220425], //southwest
    [34.008636, -118.219770]
];
L.tileLayer('https://api.mapbox.com/styles/v1/madebyc/cjk21tgvq2fmg2sqzywrcnnpl/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ', {
  style: 'mapbox://styles/mapbox/streets-v9',
  minZoom: 15,
  maxZoom: 18,
  maxBounds: bounds,
  id: 'mapbox.streets',
  trackResize: false,
  accessToken: 'pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ'
  }).addTo(mymap);

var redIcon = L.icon({
  iconUrl: 'marker.svg',
  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  
d3.csv('gallery_ownership_data_narrative.csv', function(error, data) {

    if (error) throw error;

    data.forEach(function(row, i) {
        var marker = L.marker([row.Latitude, row.Longitude], {
            icon: redIcon
            }).addTo(mymap);
                   
        marker.bindPopup(
            "<b>Gallery Name: </b>" + row['Gallery Name'] +
            "<br><b>Address: </b>" + row['Gallery Address'] +
            "<br><b>Gallerist: </b>" + row['Gallerist'] +
            "<br><b>Owner: </b>" + row['Owner Name']
            ).openPopup();

/*************************  Gentry List  **************************************/

        var ul = document.getElementById('gentry-list');
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(row['Gallery Name']));
        ul.appendChild(li);

/********************  Gentry List Menu On Click Event  ***********************/

        li.addEventListener('mouseover',function(e){
            console.log(row['Gallery Name']);
            var popup = L.popup()
                .setLatLng([row.Latitude, row.Longitude])
                .setContent(
                    "<b>Gallery Name: </b>" + row['Gallery Name'] +
                    "<br><b>Address: </b>" + row['Gallery Address'] +
                    "<br><b>Gallerist: </b>" + row['Gallerist'] +
                    "<br><b>Owner: </b>" + row['Owner Name']
                    )
                .openOn(mymap);

            var story = document.getElementById("story");
            story.innerHTML =
            "<b>Gallery Name: </b>" + row['Gallery Name'] +
            "<br><b>Address: </b>" + row['Gallery Address'] +
            "<br><b>Gallerist: </b>" + row['Gallerist'] +
            "<br><b>Owner: </b>" + row['Owner Name'];
            console.log(row.Narrative);

            if (row.Narrative != null) {
                story.appendChild(document.createElement("br"));
                story.appendChild(document.createTextNode(row.Narrative));
                }
            if (row.Narrative02 != null) {
                story.appendChild(document.createElement("br"));
                story.appendChild(document.createTextNode(row.Narrative02));
                }
            if (row.Narrative03 != null) {
                story.appendChild(document.createElement("br"));
                story.appendChild(document.createTextNode(row.Narrative03));
                }
            if (row.Narrative04 != null) {
                story.appendChild(document.createElement("br"));
                story.appendChild(document.createTextNode(row.Narrative04));
                }
                var lat = parseFloat(row.Latitude);
                var lon = parseFloat(row.Longitude);
                initialize(lat, lon);
        });
/********************  Marker On Click Event  *********************************/

        marker.on('click', function(e) {
            console.log(e);
            var story = document.getElementById("story");
            story.innerHTML =
            "<b>Gallery Name: </b>" + row['Gallery Name'] +
            "<br><b>Address: </b>" + row['Gallery Address'] +
            "<br><b>Gallerist: </b>" + row['Gallerist'] +
            "<br><b>Owner: </b>" + row['Owner Name'];
            console.log(row.Narrative);

            if (row.Narrative != null) {
                story.appendChild(document.createElement("br"));
                story.appendChild(document.createTextNode(row.Narrative));
                }
            if (row.Narrative02 != null) {
                story.appendChild(document.createElement("br"));
                story.appendChild(document.createTextNode(row.Narrative02));
                }
            if (row.Narrative03 != null) {
                story.appendChild(document.createElement("br"));
                story.appendChild(document.createTextNode(row.Narrative03));
                }
            if (row.Narrative04 != null) {
                story.appendChild(document.createElement("br"));
                story.appendChild(document.createTextNode(row.Narrative04));
                }
        }); 
        //event listener onclick marker
        // var lat = row.Latitude.toString();
        // var lon = row.Longitude.toString();
        // initialize(row.Latitude, row.Longitude);

    }); //end for loop

}); //end d3

