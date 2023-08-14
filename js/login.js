const checkbox = document.querySelector('#passCheck');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const login = document.querySelector('.login');
const submit = document.querySelector('#submit');
login.addEventListener('change',(e)=>{
    if(e.target.checked){
        password.type = "text";
    }else{
        password.type = "password";
    }
})
let getSingleUser = "";
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    const userEmail = email.value;
    // window.location.href="main.html";
    getSingleUser= `http://localhost:8080/api/v3/getUser/${userEmail}`;

    console.log(getSingleUser);

    function getUser(data) {
        
    }
})

// fetch()