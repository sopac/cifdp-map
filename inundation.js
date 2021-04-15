//import "@fontsource/roboto";


var map = L.map('map', {
    zoom: 13,
    center: [-18.15, 177.45],
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: "2021-04-10T00:00:00Z/2021-04-10T00:00:00Z",
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

var wmsUrl = host + "ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";

// Create and add a TimeDimension Layer to the map

//wmslayers
var wmsLayer_In = L.tileLayer.wms(wmsUrl, {
    layers: 'Cuvu-2021-04-10T00/z',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-2, 34.78',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 250,
    //styles: 'default-scalar/x-Sst',
    styles: 'default-scalar/div-BuRd',
    attribution: 'SPC CIFDP',

});

var tdLayer_In = L.timeDimension.layer.wms(wmsLayer_In, {
    updateTimeDimension: true,
    name: "Water Level (m)",
    units: "m",
    enableNewMarkers: true
});

//legend.addTo(map);
tdLayer_In.addTo(map);

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
    "Cuvu Inundation Site 1": tdLayer_In,
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
                            //times: ['2021-04-10T06'],                            
                            //times: '2021-04-07T11:00:00.000Z'
                        });

                       
                        //var td = L.TimeDimension({
                        //    times: '2020-12-07T11:00:00.000Z',
                        //});

                        var td_Layer = L.timeDimension.layer.wms(layer, {
                            updateTimeDimension: true,
                            requestTimeFromCapabilities: true,
                            //setDefaultTime: true,
                            name: "Wave Height",
                            units: "m",
                            enableNewMarkers: true,
                            //timeDimension: true,
                            //timeDimensionOptions: {
                            //    times: '2020-12-07T11:00:00.000Z',
                            //}
                            //times: '2021-04-07T11:00:00.000Z',
                            //timeDimension.times: '2021-04-07T11:00:00.000Z',
                            
                        });

                        //console.log(td_Layer.getCurrentTime());

                        //td_Layer.getTimeDimension.setDefaultTime('021-04-07T11:00:00.000Z');

                        //layerControl.addOverlay(layerName, layer);

                        //td_Layer.addTo(map);
                        

                        

                    }
                }
            }
        }
    }
    rawFile.send(null);
}

populateLayers();

