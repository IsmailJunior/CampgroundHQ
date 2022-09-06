/** @format */

mapboxgl.accessToken = mapToken;
mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/outdoors-v11", // style URL
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
  projection: "globe", // display the map as a 3D globe
  maxZoom: 17,
  minZoom: 2,
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({ color: "red" })
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${campground.title}</h4> <p>${campground.location}</p>`
    )
  )
  .addTo(map);
