var onoff = require('onoff');

var Gpio = onoff.Gpio,
  led = new Gpio(10, 'out'),
  interval;

interval = setInterval(function(){
    var value = (led.readSync() + 1) % 2;
    led.write(value, function(){
        console.log('Changed LED state to ' + value);
    })
}, 2000)


// shutdown blinking gracefully with ctrl+c
process.on('SIGINT', function(){
    clearInterval(interval);
    led.writeSync(0);
    led.unexport();
    console.log("Bye bye!");
    process.exit();
});

