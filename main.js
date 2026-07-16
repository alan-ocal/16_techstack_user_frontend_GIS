import './style.css';
import { Map, View } from 'ol';
import Attribution from 'ol/control/Attribution';
import { defaults as defaultControls } from 'ol/control/defaults';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';

const hervey_bay_coordinate = fromLonLat([152.8535, -25.2865]);

const attribution = new Attribution({
  collapsible: true,
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  controls: defaultControls({ attribution: false }).extend([attribution]),
  target: 'map',
  view: new View({
    center: hervey_bay_coordinate,
    zoom: 10,
  }),
});

function checkSize() {
  const size = map.getSize();
  const small = size ? size[0] < 600 : false;


  // both methods ensures both the capability and the current state match the screen size.
  /*
  Controls whether the attribution control can be collapsed at all. 
  If small is true, the control is collapsible.
  If small is false, the control cannot be collapsed.
  */
  attribution.setCollapsible(small); //(capability)

  /* Controls the current state of the control.
  If small is true, it starts out collapsed.
  If small is false, it is expanded. */
  attribution.setCollapsed(small); //(current state)
}

//When the map's size changes, run checkSize() hence OpenLayers updates the map's internal size
map.on('change:size', checkSize);
//then  the function is invoked directly.*/
checkSize();

//alternative method
// map.on('change:size', function () {
//   checkSize();
// });

//OpenLayers map click handler.
/* Gets the clicked coordinates.
Converts them to longitude and latitude.
Sends those coordinates to the OpenStreetMap Nominatim API.

 */
async function showClickInfo(event) {
  // Pixel coordinates
  const pixel = event.pixel;  
  console.log('Pixel X:', pixel[0]);
  console.log('Pixel Y:', pixel[1]);

  // map coordinates (EPSG:3857) -> geographic coordinates Longitude/Latitude (EPSG:4326)
  const [lon, lat] = toLonLat(event.coordinate);

  //Prints the information to the browser console.
  console.log('Longitude:', lon);
  console.log('Latitude:', lat);

  // Reverse geocoding using OpenStreetMap Nominatim API 
  // Create the reverse geocoding URL
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

  try {
    //Sends an HTTP request whereas await pauses the function until the response arrives.
    const response = await fetch(url);

    //Convert the response to JSON
    const data = await response.json();

    //Get the place name from the response data, or use 'Unknown location' if not available.
    const placeName = data.display_name || 'Unknown location';

    //Print the result to the console.
    console.log('Place Name:', placeName);
    //Print pixel position
    console.log(`Clicked at Pixel (${pixel[0]}, ${pixel[1]})`);
  } catch (err) {
    console.error('Unable to get place name:', err);
  }
}
//When someone single-clicks the map, run showClickInfo().
map.on('singleclick', showClickInfo);