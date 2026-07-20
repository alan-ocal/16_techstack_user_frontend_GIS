import Feature from 'ol/Feature';

import Map from 'ol/Map';
import View from 'ol/View';

import Polyline from 'ol/format/Polyline';
import GeoJSON from 'ol/format/GeoJSON';

import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';

import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';

import { getVectorContext } from 'ol/render';

import ImageTile from 'ol/source/ImageTile';
import VectorSource from 'ol/source/Vector';

import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

const maptilerKey = 'yzLFEhMtyEqLM8o8p9ul';
const attributions = '© <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> ' +
  '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';


const center = [-172.34945, 7089440.14];
const map = new Map({
  target: document.getElementById('map'),
  view: new View({
    center,
    zoom: 10,
    minZoom: 2,
    maxZoom: 19,
  }),
  layers: [
    new TileLayer({
      source: new ImageTile({
        attributions,
        url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.jpg?key=' + maptilerKey,
        tileSize: 512,
      }),
    }),
  ],
});
/*
fetch() is asynchronous.
1- fetch() starts an HTTP request and immediately returns a Promise.
2- JavaScript continues executing the rest of your code without waiting for the request to finish.
3- When the response arrives, the first .then() callback is executed.
4- response.json() is also asynchronous—it returns another Promise because parsing may take time.
5- When the JSON has been parsed, the second .then() callback runs with the parsed object.
*/
fetch('data/polyline/route.json')
  .then((response) => response.json())
  .then((data) => {
    const startCoordinate = [-172445.02, 7132312.77];
    const endCoordinate = [-179290.06, 7129372.05];

    const routeGeometry = new LineString([
      startCoordinate,
      [startCoordinate[0] + (endCoordinate[0] - startCoordinate[0]) * 0.5, startCoordinate[1] + (endCoordinate[1] - startCoordinate[1]) * 0.2],
      endCoordinate,
    ]);

    console.log('Decoded route geometry:', routeGeometry.getCoordinates());

    const routeFeature = new Feature({
      type: 'route',
      geometry: routeGeometry,
    });
    const startMarker = new Feature({
      type: 'icon',
      geometry: new Point(startCoordinate),
    });
    const endMarker = new Feature({
      type: 'icon',
      geometry: new Point(endCoordinate),
    });
    const position = startMarker.getGeometry().clone();
    const geoMarker = new Feature({
      type: 'geoMarker',
      geometry: position,
    });

    const styles = {
      route: new Style({
        stroke: new Stroke({
          width: 6,
          color: [0, 128, 0, 0.8],
        }),
      }),
      icon: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'data/icon/icon_bus_stop.png',
        }),
      }),
      geoMarker: new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({
            color: 'white',
            width: 2,
          }),
        }),
      }),
    };

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature, startMarker, endMarker, geoMarker],
      }),
      style: (feature) => styles[feature.get('type')],
    });

    map.addLayer(vectorLayer);
    map.getView().fit(routeGeometry, {
      padding: [20, 20, 20, 20],
      maxZoom: 15,
    });

    const speedInput = document.getElementById('speed');
    const startButton = document.getElementById('start-animation');

    if (!speedInput || !startButton) {
      console.error('Animation controls not found');
      return;
    }

    let animating = false;
    let distance = 0;
    let lastTime;
    const route = routeFeature.getGeometry();

    function moveFeature(event) {
      const speed = Number(speedInput.value);
      const time = event.frameState.time;
      const elapsedTime = time - lastTime;
      distance = (distance + (speed * elapsedTime) / 1e6) % 2;
      lastTime = time;

      const currentCoordinate = route.getCoordinateAt(
        distance > 1 ? 2 - distance : distance,
      );
      position.setCoordinates(currentCoordinate);
      const vectorContext = getVectorContext(event);
      vectorContext.setStyle(styles.geoMarker);
      vectorContext.drawGeometry(position);
      map.render();
    }

    function startAnimation() {
      animating = true;
      lastTime = Date.now();
      startButton.textContent = 'Stop for a break';
      vectorLayer.on('postrender', moveFeature);
      geoMarker.setGeometry(null);
    }

    function stopAnimation() {
      animating = false;
      startButton.textContent = 'Continue to the route';
      geoMarker.setGeometry(position);
      vectorLayer.un('postrender', moveFeature);
    }

    startButton.addEventListener('click', () => {
      if (animating) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });
  })
  .catch((error) => {
    console.error('Error fetching or decoding route data:', error);
  });

