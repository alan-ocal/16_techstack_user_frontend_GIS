/*
importing ES modules from OpenLayers
from  'module specifier'
*/
import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

/*
Map, TileLayer, OSM, and View are invoked using parentheses,
 they are constructor calls
*/
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
