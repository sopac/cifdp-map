//import "@fontsource/roboto";

var map = L.map('map', {
    zoom: 9,
    center: [-18.6, 177.8],
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: "2021-02-18T00:00:00Z/2021-02-25T00:00:00Z",
        period: "PT1H"
    },
    timeDimensionControl: true,
    fullscreenControl: true,
});



//var host = "http://192.168.8.100:8080/"
var host = "http://" + self.location.host + "/";

var wmsUrl = host + "ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0&DATASET=1";

//wmslayers
var wmsLayer_Hs = L.tileLayer.wms(wmsUrl, {
    layers: '1/Hs',
    format: 'image/png',
    transparent: true,
    //opacity: 1,
    colorscalerange: '0, 2.76',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 50,
    scaleMin: 0,
    styles: 'default-scalar/x-Sst',
    //styles: 'default-scalar/div-BuRd',
    attribution: 'SPC CIFDP',

});

var wmsLayer_Tp = L.tileLayer.wms(wmsUrl, {
    layers: '1/Tp',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-9, 20.0',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 250,
    //styles: 'default-scalar/div-BuRd',
    attribution: 'SPC CIFDP',
});

var wmsLayer_L = L.tileLayer.wms(wmsUrl, {
    layers: '1/L',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-9.0, 624.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 250,
    //styles: 'default-scalar/div-BuRd',
    attribution: 'SPC CIFDP',
});




var wmsLayer_Dp = L.tileLayer.wms(wmsUrl, {
    layers: '1/Dp',
    format: 'image/png',
    //opacity: 1.0,
    //bgColor: 'black',
    transparent: true,
    colorscalerange: '-999.0, 355.0',
    //colorscalerange: '1, 1',
    //abovemaxcolor: "extend",
    //belowmincolor: "extend",
    //numcolorbands: 250,
    //markerscale: 15,
    //markerspacing: 12,
    //markerclipping: true,
    styles: 'spc',
    attribution: 'SPC CIFDP',
});

var wmsLayer_Hswell = L.tileLayer.wms(wmsUrl, {
    layers: '1/Hswell',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-9.0, 2.48594',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 250,
    styles: 'default-scalar/div-BuRd',
    attribution: 'SPC CIFDP',

});

//time series layers
var tdLayer_Hs = L.timeDimension.layer.wms(wmsLayer_Hs, {
    updateTimeDimension: true,
    name: "Wave Height",
    units: "m",
    enableNewMarkers: true
});

var tdLayer_Tp = L.timeDimension.layer.wms(wmsLayer_Tp, {
    updateTimeDimension: true,
    name: "Peak Wave Period",
    units: "s",
});

var tdLayer_L = L.timeDimension.layer.wms(wmsLayer_L, {
    updateTimeDimension: true,
    name: "Peak Wave Length",
    units: "m",
});

var tdLayer_Dp = L.timeDimension.layer.wms(wmsLayer_Dp, {
    updateTimeDimension: true,
    name: "Peak Wave Direction",
    units: "degree",
});

var tdLayer_Hswell = L.timeDimension.layer.wms(wmsLayer_Hswell, {
    updateTimeDimension: true,
    name: "Swell Wave Height",
    units: "m",
});


//legend
var legend = L.control({
    position: 'bottomright'
});

legend.onAdd = function (map) {
    var src = host + "ncWMS2/wms?SERVICE=WMS&VERSION=1.3.0&DATASET=1&REQUEST=GetLegendGraphic&LAYER=1/Hs&colorscalerange=-9.0,2.76&PALETTE=default-scalar/x-Sst&numcolorbands=250&transparent=TRUE&width=10";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img style="height: 300px;" src="' + src + '" alt="legend">';
    return div;
};


var overlayMaps = {
    "Wave Height (Hs)": tdLayer_Hs,
    "Peak Wave Period (Tp)": tdLayer_Tp,
    "Peak Wave Lenght (L)": tdLayer_L,
    "Peak Wave Direction (Dp)": tdLayer_Dp,
    "Swell Wave Height (Hswell)": tdLayer_Hswell,
};

var baseLayers = getCommonBaseLayers(map);
L.control.layers(baseLayers, overlayMaps).addTo(map);

// Create and add a TimeDimension Layer to the map
tdLayer_Hs.addTo(map);
//tdLayer_Tp.addTo(map);
//tdLayer_L.addTo(map);
tdLayer_Dp.addTo(map);
//tdLayer_Hswell.addTo(map);

legend.addTo(map);

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng + "")
        .openOn(map);

    var isrc1 = "/ncWMS2/wms?REQUEST=GetTimeseries&LAYERS=1/Hs&QUERY_LAYERS=1/Hs,1/Hswell&BBOX=176.7314,-19.385,178.8734,-17.6714&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT=500&WIDTH=950&X=" + Math.round(e.containerPoint.x) + "&Y=" + Math.round(e.containerPoint.y) + "&STYLES=default/default&VERSION=1.1.1&TIME=2021-02-18T00:00:00.000Z/2021-02-25T00:00:00.000Z&INFO_FORMAT=image/png&CHARTWIDTH=790";
    var isrc2 = "/ncWMS2/wms?REQUEST=GetTimeseries&LAYERS=1/Tp&QUERY_LAYERS=1/Tp,1/L&BBOX=176.7314,-19.385,178.8734,-17.6714&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT=500&WIDTH=950&X=" + Math.round(e.containerPoint.x) + "&Y=" + Math.round(e.containerPoint.y) + "&STYLES=default/default&VERSION=1.1.1&TIME=2021-02-18T00:00:00.000Z/2021-02-25T00:00:00.000Z&INFO_FORMAT=image/png&CHARTWIDTH=790";

    var latt = e.latlng.lat;
    var longg = e.latlng.lng;

    var isLongInRange = longg >= 176.75354 && longg <= 178.849732;
    var isLatiInRange = latt >= -19.314324 && latt <= -17.732428;
    var value = Boolean(isLongInRange) && Boolean(isLatiInRange);

    if (value) {
        document.getElementById("static-chart-1").src = isrc1;
        document.getElementById("static-chart-2").src = isrc2;
    }
    else {
        alert('Click Inside Boundary.');
    }

}

//"Cuvu", "Komave", "Korotogo", "MauiBay"
let check_site = getSitesToPlot();

var redIcon = new L.Icon({
    iconUrl: 'img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

var greenIcon = new L.Icon({
    iconUrl: 'img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

var icontest = new L.Icon({
    iconUrl: 'img/alert.gif',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

var myFeatureGroup = L.featureGroup().addTo(map);
var marker, test;

var myFeatureGroup = L.featureGroup().addTo(map).on("click", groupClick);
var marker, test;
var locations = [
    ["Cuvu", -18.134225, 177.418035, "site1"],
    ["Korotogo", -18.170216, 177.534531, "site1"],
    ["Komave", -18.227696, 177.772865, "site1"],
    ["MauiBay", -18.204506, 177.673125, "site1"]
  ];
for (var i = 0; i < locations.length; i++) {
    test = "test";
    var vv;
    var yesno ="";
    if (locations[i][0] == "Cuvu"){
        if (check_site[0] == 1){
            vv = icontest;
        }
        else{
            vv = greenIcon;
            yesno = "No";
        }
    }
    else if (locations[i][0] == "Korotogo"){
        if (check_site[2] == 1){
            vv = icontest;
        }
        else{
            vv = greenIcon;
            yesno = "No";
        }
    }
    else if (locations[i][0] == "Komave"){
        if (check_site[1] == 1){
            vv = icontest;
        }
        else{
            vv = greenIcon;
            yesno = "No";
        }
    }
    else if (locations[i][0] == "MauiBay"){
        if (check_site[3] == 1){
            vv = icontest;
        }
        else{
            vv = greenIcon;
            yesno = "No";
        }
    }
    else{
        vv = greenIcon;
        yesno = "No";
    }
    var msg = " " + yesno + " Inundation @ ";
    marker = new L.marker([locations[i][1], locations[i][2]],{icon: vv}).addTo(myFeatureGroup).bindPopup("<center>" + msg + locations[i][0] + " Site" + "<br/><a href='inundation.html'>Details</a></center>").bindTooltip(locations[i][0]);
    marker.test = test;
  }

 
function groupClick(event) {
  console.log("Clicked on marker " + event.layer.test);  
}


//map events
map.on('click', onMapClick);

