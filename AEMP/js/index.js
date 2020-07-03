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
//   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  
d3.csv('gallery_data.csv', function(error, data) {

    if (error) throw error;

    data.forEach(function(row, i) {
        var marker = L.marker([row.Latitude, row.Longitude], {
            icon: redIcon
            }).addTo(mymap);  
        var image = row['Gallery Image'] ? '<br><img class="img-tooltip" src="./img/media/' + row['Gallery Image'] + '"/>' : ''
        marker.bindPopup(
            "<b>Gallery Name: </b>" + row['Gallery Name'] +
            "<br><b>Address: </b>" + row['Gallery Address'] +
            "<br><b>Gallerist: </b>" + row['Gallerist'] +
            "<br><b>Owner: </b>" + row['Owner Name'] + 
            image 
            ).openPopup();

/*************************  Gentry List  **************************************/

        var ul = document.getElementById('gentry-list');
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(row['Gallery Name']));
        ul.appendChild(li);

/********************  Gentry List Menu On Click Event  ***********************/

        li.addEventListener('mouseover',function(e){
            marker.openPopup();
        });
    }); //end for loop

}); //end d3


