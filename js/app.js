
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
    }
    tasktable.innerHTML = tab;

    tasktable.addEventListener('change',(e)=>{
        e.preventDefault();
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
    taskname.value;
    const taskValue = taskcategories.value;
    let currentCat;
    if(taskValue=="personal"){
        currentCat = 1;
    }else if(taskValue=="office"){
        currentCat = 2;
    }else if(taskValue=="work"){
        currentCat = 3
    }else{
        currentCat = 4;
    }
    const createTTaskUrl = `http://localhost:8080/api/v3/${sessionStorage.getItem("id")}/${currentCat}/2/createTask`;
    createTask(createTTaskUrl);
    addtask.classList.remove('showtaskadd');
    window.location.reload();
})


async function createTask(url){
    const response = fetch(url,{
        method: 'POST',
            headers: {
                'Accept':"application/json",
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'taskName': taskname.value
            })
    })
}


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









