
var map = L.map('map', {
    zoom: 11,
    center: [-18.15, 177.63],
});

//var host = "http://192.168.8.100:8080/"
var host = "http://" + self.location.host + "/";

var wmsUrl = host + "ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.containerPoint.x + ", " + e.containerPoint.y + " : " + e.latlng)
        .openOn(map);
}
map.on('click', onMapClick);


var overlayMaps = {

};
var baseLayers = getCommonBaseLayers(map);
//var layerControl = L.control.layers(baseLayers, overlayMaps).addTo(map);

var locations = [
    ["Cuvu", -18.134225, 177.418035, "Site-1"],
    ["Cuvu", -18.145161, 177.422334, "Site-2"],
    ["Cuvu", -18.168178, 177.466828, "Site-3"],
    ["Korotogo", -18.170216, 177.534531, "Site-1"],
    ["Korotogo", -18.181435, 177.562147, "Site-2"],
    ["Korotogo", -18.184183, 177.609472, "Site-3"],
    ["Komave", -18.227696, 177.772865, "Site-1"],
    ["Komave", -18.221285, 177.758369, "Site-2"],
    ["Komave", -18.213895, 177.729305, "Site-3"],
    ["MauiBay", -18.204506, 177.673125, "Site-1"]
];

function activateLayer(id) {
    map.eachLayer(function (lyr) {
        console.log(id);
        if (lyr._leaflet_id == id) {
            layer_name = lyr.options.layers;
            for (var i = 0; i < locations.length; i++) {
                if (layer_name.startsWith(locations[i][0])) {
                    map.flyTo([locations[i][1], locations[i][2]], 15);
                }
            }
        }
    });
}





function populateLayers() {
    var wmsUrl = host + "ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "data.jsp", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var text = rawFile.responseText.trim();
                arr = text.split("\n");

                for (i = 0; i < arr.length; i++) {
                    layerName = arr[i];
                    if (!layerName.includes(".png")) {
                        console.log(layerName);
                        //add layer to map
                        var layer = L.tileLayer.wms(wmsUrl, {
                            layers: layerName + "/z",
                            format: 'image/png',
                            transparent: true,
                            opacity: 0.5,
                            colorscalerange: '0, 2.0',
                            abovemaxcolor: "extend",
                            belowmincolor: "extend",
                            numcolorbands: 250,
                            styles: 'default-scalar/x-Sst',
                            attribution: 'SPC CIFDP',
                        });
                        layer.addTo(map);
                        layerName = layerName.replace("T", ":") + "00";
                        layerName = layerName.replace("-", " @ ");

                        //html table rename
                        layerNameTable = layerName.replace("Cuvu @ ", "");
                        layerNameTable = layerNameTable.replace("Korotogo @ ", "");
                        layerNameTable = layerNameTable.replace("Komave @ ", "");
                        layerNameTable = layerNameTable.replace("MauiBay @ ", "");

                        overlayMaps[layerName] = layer;

                        //populate layer tables                        
                        if (layerName.startsWith("Cuvu"))
                            document.getElementById("t_Cuvu").innerHTML += "<a href='#' onclick='activateLayer(" + layer._leaflet_id + ")'>" + layerNameTable + "</a><br/>";
                        if (layerName.startsWith("Korotogo"))
                            document.getElementById("t_Korotogo").innerHTML += "<a href='#' onclick='activateLayer(" + layer._leaflet_id + ")'>" + layerNameTable + "</a><br/>";
                        if (layerName.startsWith("Komave"))
                            document.getElementById("t_Komave").innerHTML += "<a href='#' onclick='activateLayer(" + layer._leaflet_id + ")'>" + layerNameTable + "</a><br/>";
                        if (layerName.startsWith("Maui"))
                            document.getElementById("t_Maui").innerHTML += "<a href='#' onclick='activateLayer(" + layer._leaflet_id + ")'>" + layerNameTable + "</a><br/>";

                    }
                }
            }
        }
    }
    rawFile.send(null);
    //post add
    var layerControl = L.control.layers(baseLayers, overlayMaps).addTo(map);
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

//console.log(check_site);
//
for (var i = 0; i < locations.length; i++) {
    var vv;    
    if (locations[i][0] == "Cuvu") {
        if (check_site[0] == 1) {
            vv = icontest;
        }
        else {
            vv = greenIcon;
        }
    }
    else if (locations[i][0] == "Korotogo") {
        if (check_site[2] == 1) {
            vv = icontest;
        }
        else {
            vv = greenIcon;
        }
    }
    else if (locations[i][0] == "Komave") {
        if (check_site[1] == 1) {
            vv = icontest;
        }
        else {
            vv = greenIcon;
        }
    }
    else if (locations[i][0] == "MauiBay") {
        if (check_site[3] == 1) {
            vv = icontest;
        }
        else {
            vv = greenIcon;
        }
    }
    else {
        vv = greenIcon;
    }
    marker = new L.marker([locations[i][1], locations[i][2]], { icon: vv }).addTo(myFeatureGroup).bindPopup("<center><h3>" + locations[i][0] + "-" + locations[i][3] + "</h3></center><img style='width: 740px;' src='img/" + locations[i][0] + "-WL-" + locations[i][3].replace("-", "").toLowerCase() + ".png'>", { maxWidth: "auto" }).bindTooltip(locations[i][0] + "-" + locations[i][3]);
}

populateLayers();




