const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYmVsdSIsImlhdCI6MTYwNjg1NTM1MH0.RVZo8ClYrQZfwolfHvaHVkRXYWJ0o7WkAbX-Wm6c93k";

function loginUser(){

fetch('http://example_website.com/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        email: document.getElementById("email").value,
         password: document.getElementById("password").value
        })
    })
.then(data => data.json())
.headersthen(data =>  { 

    if(data.response){
        redirect: window.location.replace("../ejemplo/home.html") 
    } else{
        alert("Username o Password invalidos!");
    }
}) 
.catch((err) => {
    console.error(err);
})
}