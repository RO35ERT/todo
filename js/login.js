const checkbox = document.querySelector('#passCheck');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const login = document.querySelector('.login');
const submit = document.querySelector('#submit');
const error = document.querySelector('.error');
login.addEventListener('change',(e)=>{
    if(e.target.checked){
        password.type = "text";
    }else{
        password.type = "password";
    }
});

let getSingleUser = "";
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    const userEmail = email.value;
    getSingleUser= `http://localhost:8080/api/v3/getUser/${userEmail}`;
    getSpecificUser(getSingleUser);

})

function getUser(data) {
    const userEmail = email.value;
    const userPass = password.value;
    if(authenticateUser(userEmail,data["email"],userPass,data["password"])){
        sessionStorage.setItem("loggedIn","true");
        sessionStorage.setItem("email",userEmail);
        window.location.href="main.html";
    }
}   

console.log(sessionStorage.getItem("loggedIn"));

async function getSpecificUser(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        getUser(data);
    } catch (allErrors) {
        error.innerHTML = "Wrong password or email";
        console.log("User not found");
    }
}

function authenticateUser(userEmail, dbEmail,userPass,dbPass){
    if(userEmail===dbEmail && userPass===dbPass){
        return true;
    }else{
        return false;
    }
}
