//set up base map
var mymap = L.map('mapid').setView([34.041581, -118.221645], 15);
var bounds = [
    [34.056659, -118.220425], //southwest
    [34.008636, -118.219770]
];
// L.tileLayer('https://api.mapbox.com/styles/v1/madebyc/cjk21tgvq2fmg2sqzywrcnnpl/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFkZWJ5YyIsImEiOiJjampwOWYyNnA3d240M3ZsZnIwODN4ZGl5In0.XFXCZd4wqKFsB7jjH0dUOQ', {
//     style: 'mapbox://styles/mapbox/streets-v9',
L.tileLayer.provider('CartoDB.Voyager', {
  id: 'mapbox.streets',
  minZoom: 13,  
  maxZoom: 18,
  maxBounds: bounds,
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

    data.forEach(function(row) {
        var marker = L.marker([row.Latitude, row.Longitude], {
            icon: redIcon
            }).addTo(mymap);  
        var image = row['Gallery Image'] ? '<br><img class="img-tooltip" src="./img/media/' + row['Gallery Image'] + '"/>' : '';
        var narrative = row['Narrative'] ? "<br><center><b class='read-narrative'>" + "<a href='gallery/" + row['Narrative'] + "'> Beyond The Data </a></b></center>"  : '';
        marker.bindPopup(
            "<b>Gallery Name: </b>" + row['Gallery Name'] +
            "<br><b>Address: </b>" + row['Gallery Address'] +
            "<br><b>Gallerist: </b>" + row['Gallerist'] +
            "<br><b>Owner: </b>" + row['Owner Name'] + 
            narrative +
            image 

            );

/*************************  Gentry List  **************************************/

        var ul = document.getElementById('gentry-list');
        var li = document.createElement('li');
        var span = document.createElement('span');
        var isSpecialCase = row['Narrative'] ? ' *' : '';
        span.className = row['Status'].toLowerCase()+'gallery';
        li.appendChild(document.createTextNode(row['Gallery Name'] + isSpecialCase));
        span.appendChild(document.createTextNode(row['Status']));
        li.appendChild(span);
        ul.appendChild(li);

/********************  Gentry List Menu On Click Event  ***********************/

        li.addEventListener('mouseover',function(e){
            marker.openPopup();
        });
        marker.addEventListener('mouseover',function () {
            marker.openPopup();
            
        });

    }); //end for loop

}); //end d3


