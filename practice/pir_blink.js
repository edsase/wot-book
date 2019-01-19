var Gpio = require('onoff').Gpio,
  led = new Gpio(10, 'out');


//init input pin 24 to both (means both rising and falling edge)
var sensor = new Gpio(24, 'in', 'both');

// listen for state change in input 24. 
// if change, run callback func
sensor.watch(function(err,value){
    if (err) exit(err);
    console.log(value ? 'There is someone' : 'not anymore!');
    turnOnLED(value);
})

// function to activate LED if someone is detected
var turnOnLED = function(value){
    led.write(value, function(){
        console.log('Changed LED state to ' + value);
    })
}

// function to do clean exit
function exit(err){
    if (err) console.log('An error occured ' + err);
    sensor.unexport();
    led.writeSync(0);
    led.unexport();
    console.log('Bye bye!')
    process.exit();
}

process.on('SIGINT', exit)