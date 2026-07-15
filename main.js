import './style.css';

import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import StadiaMaps from 'ol/source/StadiaMaps';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { fromLonLat } from 'ol/proj';



/*creates a map object (point icon) that OpenLayers can render
 for Hervey Bay, Australia longitude and the latitude respectively */
const hervey_bay = fromLonLat([152.8535, -25.2865]);

const iconFeature = new Feature({
  geometry: new Point(hervey_bay),
  name: 'Hervey Bay',
  population: 1816000,
  rainfall: 1250
});

const vectorSource = new VectorSource({
  features: [iconFeature]
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
  zIndex: 1000
});

/*EPSG:3857 (WGS 84 / Pseudo-Mercator)
Using StadiaMaps to create a raster layer with the Stamen Terrain tiles*/
const rasterLayer = new TileLayer({
  source: new StadiaMaps({
    layer: 'stamen_terrain',
    projection: 'EPSG:3857'
  })
});

const map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new View({
    center: hervey_bay,
    zoom: 10
  })
});

// Using Graphics Interchange Format images (.gif)
const gifUrl = 'data/globe.gif';
const gif = gifler(gifUrl);
const gifCanvas = document.createElement('canvas');

gif.frames(
  gifCanvas,
  function (ctx, frame) {
    ctx.clearRect(0, 0, gifCanvas.width, gifCanvas.height);
    ctx.drawImage(frame.buffer, frame.x, frame.y);

    iconFeature.setStyle(
      new Style({
        image: new Icon({
          img: gifCanvas,
          imgSize: [gifCanvas.width, gifCanvas.height],
          scale: 0.4,
          opacity: 1,
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction'
        })
      })
    );

    map.render();
  },
  true
);

// Change mouse cursor to pointer when hovering over the icon.
map.on('pointermove', function (evt) {
  const hit = map.hasFeatureAtPixel(evt.pixel);
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
