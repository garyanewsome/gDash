var store = localStorage;

function storeNotes() {
    var myNotes = document.getElementById("myNotes").value;
    store.notes = myNotes;

}

function recallNotes(){
	if(store.notes !== undefined){
		document.getElementById("myNotes").innerHTML = store.notes;
	} else {
		document.getElementById("myNotes").innerHTML = "gDash notes...";
	}
}

function createEventListeners() {
    var saveButton = document.getElementById("saveButton");
    if (saveButton.addEventListener) {
        saveButton.addEventListener("click", storeNotes, false);
    } else if (saveButton.attachEvent) {
        saveButton.attachEvent("onclick", storeNotes);
    }
}

if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}

recallNotes();