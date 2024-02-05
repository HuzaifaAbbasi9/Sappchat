$(document).ready(function () {
    var myColor = ["rgba(246, 85, 85, 1)", "#FFFFFF", "rgba(23, 99, 142, 1)", "#3AD7D7", "#AB40FF", "#FFC700", "#164EA1"];
    var myData = [9, 40, 22, 10, 4, 10, 5];
    var myLabel = ["Salaries", "Opex", "Liquidity Pool", "R&D", "Reserve", "Marketing", "Blockchain"];

    function getTotal() {
        var myTotal = 0;
        for (var j = 0; j < myData.length; j++) {
            myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
        }
        return myTotal;
    }

    function plotData() {
        var canvas;
        var ctx;
        var lastend = 0;
        var myTotal = getTotal();
        var doc;
        canvas = document.getElementById("canvas");
        var x = (canvas.width) / 2;
        var y = (canvas.height) / 2;
        var r = 150;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < myData.length; i++) {
            ctx.fillStyle = myColor[i];
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, r, lastend, lastend + (Math.PI * 2 * (myData[i] / myTotal)), false);
            ctx.lineTo(x, y);
            ctx.fill();

            // Now the pointers
            ctx.beginPath();
            var start = [];
            var end = [];
            var last = 0;
            var flip = 0;
            var textOffset = 0;
            var precentage = (myData[i] / myTotal) * 100;
            start = getPoint(x, y, r - 5, (lastend + (Math.PI * 2 * (myData[i] / myTotal)) / 2));
            end = getPoint(x, y, r + 5, (lastend + (Math.PI * 2 * (myData[i] / myTotal)) / 2));
            if (start[0] <= x) {
                flip = -1;
                textOffset = -110;
            } else {
                flip = 1;
                textOffset = 10;
            }
            ctx.moveTo(start[0], start[1]);
            // ctx.lineTo(end[0], end[1]);
            // ctx.lineTo(end[0] + 120 * flip, end[1]);
            // ctx.strokeStyle = "";
            // ctx.lineWidth = 2;
            // ctx.stroke();
            // The labels
            ctx.font = "1.2rem Arial";
            ctx.fillText(myLabel[i] + " " + precentage.toFixed(2) + "%", end[0] + textOffset, end[1] - 4);
            // Increment Loop
            lastend += Math.PI * 2 * (myData[i] / myTotal);

        }
    }

// Find that magical point
    function getPoint(c1, c2, radius, angle) {
        return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
    }

// The drawing
    plotData();
});