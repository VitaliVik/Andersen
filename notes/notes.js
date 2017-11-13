function EditTextPanel(){
    var container = document.createElement("div");

    var textEdit = document.createElement("input");
    textEdit.type = "text";

    var button = document.createElement("input");
    button.type = "button";

    container.appendChild(textEdit);
    container.appendChild(button);

    this.container = container;
    this.textEdit = textEdit;
    this.button = button;
}

function ListPanel(){
    this.container = document.createElement("div");
    this.listNotes = document.createElement("div");

    this.container.appendChild(this.listNotes);
}

function NotePanel(){
    var container = document.createElement("div");

    var buttonDelete = document.createElement("input");
    buttonDelete.type = "button";
    buttonDelete.value = "Удалить";

    var buttonEdit = document.createElement("input");
    buttonEdit.type = "button";
    buttonEdit.value = "Редактировать";

    var body = document.createElement("div");
    body.style.display = "inline-block";
    var text = document.createElement("span");

    body.appendChild(text);
    container.appendChild(body);
    container.appendChild(buttonEdit);
    container.appendChild(buttonDelete);

    this.container = container;
    this.buttonDelete = buttonDelete;
    this.buttonEdit = buttonEdit;
    this.body = body;
    this.text = text;
}

var addPanel = new EditTextPanel();
addPanel.button.value = "Cоздать";

var listPanel = new ListPanel();

addPanel.button.onclick = function(){
    //Начало создания NotePanel
    var note = new NotePanel();
    note.text.innerText = addPanel.textEdit.value;
    note.buttonDelete.onclick = function(){
        note.container.remove();
    }
    note.buttonEdit.onclick = function(){
        note.buttonEdit.style.display = "none";
        note.text.style.display = "none";
        //Начало создания editPanel
        var editPanel = new EditTextPanel();
        editPanel.textEdit.value = note.text.innerText;
        editPanel.button.value = "Сохранить";
        editPanel.button.onclick = function(){
            note.text.innerText = editPanel.textEdit.value;
            note.buttonEdit.style.display = "";
            note.text.style.display = "";
            editPanel.container.remove();
        }
        //Конец создания editPanel
        note.body.appendChild(editPanel.container);
    }
    var isStrike = false;
    note.text.onclick = function(){
        if(isStrike){
            text.style.textDecoration = "";
        }else{
            text.style.textDecoration = "line-through";
        }     
        isStrike = !isStrike;
    }
    //Конец создания NotePanel
    listPanel.listNotes.appendChild(note.container);
    addPanel.textEdit.value = "";
}

var container = document.getElementById("notes");
container.appendChild(addPanel.container);
container.appendChild(listPanel.container);