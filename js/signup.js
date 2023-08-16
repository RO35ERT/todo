
const formControl = document.querySelector(".form-control");

let erroMsg = document.querySelector('.errorMsg');

const fname = document.querySelector('#fname');
const lname= document.querySelector('#lname');
const email = document.querySelector('#email');
const password = document.querySelector('#password')
const comfirmPass = document.querySelector('#comfirmPass');

formControl.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(fname.value.trim()=="" || lname.value.trim()==""||email.value.trim()=="" || password.value.trim()==""||comfirmPass.value.trim()==""||
    fname.value.trim()==null || lname.value.trim()==null||email.value.trim()==null || password.value.trim()==null||comfirmPass.value.trim()==null
    ){
        erroMsg.innerHTML = "one or more field is empty!";

        return;
    }else{
        if(password.value !==comfirmPass.value){
            erroMsg.innerHTML= "password do not match";
            return;
        }else{
            if(isValidEmail(email.value)){
                erroMsg.innerHTML="";
                const user = "http://localhost:8080/api/v3/createUser";
                saveUser(user);
                window.location.replace("index.html");
            }else{
                erroMsg.innerHTML = "Not a valid email"
            }
        }
    }
})

async function saveUser(url) {
    const response = fetch(url,{
        method: 'POST',
            headers: {
                'Accept':"application/json",
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'firstName':fname.value,
                'lastName':lname.value,
                'email':email.value.toLowerCase(),
                'password':password.value
            })
    })
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}