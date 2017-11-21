(function(){
    window.onload = function(){
        window.addEventListener(eventTypeKeyPress,speedGenEvent.event);
        speedGenEvent.start();

        domBuilderRuletka.init();
    }
})();