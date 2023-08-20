
if(sessionStorage.getItem("loggedIn")=="false"){
    window.location.replace("login.html");
}


addtask = document.querySelector('.addtask');
addtaskbtn = document.querySelector('.addtaskbtn');
canceladd = document.querySelector('.canceladd');
taskname = document.querySelector('#taskname');
add = document.querySelector('.add');
taskcategories = document.querySelector('.taskcategories');
tasktable = document.querySelector('.tasktable');

const logout = document.querySelector('.logout');

logout.addEventListener('click',(e)=>{
    e.preventDefault();
    sessionStorage.setItem("loggedIn","false");
    sessionStorage.removeItem("email");
    window.location.replace("login.html");
});

const pending = 2;
const completed = 1;
const getUserUrl = `http://localhost:8080/api/v3/getUserById/${sessionStorage.getItem("id")}`;


async function getUser(){
    const response = await fetch(getUserUrl);
    const data = await response.json();
    show(data); 
}

window.addEventListener('DOMContentLoaded',()=>{
    getUser();
    // // show(querriedData);
    // console.log("Hello, uhmmm" + querriedData);
})


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
    }
    tasktable.innerHTML = tab;

    tasktable.addEventListener('change',(e)=>{
        e.preventDefault();
        const elParent = e.target.parentNode.parentNode;
        let status = elParent.children[3];
        let firstChildEl = elParent.firstElementChild.nextElementSibling;
        let secondChildEl = elParent.firstElementChild.nextElementSibling.nextElementSibling;
        let thirdChildEl = elParent.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling;
        if(e.target.checked){
            let taskId = e.target.getAttribute('id');
            let statusUrl = `http://localhost:8080/api/v3/changeStatus/${taskId}/${completed}`;
            put(statusUrl); 
            firstChildEl.style.textDecoration = "line-through";
            secondChildEl.style.textDecoration = "line-through";
            thirdChildEl.innerHTML = "Completed";
        }else{
            let taskId = e.target.getAttribute('id');
            let statusUrl = `http://localhost:8080/api/v3/changeStatus/${taskId}/${pending}`;
            put(statusUrl);
            firstChildEl.style.textDecoration = "none";
            secondChildEl.style.textDecoration = "none";
            thirdChildEl.innerHTML = "Pending";
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
    taskcategories.value="Office";
    taskname.value="";
})





add.addEventListener('click',(e)=>{
    e.preventDefault();
    taskname.value;
    const taskValue = taskcategories.value;
    let currentCat;
    if(taskValue=="Personal"){
        currentCat = 1;
    }else if(taskValue=="Office"){
        currentCat = 2;
    }else if(taskValue=="Work"){
        currentCat = 3
    }else{
        currentCat = 4;
    }
    const createTTaskUrl = `http://localhost:8080/api/v3/${sessionStorage.getItem("id")}/${currentCat}/2/createTask`;
    createTask(createTTaskUrl);
    addtask.classList.remove('showtaskadd');
    createSingleTaskEl();
    taskname.value = "";
})

//creating td for updating the added task to the ui
function createSingleTaskEl(){
    const newTr = document.createElement('tr');
    const checkbox = document.createElement('input');
    checkbox.type="checkbox";
    const checkTd = document.createElement('td');
    const addTaskName = document.createElement('td');
    const addStatus = document.createElement('td');
    const addCat = document.createElement('td');
    const addEditBtn = document.createElement('button');
    const addDeleteBtn = document.createElement('button');

    const deleteTaskTd = document.createElement('td');
    const editTaskTd = document.createElement('td');

    const editSpan = document.createElement('span');
    const deleteSpan = document.createElement('span');

    addEditBtn.append(editSpan);
    addDeleteBtn.append(deleteSpan);
    addEditBtn.classList.add('edit');
    addDeleteBtn.classList.add('delete');

    editSpan.classList.add('material-symbols-outlined');
    deleteSpan.classList.add('material-symbols-outlined');
    editSpan.innerHTML = 'edit';
    deleteSpan.innerHTML='delete'

    editTaskTd.append(addEditBtn);
    deleteTaskTd.append(addDeleteBtn);
    checkTd.append(checkbox);
    newTr.append(checkTd);
    addTaskName.innerHTML = taskname.value;
    newTr.append(addTaskName);
    addCat.innerHTML = taskcategories.value;
    newTr.append(addCat)
    addStatus.innerHTML = "Pending";
    newTr.append(addStatus);
    newTr.append(editTaskTd);
    newTr.append(deleteTaskTd);
    tasktable.append(newTr);
    
}
async function createTask(url){
    const response = await fetch(url,{
        method: 'POST',
            headers: {
                'Accept':"application/json",
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'taskName': taskname.value
            })
    })
    console.log(await response.json());

}





editTask = document.querySelector('.edittask');




editedtaskname = document.querySelector('#editedtaskname');
let editEl;
let parent;
let btnEditParent;

let editUrl;

//add task
tasktable.addEventListener('click',(e)=>{
    if(e.target.innerText=='delete'){
        const deleteEl = e.target.parentElement.parentElement.parentElement;
        let id = e.target.parentElement.parentElement.parentElement.firstElementChild.childNodes[1].getAttribute('id');
        const delUrl = `http://localhost:8080/api/v3/delete/${id}`;
        deleteId(delUrl);
        tasktable.removeChild(deleteEl);
    }else if(e.target.innerText=='edit'){
        editEl = e.target.parentElement.parentElement.parentElement;
        parent = e.target.parentElement.parentElement.parentElement;
        btnEditParent= e.target.parentElement;
        editTask.classList.add('showedit');
        editedtaskname.value=editEl.firstElementChild.nextElementSibling.innerText;
        editedtaskcategories.value=editEl.firstElementChild.nextElementSibling.nextElementSibling.innerText;
        let id = e.target.parentElement.parentElement.parentElement.firstElementChild.childNodes[1].getAttribute('id');
        let currentEditCat = 1;
        if(editedtaskcategories.value=="Personal"){
            currentEditCat = 1;
        }else if(editedtaskcategories.value=="Office"){
            currentEditCat = 2;
        }else if(editedtaskcategories.value=="Work"){
            currentEditCat = 3
        }else{
            currentEditCat = 4;
        }
        editUrl = `http://localhost:8080/api/v3/edit/${id}`;
    }
})


//Delete a single task
async function deleteId(url){
    await fetch(url,{
        method: 'DELETE',
            headers: {
                'Accept':"application/json",
                'Content-Type':'application/json'
            }
    });
}
//edit task
async function editTaskEl(url){
    await fetch(url,{
        method: 'PUT',
            headers: {
                'Accept':"application/json",
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'taskName': editedtaskname.value
            })
    });
}

canceledit = document.querySelector('.canceledit');

canceledit.addEventListener('click',()=>{
    editTask.classList.remove('showedit')
})

save = document.querySelector('.saveEditedTask');



editedtaskcategories = document.querySelector('.editedtaskcategories');

save.addEventListener('click',(e)=>{
    e.preventDefault();
    editEl.firstElementChild.nextElementSibling.innerText=editedtaskname.value;
    editEl.firstElementChild.nextElementSibling.nextElementSibling.innerText=editedtaskcategories.value;
    editTaskEl(editUrl);
    editTask.classList.remove('showedit');
})









