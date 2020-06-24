// OpenSeadragon SVG Overlay2 plugin 0.0.2

// forked from https://github.com/openseadragon/svg-overlay
// create an SVG of the size of the DZI so it is can be easily
// used by 3rd party SVG library

(function () {
  // TODO: need v2.2+ for rotation fix
  if (!window.OpenSeadragon) {
    console.error("[openseadragon-svg-overlay2] requires OpenSeadragon");
    return;
  }

  var svgNS = "http://www.w3.org/2000/svg";

  // ----------
  OpenSeadragon.Viewer.prototype.svgOverlay = function () {
    if (this._svgOverlayInfo) {
      return this._svgOverlayInfo;
    }

    this._svgOverlayInfo = new Overlay(this);
    return this._svgOverlayInfo;
  };

  // ----------
  var Overlay = function (viewer) {
    var self = this;

    this._viewer = viewer;
    this._viewport = viewer.viewport;
    // we have no interest in the container dimension
    // this._containerWidth = this._viewer.container.clientWidth;
    // this._containerHeight = this._viewer.container.clientHeight;

    this._svg = document.createElementNS(svgNS, "svg");
    this._svg.style.position = "absolute";
    this._svg.style.left = 0;
    this._svg.style.top = 0;
    this._svg.setAttribute("width", viewer.source.dimensions.x);
    this._svg.setAttribute("height", viewer.source.dimensions.y);
    // SVG should be below `_viewer.overlaysContainer` so that overlays are on top of SVG
    this._viewer.canvas.insertBefore(this._svg, this._viewer.overlaysContainer);

    this._node = document.createElementNS(svgNS, "g");
    this._svg.appendChild(this._node);

    this._viewer.addHandler("animation", function () {
      self.update();
    });

    this._viewer.addHandler("rotate", function () {
      self.update();
    });

    this._viewer.addHandler("resize", function () {
      self.update();
    });

    this.update();
  };

  // ----------
  Overlay.prototype = {
    // ----------
    node: function () {
      return this._node;
    },

    // ----------
    element: function () {
      return this._svg;
    },

    // ----------
    update: function () {
      var p = this._viewport.pixelFromPoint(
        new OpenSeadragon.Point(0, 0),
        true
      );
      var zoom = this._viewport.getZoom(true);
      var scale = this._viewport.viewportToImageZoom(zoom);
      var rotation = this._viewport.getRotation();

      // console.log('[svg-overlay] update()', p, zoom, scale, rotation);
      this._node.setAttribute(
        "transform",
        `translate(${p.x},${p.y}) scale(${scale}) rotate(${rotation})`
      );
    },
  };
})();
