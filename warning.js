//setting up the markers
function activateSite(p1, p2, p3) {
    var year = p1;
    var month = p2;
    var d = p3.split("T");
    var day = d[0];
    var mydate = new Date(year + "-" + month + "-" + day);
    var d = new Date();
    const diffTime = Math.abs(d - mydate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

//"Cuvu", "Komave", "Korotogo", "MauiBay"
function getSitesToPlot() {
    let check_site = [0, 0, 0, 0];
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "sites.jsp", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var text = rawFile.responseText.trim();
                arr = text.split("\n");

                for (i = 0; i < arr.length; i++) {
                    layerName = arr[i];
                    var res = layerName.split("-");
                    if (res[0] == "Runup") {
                        if (res[1] == "Cuvu") {
                            const num = activateSite(res[2], res[3], res[4])
                            if (num <= 30) {
                                check_site[0] = 1;
                            }
                        }
                        if (res[1] == "Komave") {
                            const num = activateSite(res[2], res[3], res[4])
                            if (num <= 30) {
                                check_site[1] = 1;
                            }
                        }
                        if (res[1] == "Korotogo") {
                            const num = activateSite(res[2], res[3], res[4])
                            if (num <= 30) {
                                check_site[2] = 1;
                            }
                        }
                        if (res[1] == "MauiBay") {
                            const num = activateSite(res[2], res[3], res[4])
                            if (num <= 30) {
                                check_site[3] = 1;
                            }
                        }
                    }
                }
            }
        }
    }
    rawFile.send(null);
    //console.log(check_site);
    return check_site;
}