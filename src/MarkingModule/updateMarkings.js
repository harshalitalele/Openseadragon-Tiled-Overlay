//To Do:
//2. take schema and osd and markingUrl as input
//3. displayMarkings and hideMarkings methods

var TiledOverlay = (function() {
    
    function updateOverlay(needToShow, overlay, osd) {
        if(needToShow) {
            overlay.show();
        } else {
            overlay.hide();
        }
    }
    
    return function(osd, getUrl, schema) {
        var overlay = new Overlay('openseadragon-overlay', osd),
            isVisible = true;
        
        overlay.elem.style.pointerEvents = 'none';
        
        this.toggle = function() {
            isVisible = !isVisible;
            updateOverlay(isVisible, overlay, osd);
        };
    };
}());
