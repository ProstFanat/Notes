let notes = [];
let categories = [{id: 'withOut', name:"БЕЗ КАТЕГОРИИ"}, {id: 'study', name:"ОБУЧЕНИЕ"}, {id: 'food', name:"ПОКУПКИ"}];
let counter = 0;

let viewCategories = '';
localStorage.setItem('categories', JSON.stringify(categories))
categories.forEach( item => {
    viewCategories += "<div class='category-style'  onclick='showNotes("+ item.id +")'><p>"+ item.name + "</p></div>" ;
});
document.getElementById('categories').innerHTML = viewCategories;

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
    if (withOut.checked) {
        notes.unshift({id: counter, name: title, text: text, categoryId: 'withOut'} );
    };

    if (food.checked) {
        notes.unshift({id: counter, name: title, text: text, categoryId: 'food'} );
    };

    if (study.checked) {
        notes.unshift({id: counter, name: title, text: text, categoryId: 'study'} );
    };
    
    localStorage.setItem('notes', JSON.stringify(notes));    
    
    let viewNotes = '';  
    notes.forEach( item => { 
        viewNotes += '<div class="noteStyle" onclick="editNote('+ item.id +')" ><strong>' + item.name + '</strong> <p>' + item.text + '</p></div>';   
    });

    
    document.getElementById('text').style.display = 'none';
    document.getElementById('categories').style.display = 'flex';
    document.getElementById('notes').innerHTML = '';

    counter++;
};
        


function editNote(id) {

    let temp = notes.findIndex(item => item.id == id);

    function showForm() {
        document.getElementById('noteInfo').style.display =  'block';
        document.getElementById('btnAdd').style.display =    'none';
        document.getElementById('btnSave').style.display =   'none';
        document.getElementById('btnEdit').style.display =   'block';
        document.getElementById('btnDelete').style.display = 'block';
        
    };
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

        if (notes[temp].categoryId == 'withOut') {
            if (withOut.checked) {
                notes[temp] = ({id: id, name: title, text: text, categoryId: 'withOut'});
            };
        
            if (food.checked) {
                notes[temp] = ({id: id, name: title, text: text, categoryId: 'food'});
            };
        
            if (study.checked) {
                notes[temp] = ({id: id, name: title, text: text, categoryId: 'study'});
            };
            
        };
    
        if (notes[temp].categoryId == 'food') {
            if (withOut.checked) {
                notes[temp] = ({id: id, name: title, text: text, categoryId: 'withOut'});
            };
        
            if (food.checked) {
                notes[temp] = ({id: id, name: title, text: text, categoryId: 'food'});
            };
        
            if (study.checked) {
                notes[temp] = ({id: id, name: title, text: text, categoryId: 'study'});
            };
            
        };

        if (notes[temp].categoryId == 'study') {
            if (withOut.checked) {
                notes[temp] = ({id: id, name: title, text: text, categoryId: 'withOut'});
            };
        
            if (food.checked) {
                notes[temp] = ({id: id, name: title, text: text, categoryId: 'food'});
            };
        
            if (study.checked) {
                notes[temp] = ({id: id, name: title, text: text, categoryId: 'study'});
            };
        
        };

        localStorage.setItem('notes', JSON.stringify(notes));   
        
        let viewNotes = '';
        notes.forEach( item => { 
            viewNotes += '<div class="noteStyle" onclick="editNote('+ item.id +')" ><strong>' + item.name + '</strong> <p>' + item.text + '</p></div>';   
        });
        
        document.getElementById('text').style.display = 'none';
        document.getElementById('categories').style.display = 'flex';
        document.getElementById('notes').innerHTML = '';
        
    };

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
    
        
        document.getElementById('text').style.display = 'none';
        document.getElementById('categories').style.display = 'flex';
        document.getElementById('notes').innerHTML = '';
    };
};

function showNotes(id) {
    let temp = id.id ;
    let tempArr = [];
    console.log(temp);

    notes = localStorage.getItem('notes');
    notes = JSON.parse(notes);
    tempArr = notes.filter(item => item.categoryId == `${temp}`);
    console.log(tempArr);

    let viewNotes = '';
    tempArr.forEach( item => { 
        viewNotes += '<div class="noteStyle" onclick="editNote('+ item.id +')" ><strong>' + item.name + '</strong> <p>' + item.text + '</p></div>';   
    });
    
    document.getElementById('notes').innerHTML = viewNotes;

    document.getElementById('text').style.display = 'block';
    document.getElementById('categories').style.display = 'none';
    document.getElementById('btnCategories').style.display = 'block';
};

document.getElementById('btnCategories').onclick = function () {
    document.getElementById('btnCategories').style.display = 'none';
    document.getElementById('text').style.display = 'none';
    document.getElementById('categories').style.display = 'flex';
    document.getElementById('notes').innerHTML = '';
};

