function globePoint(latitude, longitude, city) {
    var placemarkLayer = new WorldWind.RenderableLayer(city);
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    
    placemarkAttributes.imageOffset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.3,
        WorldWind.OFFSET_FRACTION, 0.0);
    
    placemarkAttributes.labelAttributes.color = WorldWind.Color.WHITE;
    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.5,
    WorldWind.OFFSET_FRACTION, 1.0);

    placemarkAttributes.imageSource = "images/android-logo-file-android-dance-svg-7.png";

    var position = new WorldWind.Position(latitude, longitude, 100.0);
    var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

    placemark.label = city + "\n";
    placemark.alwaysOnTop = true;          

    placemarkLayer.addRenderable(placemark);
    return placemarkLayer;
}

var wwd = new WorldWind.WorldWindow("canvasOne");
wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
var BMNGLayer = new WorldWind.BMNGLayer();
var starFieldLayer = new WorldWind.StarFieldLayer();
var atmosphereLayer = new WorldWind.AtmosphereLayer();
wwd.addLayer(starFieldLayer);
wwd.addLayer(atmosphereLayer); 
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));


wwd.addLayer(globePoint(35.6762, 139.6503, "Tokyo"));
wwd.addLayer(globePoint(42.0669, -81.3399, "Lake Eerie"));
wwd.addLayer(globePoint(24.7143, 58.7374, "Gulf of Oman"));
wwd.addLayer(globePoint(37.6640, 127.9785, "Korean Peninsula"));
wwd.addLayer(globePoint(64.9631, -19.0208, "Iceland"));
wwd.addLayer(globePoint(26.7313, -110.7122, "Gulf of California"));
wwd.addLayer(globePoint(58.4880, 19.8633, "Baltic Sea"));
wwd.addLayer(globePoint(-39.3724, 177.3016, "Hawke Bay, New Zealand"));
wwd.addLayer(globePoint(-35.1945, -56.7412, "Rio de La Plata, Uruguay"));
wwd.addLayer(globePoint(-12, 13, "Benegula Current, South Africa"));