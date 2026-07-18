# esirgeyen ve bağışlayan ❤️ Allah'ın (c.c) adıyla - 16e
## OpenLayers + Fetch API + Map Tiler + Marker Animation + Polyline + Slider control

### background
- `Tiled Layers`: Openlayers pull tiles from  platforms like Google Maps, Mapbox OSM, Bing, MapBox, Stadia Maps, and any other XYZ source you can find

 ```
layers: [
    new TileLayer({
      source: new ImageTile()
-------------
    new TileLayer({
      source: new OSM()
    })
```
- Web Mercator (EPSG:3857) x = -5639523.95 & y = -3501274.52
southern Brazil, in the state of Rio Grande do Sul, near the city of Porto Alegre. 
Converted to WGS84 (EPSG:4326) (longitude, latitude) Latitude: -29.97° & Longitude: -50.66°*
`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-29.97&lon=-50.66`

In this example it pull tiles from `MapTiler`API with an `API Base URL` 
- MapTiler API: `https://api.maptiler.com/`
    - It allows you to access all the `data, maps, services, and resources available in your MapTiler account.`
    - The universal public API request format is:
    `https://api.maptiler.com/{METHOD}/{QUERY}.json?{PARAMS}&key=YOUR_MAPTILER_API_KEY_HERE`

### description
- This example demonstrates how to move a feature along line.
- It adds a tiled `MapTiler raster layer` to an OpenLayers map
- It shows how to use `postrender events and a vector context` to animate a `marker feature` along a line. In this example an encoded `polyline` is being used.
- There is a`button` which starts the animation and
a `slider control` that lets the user choose a number by dragging a handle.

### references
- https://openlayers.org/en/latest/examples/feature-move-animation.html