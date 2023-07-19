addtask = document.querySelector('.addtask');
addtaskbtn = document.querySelector('.addtaskbtn');
canceladd = document.querySelector('.canceladd');
taskname = document.querySelector('#taskname');
add = document.querySelector('.add');
taskcategories = document.querySelector('.taskcategories');

addtaskbtn.addEventListener('click',()=>{
    addtask.classList.add('showtaskadd');
})

canceladd.addEventListener('click',()=>{
    addtask.classList.remove('showtaskadd');
    taskcategories.value="office";
    taskname.value="";
})

tasktable = document.querySelector('.tasktable');



add.addEventListener('click',(e)=>{
    e.preventDefault();


    trw = document.createElement('tr');
    tdt = document.createElement('td');
    tdt1 =document.createElement('td');
    tdt2 = document.createElement('td');
    tdt3 = document.createElement('td');

    tdbtnedit = document.createElement('button');
    tdbtndelete = document.createElement('button');

    spanedit = document.createElement('span')
    spandelete = document.createElement('span')


    addtask.classList.remove('showtaskadd');
    
    tasktable.appendChild(trw);
    trw.appendChild(tdt);
    trw.appendChild(tdt1);
    trw.appendChild(tdt2);
    trw.appendChild(tdt3);
    tdt2.appendChild(tdbtnedit)
    tdt3.appendChild(tdbtndelete)

    tdt1.innerText = taskcategories.value;
    tdt.innerText = taskname.value;

    if(taskcategories.value=='office'){
        trw.style.backgroundColor = "#118111";
        tdbtndelete.style.backgroundColor= "#118111";
        tdbtnedit.style.backgroundColor="#118111";
    }else if(taskcategories.value=='school'){
        trw.style.backgroundColor = "#ffff11";
        tdbtndelete.style.backgroundColor= "#ffff11";
        tdbtnedit.style.backgroundColor="#ffff11";
    }else if(taskcategories.value=='work'){
        trw.style.backgroundColor = "#ff1111";
        tdbtndelete.style.backgroundColor= "#ff1111";
        tdbtnedit.style.backgroundColor="#ff1111";
        tdbtnedit.style.color="#f1f1f1";
        tdbtndelete.style.color="#f1f1f1";
        tdt.style.color="#f1f1f1";
        tdt1.style.color="#f1f1f1";
    }else{

    }


    tdbtnedit.appendChild(spanedit);
    tdbtndelete.appendChild(spandelete);

    tdbtndelete.classList.add('delete');
    tdbtnedit.classList.add('edit');



    spanedit.innerText = 'edit';
    spandelete.innerText = 'delete';

    spanedit.classList.add('material-symbols-outlined')
    spandelete.classList.add('material-symbols-outlined')

    taskcategories.value="office";
    taskname.value="";

})


const deletebtns = document.querySelectorAll('.delete');


editTask = document.querySelector('.edittask');
editedtaskname = document.querySelector('#editedtaskname');
let editEl;
let parent;
tasktable.addEventListener('click',(e)=>{
    if(e.target.innerText=='delete'){
        const deleteEl = e.target.parentElement.parentElement.parentElement;
        tasktable.removeChild(deleteEl);
    }else if(e.target.innerText=='edit'){
        editEl = e.target.parentElement.parentElement.parentElement;
        parent = e.target.parentElement.parentElement.parentElement;
        editTask.classList.add('showedit');
        editedtaskname.value=editEl.childNodes[1].innerText;
        taskcategories.value=editEl.childNodes[2].nextElementSibling.innerText;
        console.log(editEl.childNodes[2].nextElementSibling.innerText);
        
    }
})

canceledit = document.querySelector('.canceledit');

canceledit.addEventListener('click',()=>{
    editTask.classList.remove('showedit')
})

save = document.querySelector('.saveEditedTask');



editedtaskcategories = document.querySelector('.editedtaskcategories');
save.addEventListener('click',(e)=>{
    e.preventDefault();
    editEl.childNodes[1].innerText=editedtaskname.value;
    editEl.childNodes[2].nextElementSibling.innerText=editedtaskcategories.value;

    editTask.classList.remove('showedit');

    if(editedtaskcategories.value=='office'){
        parent.style.backgroundColor = "#118111";
        tdbtndelete.style.backgroundColor= "#118111";
        tdbtnedit.style.backgroundColor="#118111";
    }else if(editedtaskcategories.value=='school'){
        parent.style.backgroundColor = "#ffff11";
        tdbtndelete.style.backgroundColor= "#ffff11";
        tdbtnedit.style.backgroundColor="#ffff11";
    }else if(editedtaskcategories.value=='work'){
        parent.style.backgroundColor = "#ff1111";
        tdbtndelete.style.backgroundColor= "#ff1111";
        tdbtnedit.style.backgroundColor="#ff1111";
        tdbtnedit.style.color="#f1f1f1";
        tdbtndelete.style.color="#f1f1f1";
        tdt.style.color="#f1f1f1";
        tdt1.style.color="#f1f1f1";
    }else{

    }

    console.log(parent);
})
