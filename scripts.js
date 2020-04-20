let View = {
    hideBtns: function() {
        $('.buttons').css("display", "none");
    },

    hideForms: function() {
        $('.form-group-control').css("display", "none");
    },

    init: function() {
        View.hideBtns();
        View.hideForms();
        View.showCategories();
        $('#btnAddNote').css("display", "block");
        $('#btnAddCategory').css("display", "block");
    },

    showNotes: function(id) {
        View.hideBtns();
        View.hideForms();
        let tempArr = localStorage.getItem('Notes.data');
        tempArr = JSON.parse(tempArr);
        tempArr = tempArr.filter(item => item.categoryId == id);
    
        let viewNotes = '';
        tempArr.forEach( item => { 
            viewNotes += `<div class="note" onclick="Notes.selectId(${item.id})" >${item.name} <p> ${item.text} </p></div>`; 
        });

        $('#text').css("display", "block");
        $('#notes').html(viewNotes);
        

    },

    showNoteAdd: function() {
        View.hideBtns();
        View.hideForms();
        $('#noteContent').css("display", "block");
        View.showRadios();

    },
    
    showNoteEdit: function() {
        View.init();
        View.hideBtns();
        $('#btnEditNote').css("display", "block");
        $('#btnDeleteNotet').css("display", "block");
        $('#noteContent').css("display", "block");
        View.showRadios();

    },

    showCategories: function() {
        $('#categories').css("display", "flex");


        let viewCategories = '';
        Category.data.forEach( item => {
            viewCategories += `<div class='category'  onclick='Category.selectId(${item.id})' ><p>${item.name}</p></div>` ;
            
        });

        $('#categories').html(viewCategories);

    },

    showCatAdd: function() {
        View.hideBtns();
        View.hideForms();
        $('#addCategory').css("display", "block");
        $('#btnSaveCategory').css("display", "block");

    },
    
    showCatEdit: function() {
        $('#addCategory').css("display", "block");
        $('#btnEditSaveCategory').css("display", "block");
        $('#btnDeleteCategory').css("display", "block");
        $('#btnBack').css("display", "block");
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
        
        $('#radios').html(viewRadios);
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
        $('#btnAddNote').click(function(){
            View.showNoteAdd();
            $('#btnSaveNote').css("display", "block");
        });
    
    },

    noteAdd: function(){
        $('#btnSaveNote').click(function(){
            let title = $('#noteName').val();
            $('#noteName').val('')
            let text = $('#noteText').val();
            $('#noteText').val('')     

            Notes.data = localStorage.getItem('Notes.data');
            Notes.data = JSON.parse(Notes.data);

            for (let i = 0; i < Category.data.length; i++) {
                if (Radios.data[i].type == "radio" && Radios.data[i].checked) {
                    Notes.data.unshift({id: Notes.counter, name: title, text: text, categoryId: i});
                };
            };

            localStorage.setItem('Notes.data', JSON.stringify(Notes.data));    
    
            Notes.counter++;
            View.init();
        });
    },

    noteEdit: function(id) {
        View.showNoteEdit();
        let temp = Notes.data.findIndex(item => item.id == id);
        $('#noteName').val(Notes.data[temp].name);
        $('#noteText').val(Notes.data[temp].text);

        $('#btnEditNote').click(function(){
            let title = $('#noteName').val();
            $('#noteName').val('')
            let text = $('#noteText').val();
            $('#noteText').val('') 

            Notes.data = localStorage.getItem('Notes.data');
            Notes.data = JSON.parse(Notes.data);
            for (let i = 0; i < Category.data.length; i++) {
                if (Radios.data[i].type == "radio" && Radios.data[i].checked) {
                    Notes.data[temp] = {id: id, name: title, text: text, categoryId: i};
                };
            };
            
            localStorage.setItem('Notes.data', JSON.stringify(Notes.data));   

            View.init();
        });

    },

    noteDelete: function(id) {
        let temp = Notes.data.findIndex(item => item.id == id);
        $('#btnDeleteNote').click(function(){
            Notes.data = localStorage.getItem('Notes.data');
            Notes.data = JSON.parse(Notes.data);
            Notes.data.splice(temp, 1);
            localStorage.setItem('Notes.data', JSON.stringify(Notes.data) )
            View.init();
        });
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
        $("#btnAddCategory").click(function(){
            View.showCatAdd();
        });
    },

    categoryCreate: function() {
        $('#btnSaveCategory').click(function(){
            let title = $('#categoryName').val();
            $('#categoryName').val('');
    
            Category.data = localStorage.getItem('Category.data');
            Category.data = JSON.parse(Category.data);
            Category.data.push({id: Category.counter, name: title});
            localStorage.setItem('Category.data', JSON.stringify(Category.data));
    
            View.showCategories();
            Category.counter++;
            View.init();
        });

    },

    categoryDelete: function(id) {
        View.showCatEdit();
        let temp = Category.data.findIndex(item => item.id == id);
        $('#btnDeleteCategory').click(function(){
            Category.data = localStorage.getItem('Category.data');
            Category.data = JSON.parse(Category.data);
            Category.data.splice(temp, 1);
            localStorage.setItem('Category.data', JSON.stringify(Category.data));

            View.showCategories();
            View.init();
        });
        
          
    },

    categoryEdit: function(id){
        View.showCatEdit();
        let temp = Category.data.findIndex(item => item.id == id);
        $('#categoryName').val(Category.data[temp].name);

        $('#btnEditSaveCategory').click(function(){
            let title = $('#categoryName').val()
            $('#categoryName').val('')


            Category.data = localStorage.getItem('Category.data');
            Category.data = JSON.parse(Category.data);
            Category.data[temp] = ({id: id, name: title});
            localStorage.setItem('Category.data', JSON.stringify(Category.data));   
            
            View.showCategories();
            View.init();
        });
    },

    categoryBack: function() {
        View.showCatEdit();
        $('#btnBack').click(function(){
            View.init();
        });
    },
};

let Radios = {
    data: document.getElementsByName('category'),
};


View.init();
Notes.init();
Category.init();