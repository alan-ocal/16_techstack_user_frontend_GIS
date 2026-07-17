import './style.css';
import { Map, View } from 'ol';
import Attribution from 'ol/control/Attribution';
import { defaults as defaultControls } from 'ol/control/defaults';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';



const attribution = new Attribution({
  collapsible: true,
  attributions: `<a href="https://www.biblegateway.com/">Gods words are static attributions. They never disappear</a>`,
});
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  controls: defaultControls().extend([attribution]),
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

/* 
attaching a click event handler to the button with the id toggleLayerButton.
find the HTML element with the id toggleLayerButton
when that element is clicked, run the the empty function inside */
document.getElementById('toggleLayerButton').addEventListener('click', () => {
  map.getLayers().forEach((layer) => {
    layer.setVisible(layer.getVisible() ? false : true);
  });

});