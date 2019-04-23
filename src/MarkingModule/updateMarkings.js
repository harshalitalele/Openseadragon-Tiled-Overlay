//To Do:
//2. take schema and osd and markingUrl as input
//3. displayMarkings and hideMarkings methods

var TiledOverlay = (function() {
    
    var drawTiles = {};
    
    function activeImg(img, level, x, y) {
        this.img = img;
        this.level = level;
        this.x = x;
        this.y = y;
    }
    
    function updateOverlay(needToShow, overlay, osd) {
        if(needToShow) {
            overlay.show();
            // get viewport limits
            // get viewport limits intersection markings (from actual schema which lies in current viewport)
            // draw canvas
        } else {
            overlay.hide();
        }
    }
    
    function drawCanvas(img, x, y) {
        //
    }
    
    return function(osd, getUrl, schema) {
        var overlay = new Overlay('openseadragon-tiled-overlay', osd),
            isVisible = true;
        
        overlay.elem.style.pointerEvents = 'none';
        
        this.toggle = function() {
            isVisible = !isVisible;
            updateOverlay(isVisible, overlay, osd);
        };
    };
}());
