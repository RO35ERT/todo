addtask = document.querySelector('.addtask');
addtaskbtn = document.querySelector('.addtaskbtn');
canceladd = document.querySelector('.canceladd');
taskname = document.querySelector('#taskname');
add = document.querySelector('.add');
taskcategories = document.querySelector('.taskcategories');
tasktable = document.querySelector('.tasktable');

const pending = 2;
const completed = 1;

const getUserUrl = "http://localhost:8080/api/v3/getUser/c@bot.com";

async function getUser(url){
    const response = await fetch(url);
    const data = await response.json();
    show(data); 
}

getUser(getUserUrl);


function show(data){
    let tab = `
    <tr>
        <th></th>
        <th>Name</th>
        <th>Category</th>
        <th>Status</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>
    `;

    let activeStatus;
    for(let i of data["tasks"]){

        const isCompleted = i["status"]==="Completed";
        const textDecoration = isCompleted ? "line-through":"none";
        tab += `
        <tr>
            <td>
                <input type="checkbox" id=${i["id"]} ${isCompleted?'checked':''}>
            </td>
            <td style= "text-decoration: ${textDecoration}">${i["taskName"]}</td>
            <td style="text-decoration: ${textDecoration}">${i["categoryName"]}</td>
            <td>${i["status"]}</td>
            <td><button class="edit">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button></td>
            <td><button class="delete">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button></td>
        </tr>
        `;
        
        activeStatus = i["status"];
        console.log(activeStatus);        
    }
    tasktable.innerHTML = tab;


    

    const allTasks = data["tasks"]; 
    tasktable.addEventListener('change',(e)=>{
        const elParent = e.target.parentNode.parentNode;
        let status = elParent.children[3];
        if(e.target.checked){
            let taskId = e.target.getAttribute('id');
            let statusUrl = `http://localhost:8080/api/v3/changeStatus/${taskId}/${completed}`;
            put(statusUrl);
            getUser(getUserUrl);
            
        }else{
            let taskId = e.target.getAttribute('id');
            let statusUrl = `http://localhost:8080/api/v3/changeStatus/${taskId}/${pending}`;
            put(statusUrl);
            getUser(getUserUrl);
        }
        
    })



    async function put(url){
        const response = await fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            }
        });
    }
}

addtaskbtn.addEventListener('click',()=>{
    addtask.classList.add('showtaskadd');
})

canceladd.addEventListener('click',()=>{
    addtask.classList.remove('showtaskadd');
    taskcategories.value="office";
    taskname.value="";
})



    

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
let btnEditParent;
tasktable.addEventListener('click',(e)=>{
    if(e.target.innerText=='delete'){
        const deleteEl = e.target.parentElement.parentElement.parentElement;
        tasktable.removeChild(deleteEl);
    }else if(e.target.innerText=='edit'){
        editEl = e.target.parentElement.parentElement.parentElement;
        parent = e.target.parentElement.parentElement.parentElement;
        btnEditParent= e.target.parentElement;
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

    console.log(editEl)
    editTask.classList.remove('showedit'); 
})









