var overlayEditMode = false;

function editOverlay() {
  overlayEditMode = !overlayEditMode;
}

$("input").on("keyup change", function () {
  var action = this.getAttribute("action");
  if (action === "rotate") {
    console.log("rotate", this.value);
    viewer.viewport.setRotation(Number(this.value));
  }
});

var tileSource =
  "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi";

window.viewer = OpenSeadragon({
  id: "openseadragon",
  maxZoomPixelRatio: 10,
  tileSources: [
    {
      tileSource: tileSource,
    },
  ],
  // tileSources: "http://openseadragon.github.io/example-images/duomo.dzi"
  gestureSettingsMouse: {
    clickToZoom: false,
    dblClickToZoom: false,
  },
  gestureSettingsTouch: {
    clickToZoom: false,
    dblClickToZoom: false,
  },
  showNavigationControl: false,
  showNavigator: true,
});
// viewer.activateImagingHelper();

// initialize overlay
viewer.addHandler("open", function () {
  var dimensions = viewer.source.dimensions;
  window.dimensions = dimensions;
  window.dimensions.max = Math.max(dimensions.x, dimensions.y);

  window.overlay = viewer.svgOverlay();
  window.paper = Snap(overlay.node());

  var elt = document.createElement("div");
  elt.className = "border";
  viewer.addOverlay({
    element: elt,
    location: viewer.viewport.imageToViewportRectangle(
      new OpenSeadragon.Rect(0, 0, dimensions.x, dimensions.y)
    ),
  });

  addShapes();
});

function addShapes() {
  window.shapes = [];

  // text draws upwards
  shapes.push(
    paper.text(0, 500, "Snap.svg").attr({
      stroke: "#000",
      fontSize: 500,
    })
  );

  shapes.map(function (shape) {
    var bb = shape.getBBox();
    var clientrect = shape.node.getBoundingClientRect();
  });
}
