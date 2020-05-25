console.log('welcome');
shownotes();//this will show after refreshing a page.
//we will add eventlistner here
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {//if we click function will get call.

    let addtxt = document.getElementById('addtxt');//what we have written will get copied in addtxt variable.
    let addhead = document.getElementById('addhead');
    let notes = localStorage.getItem('notes');//we will get what we have in our local storage.
    if (notes == null) {
        notesobj = [];//if we have not written any note
    }
    else {
        notesobj = JSON.parse(notes);//this will take notes
    }
    let myobj = {
        title: addhead.value,
        text: addtxt.value
    }
    notesobj.push(myobj);//this will update the array
    localStorage.setItem("notes", JSON.stringify(notesobj));//this will update the localstorage
    addtxt.value = "";//this will set blank after adding a note to local storage
    addhead.value = "";
    shownotes();//this dispplay the notes

});
function shownotes() {
    let notes = localStorage.getItem("notes");//what we entered will be taken.
    if (notes == null) {
        notesobj = [];//if we have not written any note
    }
    else {
        notesobj = JSON.parse(notes);//this will take notes
    }
    let html = "";//intialally blank
    notesobj.forEach(function (element, index) {
        html += `<div class=" notecards card my-2 mx-2" style="width: 18rem;">
        <!-- <img src="..." class="card-img-top" alt="..."> -->
        <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <a id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete</a>
        </div>
    </div>`;//this will display the notes.




    });
    let notelem = document.getElementById('notes');
    if (notesobj.length != 0) {
        notelem.innerHTML = html;//this will copy the written materail in notes.
    }
    else {
        notelem.innerHTML = "Yeahh Everthing Done";//if empty the this will be printed.
    }

}

function deletenote(index) {
    // console.log('deleted');
    let notes = localStorage.getItem("notes");//what we entered will be taken.//it will be scan here localstorage
    if (notes == null) {
        notesobj = [];//if we have not written any note
    }
    else {
        notesobj = JSON.parse(notes);//this will take notes
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));//localstorade updated after deletion
    shownotes();//it will display after updation

}
//seraching function
let search = document.getElementById('searchTxt');//get id button
search.addEventListener("input", function () {

    let searchval = search.value.toLowerCase();//took input value always in lowercase
    // console.log('yess',searchval);
    let notescardss = document.getElementsByClassName('notecards');
    Array.from(notescardss).forEach(function (element) {
        let notetxts = element.getElementsByTagName("p")[0].innerText;//take here all the value inserted in notes
        if (notetxts.includes(searchval)) {
            element.style.display = "block";//if present dislpay it
        }
        else {
            element.style.display = "none";//else dont show anything.
        }

    })
})
