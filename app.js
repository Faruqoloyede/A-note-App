const addBtn = document.querySelector(".addbtn");
const popup = document.querySelector(".popup-box");
const closeBtn = document.querySelector(".closebtn");
const addNote = document.querySelector("button");
const titleTag = document.querySelector("input");
const popupTitle =  document.querySelector("header p")
const message = document.querySelector("textarea");
const  months = ["january", "february", "March", "April",   "May", "June", "july", "August", "September", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBtn.addEventListener("click", ()=>{
    popup.classList.add("show");
});

closeBtn.addEventListener("click", ()=>{
    isUpdate = false
    titleTag.value = "";
    message.value = "";
    addNote.innerText = "Add Note";
    popupTitle.innerText = "Add a  new Note";
    popup.classList.remove("show");
});


//showing note

function showNote(){
    //removing duplicating note
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index)=>{
        let divTag = ` <div class="notes-box">  
        <div class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span class="date">${note.date}</span>
                <div class="settings">
                    <p class="icon" onclick = "showMenu(this)">...</p>
                    <ul class="menu">
                        <li onclick = "editeNote(${index}, '${note.title}', '${note.description}')">Edit</li>
                    <li onclick = "deleteNote(${index})">Delete</li>
                </ul>
            </div>
        </div>
    </div>
       </div>`
    addBtn.insertAdjacentHTML("afterend", divTag);
    });

}

showNote();

//showing menu
function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e =>{
        //removing show class from the settings menu on document click
        if( e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
};

//deleting note

function deleteNote(noteId){
    //confirming before deleting

    let confirmdel = confirm("are you sure you want to delete");

    if(!confirmdel){
        return false;
    }
    notes.splice(noteId, 1)//removing selected note from aray
    //saving the rest to the localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNote();
};

//updating note

function editeNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId

    addBtn.click();
    titleTag.value = title;
    message.value = desc;
    addNote.innerText = "update Note";
    popupTitle.innerText = "update a Note";
}

addNote.addEventListener("click", ()=>{
    let noteTitle = titleTag.value;
    let noteDes = message.value;
   
    if(noteTitle || noteDes){

        let dateObj = new Date();
        month = months[dateObj.getMonth()];
        days = dateObj.getDate();
        year = dateObj.getFullYear();

        let noteData = {
            title: noteTitle,
            description: noteDes,
            date: `${month}, ${days} ${year}`
        }

        if(!isUpdate){
            notes.push(noteData);
        }else {
            isUpdate = false;
            notes[updateId] = noteData;
        }
        //saving note to local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeBtn.click();
        showNote()
    }
});