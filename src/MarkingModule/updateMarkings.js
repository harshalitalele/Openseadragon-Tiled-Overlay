//To Do:
//2. take schema and osd and markingUrl as input
//3. displayMarkings and hideMarkings methods
//imageSmoothingEnabled = true; for anti aliasing
var TiledOverlay = (function() {
    
    var drawTiles = {},
        curViewport = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            curZoomLevel: 0,
            curTileSize: 0
        };
    
    //To Do: Optimize this method
    function getCurrentViewportInfo(osd) {
        var maxImgWd = osdObj.tileCache._tilesLoaded[0].tiledImage.source.dimensions.x,
            stTileSize = osdObj.tileCache._tilesLoaded[0].tiledImage.source._tileWidth,
            imgZoom = osdObj.viewport.viewportToImageZoom(osdObj.viewport.getZoom()),
            maxLevel = Math.round(Math.log(maxImgWd) / Math.log(2)),
            currLevel = Math.log(maxImgWd*imgZoom) / Math.log(2),
            currLevelExact = Math.ceil(currLevel),
            containerSize = osdObj.viewport.containerSize,
            vpTLPoint = osdObj.viewport.pointFromPixel(new OpenSeadragon.Point(0,0)),
            vpBRPoint = osdObj.viewport.pointFromPixel(containerSize),
            topLeftMaxZoom = osdObj.viewport.viewportToImageCoordinates(new OpenSeadragon.Point(vpTLPoint.x, vpTLPoint.y)),
            bottomRightMaxZoom = osdObj.viewport.viewportToImageCoordinates(new OpenSeadragon.Point(vpBRPoint.x, vpBRPoint.y)),
            topLeftCurZoom = {
                x: topLeftMaxZoom.x*imgZoom,
                y: topLeftMaxZoom.y*imgZoom
            }, bottomRightCurZoom = {
                x: bottomRightMaxZoom.x*imgZoom,
                y: bottomRightMaxZoom.y*imgZoom
            },
            levelWd = (bottomRightMaxZoom.x - topLeftMaxZoom.x)/Math.pow(2, maxLevel - currLevelExact),
            actualWd = bottomRightCurZoom.x - topLeftCurZoom.x,
            curTilesize = actualWd*stTileSize/levelWd;
        
        curViewport.x1 = topLeftCurZoom.x * imgZoom;
        curViewport.y1 = topLeftCurZoom.y * imgZoom;
        curViewport.x2 = bottomRightCurZoom.x * imgZoom;
        curViewport.y2 = bottomRightCurZoom.y * imgZoom;
        curViewport.curZoomLevel = currLevel;
        curViewport.curTileSize = curTilesize;
    }
    
    function activeImg(img, level, x, y, osd) {
        this.img = img;
        
        this.updateDimensions = function(osd) {
            
        };
        
        this.updateDimensions(osd);
    }
    
    function updateOverlay(needToShow, overlay, osd, schema) {
        if(needToShow) {
            overlay.show();
            // get viewport limits
            getCurrentViewportInfo(osd);
            // get viewport limits intersection markings (from actual schema which lies in current viewport)
            drawLevels(schema);
            // draw canvas
        } else {
            overlay.hide();
        }
    }
    
    function imgCurScale(level, x, y) {
        //
    }
    
    function isTileVisible(level, x, y) {
        var exactCurLevel = Math.round(curViewport.curZoomLevel),
            levelDiff = exactCurLevel - level,
            tileDim = {
                x: x * Math.pow(2, levelDiff) * curViewport.curTileSize,
                y: y * Math.pow(2, levelDiff) * curViewport.curTileSize
            };
        // if()
    }
    
    function drawLevels(schema) {
        var levels = Object.keys(schema);
        levels.sort(function(a, b) {
            return Number(a) - Number(b);
        });
        
        for(var l in levels) {
            var level = levels[l];
            for(var x in schema[level]) {
                for(var yin in schema[level][x]) {
                    var y = schema[level][x][yin];
                    var imgScale = isTileVisible(level, x, y);
                    if(imgScale) {
                        var imgBlob = fetchImg(level, x, y);
                        var img = new activeImg(imgBlob, level, x, y);
                        drawCanvas(img);
                    }
                }
            }
        }
    }
    
    function drawCanvas(img, x, y) {
        for(var i in allActiveImgs) {
            var imgObj = allActiveImgs[i],
                curLevel = 0,
                curImgMultiplier = curLevel / imgObj.level,
                curImgPos = {
                    x: imgObj.x * curImgMultiplier,
                    y: imgObj.y * curImgMultiplier
                };
            ctx.drawImage(
                img,
                curImgPos.x+1,
                curImgPos.y+1,
                curImgPos.tilesize-2,
                curImgPos.tilesize-2
            );
        }
    }
    
    return function(osd, getUrl, schema) {
        var overlay = new Overlay('openseadragon-tiled-overlay', osd),
            isVisible = true;
        
        overlay.elem.style.pointerEvents = 'none';
        
        this.toggle = function() {
            isVisible = !isVisible;
            updateOverlay(isVisible, overlay, osd, schema);
        };
        
        osd.addHandler('viewport-change', function() {
            if(isVisible) {
                updateOverlay(true, overlay, osd, schema);
            }
        });
    };
}());
