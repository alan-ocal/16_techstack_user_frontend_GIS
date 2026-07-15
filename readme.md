# esirgeyen ve bağışlayan ❤️ Allah'ın (c.c) adıyla - 16e 
## OpenLayers + Animation

### description
- This is  an example for displaying a Stadia Maps(a commercial B2B platform that builds upon OSM's raw data ) on an online web maps(with EPSG:3857) and
- it uses an animated GIF as an icon to display Hervey Bay, Australia longitude and the latitude 

#### Animation 
- Animation is achieved by using the Gifler library.

for instance; in the gifler library the signature might be:
```
// Using Graphics Interchange Format images (.gif)
const gifUrl = 'data/globe.gif';
const gif = gifler(gifUrl);
const gifCanvas = document.createElement('canvas');


gif.frames(
  gifCanvas,
  function (ctx, frame) {
    // ...
    map.render();
  },
  true
);
```
- where the third parameter (true) is a boolean that controls whether the canvas is automatically resized to match the GIF.

### references
- https://openlayers.org/en/latest/examples/accessible.html