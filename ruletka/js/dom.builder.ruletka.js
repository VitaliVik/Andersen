var domBuilderRuletka = (function () {
    var btnSpin;
    var wheelSpace;
    var wonItemsSpace;
    var bonusSpace;


    var countNeedSpin = 0;
    var wheelData = []
    var middleIndexWheelData = Math.floor(sizeWheel / 2);

    function init() {
        initControls();
        initListener();
        initWheelData();
        initTimers();
    }

    function initControls() {
        btnSpin = document.getElementById(spinId);
        wheelSpace = document.getElementById(wheelId);
        wonItemsSpace = document.getElementById(wonItemsId);
        bonusSpace = document.getElementById(bonusId);
    }

    function initWheelData() {
        for (var i = 0; i < sizeWheel; i++) {
            var item = randomItemsModule.getRandomItem(0);
            addItemInWheel(item);
        }
    }

    function initListener() {
        btnSpin.addEventListener(eventTypeClick, spinWheelListener);
    }

    function spinWheelListener() {
        countNeedSpin = getRandomInt(mincountSpin, maxCountSpin);
        btnSpin.disabled = true;
        spinWheel();
    }

    function getRandomInt(min, max) {
        var rand = Math.random() * (max - min + 1) + min;
        return Math.floor(rand);
    }

    function spinWheel() {
        if (countNeedSpin == 0) {
            var wonItem = wheelData[middleIndexWheelData].item;
            addWonItem(createItem(wonItem));
            btnSpin.disabled = false;
        } else {
            addRandomItemInWheel();
            countNeedSpin--;
            setTimeout(spinWheel, intervalSpinWheel);
        }
    }
    function addWonItem(wonItemLi) {
        wonItemsSpace.appendChild(wonItemLi);
    }

    function addRandomItemInWheel() {
        wheelData[middleIndexWheelData].style.backgroundColor = emptyString;

        if (wheelData.length == sizeWheel) {
            wheelData[0].remove();
            wheelData.splice(0, 1);
        }

        var item = randomItemsModule.getRandomItem(getBonus());
        addItemInWheel(item);

        wheelData[middleIndexWheelData].style.backgroundColor = colorMiddleItem;
    }

    function addItemInWheel(item) {
        var li = createItem(item);
        li.item = item;

        wheelData.push(li);
        wheelSpace.appendChild(li);
    }


    function createItem(item/*:Item*/) {
        var li = document.createElement("li");
        li.innerHTML = item.name + ":" + item.cost;
        return li;
    }

    function initTimers(){
        setInterval(updateValueBonus, intervalUpdateBonusValue);
    }

    function updateValueBonus(){
        console.log(10213456, getBonus());
        bonusSpace.innerHTML = getBonus();
    }
    function getBonus(){
        return speedGenEvent.getSpeed();
    }

    return {
        init: init
    };
})();