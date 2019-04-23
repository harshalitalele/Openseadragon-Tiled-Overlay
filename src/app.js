var annoBoard = null,
    osdObj = OpenSeadragon({
        id:            "openseadragon",
        tileSources:   [
            "https://openseadragon.github.io/example-images/duomo/duomo.dzi"
        ],
        showNavigator: true,
        navigatorAutoFade: false,
        showNavigationControl: false,
        debugMode: true
    }),
    baseElement;

var to = new TiledOverlay(osdObj);

function toggleMarkings() {
    to.toggle();
}
