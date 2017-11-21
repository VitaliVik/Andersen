function Item(name, cost) {
    this.name = name;
    this.cost = cost;
}

var randomItemsModule = (function () {
    var data = [
        new Item("USP", 10),
        new Item("Glock", 12),
        new Item("AWP", 20),
        new Item("AK-47", 30),
        new Item("НОЖ", 100)
    ];

    function Range(left,right) {
        this.left = left;
        this.right = right;
    }

    var tempCostItems = [];

    function reBuild(valueEffect) {
        var pre = new Range(0, 0);
        tempCostItems = [];
        for (var i of data) {
            var temp = new Range(pre.right,pre.right);
            if(i.cost<valueEffect){
                temp.right += i.cost / valueEffect;
            }else{
                temp.right += valueEffect / i.cost;
            }
            tempCostItems.push(temp);
            pre = temp;
        }
    }

    function getRandomNumber(min, max) {
        var rand = Math.random() * (max - min) + min;
        return rand;
    }

    function getRandomItem(valueEffect) {
        valueEffect++;
        reBuild(valueEffect);
        var maxRightValue = tempCostItems[tempCostItems.length-1].right;
        var randomNumberValue = getRandomNumber(0,maxRightValue);
        for(var i in tempCostItems){
            var temp = tempCostItems[i];
            if(temp.right >= randomNumberValue){
                return data[i];
            }
        }
    }

    reBuild(1);

    return {
        getRandomItem:getRandomItem
    };

})();