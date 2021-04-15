/*
*    Return common layers used in different examples
*/
function getCommonBaseLayers(map){
    var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';

    //var bingLayer = L.tileLayer.bing(BING_KEY, {
    //    imagerySet:'AerialWithLabels'
    //});    

    var bingLayer = L.tileLayer.bing({
        bingMapsKey: BING_KEY,
        imagerySet: 'AerialWithLabels'
    });

    var osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; Pacific Community (OSM)'
    });
    var bathymetryLayer = L.tileLayer.wms("https://ows.emodnet-bathymetry.eu/wms", {
        layers: 'emodnet:mean_atlas_land',
        format: 'image/png',
        transparent: true,
        attribution: "EMODnet Bathymetry",
        opacity: 0.8
    });
    var coastlinesLayer = L.tileLayer.wms("https://ows.emodnet-bathymetry.eu/wms", {
        layers: 'coastlines',
        format: 'image/png',
        transparent: true,
        attribution: "EMODnet Bathymetry",
        opacity: 0.8
    });
    var bathymetryGroupLayer = L.layerGroup([bathymetryLayer, coastlinesLayer]);
    //bathymetryGroupLayer.addTo(map);
    osmLayer.addTo(map);
    return {
        "OSM": osmLayer,
        "Bing": bingLayer,
        "EMODnet Bathymetry": bathymetryGroupLayer        
    };
}