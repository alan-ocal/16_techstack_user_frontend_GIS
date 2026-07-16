# esirgeyen ve bağışlayan ❤️ Allah'ın (c.c) adıyla - 16e
## OpenLayers + OpenStreetMap Nominatim API+ Attributions + Reversegeocoding 

### background
- `Geocoding` translates human-readable addresses (e.g., "10 Downing Street, London") into geographic coordinates
 (51.503° N, 0.127° W). Reverse geocoding does the exact opposite, turning a set of geographic coordinates into 
 a human-understandable street address or place name.
- `Reverse geocoding`  turns a set of `geographic coordinates(latitude and longitude)` into 
a human-understandable street address or place name

- `Pixels` represent 2D, flat-screen space (X/Y) relative to the current zoom level and map
- `Lat/long` represents global, 3D geographic locations using degrees.

- `EPSG:3857` is the projected Web Mercator coordinate system used by online maps (e.g., Google Maps, OpenStreetMap), flattening the Earth into a 2D grid measured in `meters`
- `EPSG:4326` is the raw, unprojected geographic coordinate system used by GPS and GeoJSON, defining locations with `latitude and longitude (degrees)` on a 3D Earth. 


### description 
- OpenLayers does not know place names by itself. It only knows the map coordinates and pixel position.
To get the place name, you need to perform `reverse geocoding` using a service `Nominatim (OpenStreetMap's geocoder)`.

- It  gets `pixel` and `lat/long (Geographic) coordinates` on click anywhere in the world;

- As an example; different places in Hervey Bay, Queensland, Australia are picked as examples
`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-25.304218907133887&lon=152.8850284868702`

- `https://nominatim.openstreetmap.org/reverse` — the reverse geocoding endpoint; whereas
- `format=jsonv2` — requests the response in the JSON v2 format.

when clicked at a point on the web via `OpenLayers map click handler`
- logs into the console
- produces the json file via `Nominatim.OpenstreetMap` 

also;
- Attributions visibily change on map resize, to collapse them on small maps
- When the map gets too small because of a resize, the attribution will be collapsed. This is because the collapsible option is set to `true` if the width of the map gets smaller than 600 pixels.

- by using these two lines that register event listeners 
on the map object. They tell the map to call specific functions
when certain events occur.
`map.on('singleclick', showClickInfo);`
   - map.on(...) attaches an event listener.
   - 'singleclick' is the event name.
   - showClickInfo() will be called when the user single-clicks on the map.

`map.on('change:size', checkSize);`
   - map.on(...) attaches an event listener.
   - 'change:size' listens for changes to the map's size property.
   - checkSize() is the function that will be called when the map's size changes.