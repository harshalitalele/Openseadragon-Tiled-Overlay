var Overlay = (function() {
    function createOverlayElem(osd, id) {
        var overlayElem = document.createElement("canvas"),
            overlayStyle = overlayElem.style;
        
        overlayStyle.position = "absolute";
        overlayStyle.zIndex = 9999;
        overlayStyle.backgroundColor = "rgba(0,0,0,0.2)";
        overlayElem.setAttribute("id", id);
        osd.element.firstChild.appendChild(overlayElem);
        
        updateOverlaySize(osd, overlayElem);
        
        return overlayElem;
    }
    
    function updateOverlaySize(osd, elem) {
        var overlayElem = elem,
            overlayStyle = overlayElem.style,
            dimensions = osd.element.getClientRects()[0];
        
        overlayElem.width = dimensions.width;
        overlayElem.height = dimensions.height;
        overlayStyle.width = dimensions.width + "px";
        overlayStyle.height = dimensions.height + "px";
        overlayStyle.top = 0;
        overlayStyle.left = 0;
    }
    
    return function (id, osd) {
        this.osd = osd;
        this.elem = createOverlayElem(osd, id);
        var self = this;

        this.hide = function () {
            this.elem.style.display = "none";
        };

        this.show = function () {
            this.elem.style.display = "block";
            //self.elem.getContext("2d").clearRect(0, 0, self.elem.width, self.elem.height);
        };
        
        this.update = function() {
            updateOverlaySize(this.osd, this.elem);
        }
    }
})();
