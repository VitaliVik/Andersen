function EditTextPanel(nameButton,defaultValue){
    var cur = this; 
    var event;
    //event(data)
    this.setListener = function(fn){
        event = fn;
    };

    var text = document.createElement("input");
    text.type = "text";
    if(defaultValue){
        text.value = defaultValue;
    }
    
    var button = document.createElement("input");
    button.type = "button";
    button.value = nameButton;
    button.onclick = function(){
        event(text.value);
        text.value = "";
    }; 
    var div = document.createElement("div");
    div.appendChild(text);
    div.appendChild(button);

    this.container = div;
}

function ListPanel(){
    var div = document.createElement("div");
    this.addNote = function(value){
        var note = new Note(value);
        div.appendChild(note.container);
    }
    this.container = div;
}

function Note(value){
    var div = document.createElement("div");

    var text = document.createElement("span");
    text.innerText = value;

    var button = document.createElement("input");
    button.type = "button";
    button.value = "Удалить";
    button.onclick = function(){
        div.remove();
    }
    var buttonEdit = document.createElement("input");
    buttonEdit.type = "button";
    buttonEdit.value = "Редактировать";
    buttonEdit.onclick = function(){
        var editPanel = new EditTextPanel("Сохранить",text.innerText);
        editPanel.container.style.display="inline-block";
        editPanel.setListener(function(data){
            text.innerText = data;
            body.appendChild(text);
            editPanel.container.remove();
            buttonEdit.style.display = "";
        });

        body.innerHTML = "";
        body.appendChild(editPanel.container);
        buttonEdit.style.display = "none";
    }
    var body = document.createElement("div");
    body.style.display = "inline-block";
    var isStrike = false;
    text.onclick = function(){
        if(isStrike){
            text.style.textDecoration = "";
        }else{
            text.style.textDecoration = "line-through";
        }     
        isStrike = !isStrike;
    }

    body.appendChild(text);
    div.appendChild(body);
    div.appendChild(buttonEdit);
    div.appendChild(button);

    this.container = div;
}

var container = document.getElementById("notes");

var addPanel = new EditTextPanel("Cоздать");

var listPanel = new ListPanel();

addPanel.setListener(listPanel.addNote);

container.appendChild(addPanel.container);
container.appendChild(listPanel.container);
