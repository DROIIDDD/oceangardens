var wwd = new WorldWind.WorldWindow("canvasOne");

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
    var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    
    highlightAttributes.imageScale = 1.2;
    placemark.highlightAttributes = highlightAttributes;
    placemark.label = city + "\n";
    placemark.alwaysOnTop = true;          

    placemarkLayer.addRenderable(placemark);
    return placemarkLayer;
}

// Now set up to handle picking.
var highlightedItems = [];

// The common pick-handling function.
var handlePick = function (o) {
    // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
    // the mouse or tap location.
    var x = o.clientX,
        y = o.clientY;

    var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

    // De-highlight any previously highlighted placemarks.
    for (var h = 0; h < highlightedItems.length; h++) {
        highlightedItems[h].highlighted = false;
    }
    highlightedItems = [];

    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
    if (pickList.objects.length > 0) {
        redrawRequired = true;
    }

    // Highlight the items picked by simply setting their highlight flag to true.
    if (pickList.objects.length > 0) {
        var numShapesPicked = 0;
        for (var p = 0; p < pickList.objects.length; p++) {
            pickList.objects[p].userObject.highlighted = true;
            // Keep track of highlighted items in order to de-highlight them later.
            highlightedItems.push(pickList.objects[p].userObject);

            // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
            // If instead the user picked the placemark's image, the "labelPicked" property is false.
            // Applications might use this information to determine whether the user wants to edit the label
            // or is merely picking the placemark as a whole.
            if (pickList.objects[p].labelPicked) {
                //console.log("Label picked");
            }

            // Increment the number of items picked if a shape is picked.
            if (!pickList.objects[p].isTerrain) {
                ++numShapesPicked;
            }
        }

        if (numShapesPicked > 0) {
            //console.log(numShapesPicked + " shapes picked");
        }
    }

    // Update the window if we changed anything.
    if (redrawRequired) {
        wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
    }
};
// Listen for mouse moves and highlight the placemarks that the cursor rolls over.
wwd.addEventListener("mousemove", handlePick);


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

 // Create a surface image using a static image.
 var surfaceImage1 = new WorldWind.SurfaceImage(new WorldWind.Sector(33.6762, 37.6762, 134.6503,  144.6503),
 "images/Tokyo.jpg");


// Add the surface images to a layer and the layer to the WorldWindow's layer list.
var surfaceImageLayer = new WorldWind.RenderableLayer();
surfaceImageLayer.displayName = "Surface Images";
surfaceImageLayer.addRenderable(surfaceImage1);

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
wwd.addLayer(surfaceImageLayer);
surfaceImageLayer.enabled = false;

var clickRecognizer = new WorldWind.ClickRecognizer(wwd, 
    function(recognizer) {
        var x = recognizer.clientX,
        y = recognizer.clientY;
        // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
        // relative to the upper left corner of the canvas rather than the upper left corner of the page.
        var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
        var handleGoTo = function(position){
            //console.log('goto');
            //console.log(position);
            if ((Math.abs(position.latitude - 35.6762) < 2) && (Math.abs(position.longitude - 139.6503) < 2)) {
                console.log('clicked on tokyo');
                location.replace("tokyo.html");
            } else if  ((Math.abs(position.latitude - 37.6640) < 2) && (Math.abs(position.longitude - 127.9785) < 2)) {
                console.log('clicked on Korea');
                location.replace("korea.html");
            }
        } 

        // If only one thing is picked and it is the terrain, use a go-to animator to go to the picked location.
        if (pickList.objects.length >= 1) {
            var position = pickList.objects[0].position;
            wwd.goTo(new WorldWind.Location(position.latitude, position.longitude), handleGoTo(position));
            //surfaceImageLayer.enabled = true;
            //pickList.objects[0].userObject.enabled = false;
        }

});