function AddPanel(elem){
    var cur = this; 
    this.addEvent;
    this.setListener = function(addEvent){
        this.addEvent = addEvent;
    };

    var text = document.createElement("input");
    text.type = "text";
    
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Создать";
    button.onclick = function(){
        cur.addEvent(text.value);
    }; 

    var div = document.createElement("div");
    div.appendChild(text);
    div.appendChild(button);
    elem.appendChild(div);

    this.container = div;
}

function ListPanel(elem){
    var div = document.createElement("div");
    this.addNote = function(value){
        var note = new Note(value);
        div.appendChild(note.container);
    }
    elem.appendChild(div);
    this.container = div;
}

function Note(value){
    var cur = this;
    this.isStrike = false;
    var div = document.createElement("div");

    var text = document.createElement("span");
    text.innerText = value;

    var button = document.createElement("input");
    button.type = "button";
    button.value = "Удалить";
    button.onclick = function(){
        div.remove();
    }

    div.onclick = function(){
        if(cur.isStrike){
            text.parentElement.remove();
            div.insertBefore(text,button);
        }else{
            text.remove();
            var strike = document.createElement("s");
            strike.appendChild(text);
            div.insertBefore(strike,button);
        }    
        cur.isStrike = !cur.isStrike;
    }

    div.appendChild(text);
    div.appendChild(button);

    this.container = div;
}

var container = document.getElementById("notes");

var addPanel = new AddPanel(container);

var listPanel = new ListPanel(container);

addPanel.setListener(listPanel.addNote);
