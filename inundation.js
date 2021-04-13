//import "@fontsource/roboto";


var map = L.map('map', {
    zoom: 9,
    center: [-18.6, 177.8],
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: "2021-01-01T00:00:00Z/2021-08-30T00:00:00Z",
        period: "PT1H"
    },
    timeDimensionControl: true,
    fullscreenControl: true,
});

//basemap
//var base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map);

var host = "http://192.168.8.100:8080/"

var wmsUrl = host + "ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0&DATASET=1";










// Create and add a TimeDimension Layer to the map

//tdLayer_Hs.addTo(map);
//tdLayer_Tp.addTo(map);
//tdLayer_L.addTo(map);
//tdLayer_Dp.addTo(map);
//tdLayer_Hswell.addTo(map);

//legend.addTo(map);

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.containerPoint.x + ", " + e.containerPoint.y + " : " + e.latlng)
        .openOn(map);

        //var isrc = "http://192.168.8.100:8080/ncWMS2/wms?REQUEST=GetTimeseries&LAYERS=1/Hswell&QUERY_LAYERS=1/Hswell,1/Tp,1/L,1/Hs&BBOX=176.7314,-19.385,178.8734,-17.6714&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT=500&WIDTH=950&X=" + Math.round(e.containerPoint.x) + "&Y="+ Math.round(e.containerPoint.y) + "&STYLES=default/default&VERSION=1.1.1&TIME=2021-02-18T00:00:00.000Z/2021-02-25T00:00:00.000Z&INFO_FORMAT=image/png&CHARTWIDTH=790"
        //document.getElementById("static-chart").src = isrc;
    
        //http://192.168.8.100:8080/ncWMS2/wms?REQUEST=GetTimeseries&LAYERS=1/Hswell&QUERY_LAYERS=1/Hswell,1/Tp,1/L,1/Hs&BBOX=176.7314,-19.385,178.8734,-17.6714&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT=500&WIDTH=950&X=434&Y=361&STYLES=default/default&VERSION=1.1.1&TIME=2021-02-18T00:00:00.000Z/2021-02-25T00:00:00.000Z&INFO_FORMAT=image/png&CHARTWIDTH=790
        //http://localhost:8080/ncWMS2/wms?REQUEST=GetTimeseries&LAYERS=1/Hswell&QUERY_LAYERS=1/Hs,1/Hswell,1/Tp,1/L&BBOX=176.7314,-19.385,178.8734,-17.6714&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT=500&WIDTH=950&X=434&Y=361&STYLES=default/default&VERSION=1.1.1&TIME=2021-02-18T00:00:00.000Z/2021-02-25T00:00:00.000Z&INFO_FORMAT=image/png
   
}
map.on('click', onMapClick);

var overlayMaps = { 
    //"Wave Height (Hs)": tdLayer_Hs,
};

var baseLayers = getCommonBaseLayers(map);
var layerControl = L.control.layers(baseLayers, overlayMaps).addTo(map);


function populateLayers()
{
    var wmsUrl = host + "ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "data.jsp", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var text = rawFile.responseText.trim();
                arr = text.split("\n");
                
                for (i = 0; i < arr.length; i++){
                    layerName = arr[i];
                    if (!layerName.includes(".png")){
                        console.log(layerName);
                        //add layer to map
                        
                        var layer = L.tileLayer.wms(wmsUrl, {
                            layers: layerName + "/z",
                            format: 'image/png',
                            transparent: true,
                            colorscalerange: '-9, 2.76',
                            abovemaxcolor: "extend",
                            belowmincolor: "extend",
                            numcolorbands: 250,
                            styles: 'default-scalar/x-Sst',
                            //styles: 'default-scalar/div-BuRd',
                            attribution: 'SPC CIFDP',                        
                        });

                        var td_Layer = L.timeDimension.layer.wms(layer, {
                            updateTimeDimension: true,
                            requestTimeFromCapabilities: true,
                            name: "Wave Height",
                            units: "m",
                            enableNewMarkers: true
                        });

                        //layerControl.addOverlay(layerName, layer);

                        td_Layer.addTo(map);
                        

                        

                    }
                }
            }
        }
    }
    rawFile.send(null);
}

populateLayers();

