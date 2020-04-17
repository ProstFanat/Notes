let View = {
    hideBtns: function() {
        let groups = document.getElementsByClassName('buttons');

        for (let i = 0; i < groups.length; i++) {
            groups[i].style.display = 'none';
        };
    },

    hideForms: function() {
        let groups = document.getElementsByClassName('form-group-control');
        
        for (let i = 0; i < groups.length; i++) {
            groups[i].style.display = 'none';
        };
    },

    init: function() {
        View.hideBtns();
        View.hideForms();
        View.showCategories();
        document.getElementById('btnAddNote').style.display = 'block';
        document.getElementById('btnAddCategory').style.display = 'block';
    },

    showNotes: function(id) {
        View.hideBtns();
        View.hideForms();
        let tempArr = localStorage.getItem('Notes.data')
        tempArr = JSON.parse(tempArr)
        tempArr = tempArr.filter(item => item.categoryId == id);
    
        let viewNotes = '';
        tempArr.forEach( item => { 
            viewNotes += `<div class="note" onclick="Notes.selectId(${item.id})" >${item.name} <p> ${item.text} </p></div>`; 
        });

        document.getElementById('text').style.display = 'block';
        document.getElementById('notes').innerHTML = viewNotes;
        

    },

    showNoteAdd: function() {
        View.hideBtns();
        View.hideForms();
        document.getElementById('noteContent').style.display = 'block';
        View.showRadios();

    },
    
    showNoteEdit: function() {
        View.init();
        View.hideBtns();
        document.getElementById('btnEditNote').style.display = 'block';
        document.getElementById('btnDeleteNote').style.display = 'block';
        document.getElementById('noteContent').style.display = 'block';
        View.showRadios();

    },

    showCategories: function() {
        document.getElementById('categories').style.display = 'flex';

        let viewCategories = '';
        Category.data.forEach( item => {
            viewCategories += `<div class='category'  onclick='Category.selectId(${item.id})' ><p>${item.name}</p></div>` ;
            
        });
        document.getElementById('categories').innerHTML = viewCategories;

    },

    showCatAdd: function() {
        View.hideBtns();
        View.hideForms();
        document.getElementById('addCategory').style.display = 'block';
        document.getElementById('btnSaveCategory').style.display = 'block';

    },
    
    showCatEdit: function() {
        document.getElementById('addCategory').style.display = 'block';
        document.getElementById('btnEditSaveCategory').style.display = 'block';
        document.getElementById('btnDeleteCategory').style.display = 'block';
        document.getElementById('btnBack').style.display = 'block';
    },

    selectCat: function() {


    },

    showRadios: function() {
        let viewRadios = '';
        Category.data.forEach ( item => {
        viewRadios +=   `<div> 
                            <input type="radio" id = '${Category.counter}' name="category">
                            <label for="${Category.counter}">${item.name}</label>
                        </div>`
        });
        

        document.getElementById('radios').innerHTML = viewRadios;
    },
};

let Notes = {
    data: [],
    counter: 0,

    init: function() {
        localStorage.setItem('Notes.data', JSON.stringify(Notes.data));
        Notes.noteCreate();
        Notes.noteAdd();
    },

    selectId: function(id) {
        Notes.noteEdit(id);
        Notes.noteDelete(id);
    },

    saveNotes: function() {
        localStorage.setItem('data', JSON.stringly(this.data));

    },

    noteCreate: function() {
        document.getElementById('btnAddNote').onclick = function() {
            View.showNoteAdd();
            document.getElementById('btnSaveNote').style.display = 'block';
        };
    
    },

    noteAdd: function(){
        document.getElementById('btnSaveNote').onclick = function() {
            let title = document.getElementById('noteName').value;
            document.getElementById('noteName').value = '';
            let text = document.getElementById('noteText').value;
            document.getElementById('noteText').value = '';      

            Notes.data = localStorage.getItem('Notes.data');
            Notes.data = JSON.parse(Notes.data);

            for (let i = 0; i < Category.data.length; i++) {
                if (Radios.data[i].type == "radio" && Radios.data[i].checked) {
                    Notes.data.unshift({id: Notes.counter, name: title, text: text, categoryId: i} );
                };
            };

            localStorage.setItem('Notes.data', JSON.stringify(Notes.data));    
    
            Notes.counter++;
            View.init();
        };
    },

    noteEdit: function(id) {
        View.showNoteEdit();
        let temp = Notes.data.findIndex(item => item.id == id);
        document.getElementById('noteName').value = Notes.data[temp].name;
        document.getElementById('noteText').value = Notes.data[temp].text; 

        document.getElementById('btnEditNote').onclick = function() {
            let title = document.getElementById('noteName').value;
            document.getElementById('noteName').value = '';
            let text = document.getElementById('noteText').value;
            document.getElementById('noteText').value = '';

            Notes.data = localStorage.getItem('Notes.data');
            Notes.data = JSON.parse(Notes.data);
            for (let i = 0; i < Category.data.length; i++) {
                if (Radios.data[i].type == "radio" && Radios.data[i].checked) {
                    Notes.data[temp] = ({id: id, name: title, text: text, categoryId: i});
                };
            };
            
            localStorage.setItem('Notes.data', JSON.stringify(Notes.data));   

            View.init();
        };

    },

    noteDelete: function(id) {
        let temp = Notes.data.findIndex(item => item.id == id);
        document.getElementById('btnDeleteNote').onclick = function() {
            Notes.data = localStorage.getItem('Notes.data');
            Notes.data = JSON.parse(Notes.data);
            Notes.data.splice(temp, 1);
            localStorage.setItem('Notes.data', JSON.stringify(Notes.data) )
            View.init();
        };
    },

};

let Category = {
    data: [{id: 0, name:"БЕЗ КАТЕГОРИИ"}, {id: 1, name:"ОБУЧЕНИЕ"}, {id: 2, name:"ПОКУПКИ"}],
    
    counter: 3,
    
    init: function() {
        localStorage.setItem('Category.data', JSON.stringify(Category.data));
        this.categoryCreate();
        this.categoryLoad();

    },

    selectId: function(id) {
        View.showNotes(id);
        Category.categoryDelete(id); 
        Category.categoryEdit(id); 
        Category.categoryBack();

    },

    categoryLoad: function(){
        document.getElementById('btnAddCategory').onclick = function() {
            View.showCatAdd();
        };
    },

    categoryCreate: function() {
        document.getElementById('btnSaveCategory').onclick = function() {
            let title = document.getElementById('categoryName').value;
            document.getElementById('categoryName').value = '';
    
            Category.data = localStorage.getItem('Category.data');
            Category.data = JSON.parse(Category.data);
            Category.data.push({id: Category.counter, name: title});
            localStorage.setItem('Category.data', JSON.stringify(Category.data));
    
            View.showCategories();
            Category.counter++;
            View.init();
        };

    },

    categoryDelete: function(id) {
        View.showCatEdit();
        let temp = Category.data.findIndex(item => item.id == id);
        document.getElementById('btnDeleteCategory').onclick = function() {
            Category.data = localStorage.getItem('Category.data');
            Category.data = JSON.parse(Category.data);
            Category.data.splice(temp, 1);
            localStorage.setItem('Category.data', JSON.stringify(Category.data));

            View.showCategories();
            View.init();
        };
        
          
    },

    categoryEdit: function(id){
        View.showCatEdit();
        let temp = Category.data.findIndex(item => item.id == id);
        document.getElementById('categoryName').value = Category.data[temp].name;

        document.getElementById('btnEditSaveCategory').onclick = function() {
            let title = document.getElementById('categoryName').value;
            document.getElementById('categoryName').value = '';

            Category.data = localStorage.getItem('Category.data');
            Category.data = JSON.parse(Category.data);
            Category.data[temp] = ({id: id, name: title});
            localStorage.setItem('Category.data', JSON.stringify(Category.data));   
            
            View.showCategories();
            View.init();
        };
    },

    categoryBack: function() {
        View.showCatEdit();
        document.getElementById('btnBack').onclick = function() {
            View.init();
        }
    },
};

let Radios = {
    data: document.getElementsByName('category'),
};


View.init();
Notes.init();
Category.init();