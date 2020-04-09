let notes = [];
let counter = 0;

notes = JSON.stringify(notes);
localStorage.setItem('notes', notes);

document.getElementById('btnAdd').onclick = function () {
    document.getElementById('noteInfo').style.display = 'block';
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnSave').style.display = 'block';
}

document.getElementById('btnSave').onclick = function () {
    document.getElementById('noteInfo').style.display = 'none';
    document.getElementById('btnAdd').style.display = 'block';
    document.getElementById('btnSave').style.display = 'none';

    let title = document.getElementById('noteName').value;
    document.getElementById('noteName').value = '';
    let text = document.getElementById('noteText').value;
    document.getElementById('noteText').value = '';       

    notes = localStorage.getItem('notes');
    notes = JSON.parse(notes);
    notes.unshift({id: counter, name: title, text: text,});
    localStorage.setItem('notes', JSON.stringify(notes));    
    
    let viewNotes = '';  
    notes.forEach( item => { 
        viewNotes += '<div class="noteStyle" onclick="editNote('+ item.id +')" ><strong>' + item.name + '</strong> <p>' + item.text + '</p></div>';   
    });

    document.getElementById('notes').innerHTML = viewNotes;

    counter++;

}
        


function editNote(id) {

    let temp = notes.findIndex(item => item.id == id);

    function showForm() {
        document.getElementById('noteInfo').style.display =  'block';
        document.getElementById('btnAdd').style.display =    'none';
        document.getElementById('btnSave').style.display =   'none';
        document.getElementById('btnEdit').style.display =   'block';
        document.getElementById('btnDelete').style.display = 'block';
        
    }
    document.getElementById('notes').addEventListener("click", showForm());

    document.getElementById('noteName').value = `${notes[temp].name}`;
    document.getElementById('noteText').value = `${notes[temp].text}`; 

    document.getElementById('btnEdit').onclick = function () {
        document.getElementById('noteInfo').style.display =  'none';
        document.getElementById('btnAdd').style.display =    'block';
        document.getElementById('btnSave').style.display =   'none';
        document.getElementById('btnEdit').style.display =   'none';
        document.getElementById('btnDelete').style.display = 'none';
        
        let title = document.getElementById('noteName').value;
        document.getElementById('noteName').value = '';
        let text = document.getElementById('noteText').value;
        document.getElementById('noteText').value = '';
        
        notes = localStorage.getItem('notes');
        notes = JSON.parse(notes);
        notes[temp] = ({id: id, name: title, text: text,});
        localStorage.setItem('notes', JSON.stringify(notes));   
        
        let viewNotes = '';
        notes.forEach( item => { 
            viewNotes += '<div class="noteStyle" onclick="editNote('+ item.id +')" ><strong>' + item.name + '</strong> <p>' + item.text + '</p></div>';   
        });
    
        document.getElementById('notes').innerHTML = viewNotes;
    }

    document.getElementById('btnDelete').onclick = function () {

        document.getElementById('noteInfo').style.display =  'none';
        document.getElementById('btnAdd').style.display =    'block';
        document.getElementById('btnSave').style.display =   'none';
        document.getElementById('btnEdit').style.display =   'none';
        document.getElementById('btnDelete').style.display = 'none';

        document.getElementById('noteName').value = '';
        document.getElementById('noteText').value = '';

        notes = localStorage.getItem('notes');
        notes = JSON.parse(notes);
        notes.splice(temp, 1);
        localStorage.setItem('notes', JSON.stringify(notes));  

        let viewNotes = '';
        notes.forEach( item => { 
            viewNotes += '<div class="noteStyle" onclick="editNote('+ item.id +')" ><strong>' + item.name + '</strong> <p>' + item.text + '</p></div>';   
        });
    
        document.getElementById('notes').innerHTML = viewNotes;
    }
}



