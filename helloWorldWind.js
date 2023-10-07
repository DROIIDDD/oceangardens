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
    
                placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";
    
                var position = new WorldWind.Position(latitude, longitude, 100.0);
                var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

                placemark.label = city + "\n";
            placemark.alwaysOnTop = true;          
    
            placemarkLayer.addRenderable(placemark);
            return placemarkLayer;
}

var wwd = new WorldWind.WorldWindow("canvasOne");
wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

wwd.addLayer(globePoint(35.6762, 139.6503, "Tokyo")); // Tokyo     
