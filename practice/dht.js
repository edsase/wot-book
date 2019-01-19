var sensorLib = require('node-dht-sensor');

sensorLib.initialize(22,5);
var interval = setInterval(function(){
    read();
}, 2000);

function read(){
    var readout = sensorLib.read();
    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + 
    'Humidity: ' + readout.humidity.toFixed(2) + '%');
};

