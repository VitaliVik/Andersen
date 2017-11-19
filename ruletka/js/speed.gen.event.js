var speedGenEvent = (function () {
    var speed;
    var count = 0;

    function event(){
        console.log(count);
        count++;
    }

    function computeSpeed(){
        speed = count / intervalMeteringSpeed * intervalOneSecond;
        count = 0;
    }

    var idTimer;
    function start(){
        idTimer = setInterval(computeSpeed,intervalMeteringSpeed);
    }
    function stop(){
        clearInterval(idTimer);
    }

    function getSpeed(){
        return speed;
    }

    return {
        start : start,
        stop : stop,
        event : event,
        getSpeed : getSpeed
    }
})();