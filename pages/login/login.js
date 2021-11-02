var { user, email, pass } = "";

const userTxt = document.getElementById('user');
const emailTxt = document.getElementById('email');
const passTxt = document.getElementById('password');
const showPassword = document.getElementById('showPassword');

showPassword.addEventListener('click', (e) => {
    if(passTxt.type === "password") {
        passTxt.type = "text";
    } else {
        passTxt.type = "password";
    }
})

userTxt.addEventListener('change', (e) => {
    e.preventDefault();
    const letters = /^[a-zA-Z0-9]+$/;
    if(!e.target.value.match(letters)) {
        alert("Por favor, escriba solo letras y números");
    } else {
        user = e.target.value;
    }
});

if(emailTxt !== null) {
    emailTxt.addEventListener('change', (e) => {
        e.preventDefault();
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!e.target.value.match(re)) {
            alert("Escriba un mail válido");
        } else {
            email = e.target.value;
        }
    });
}

passTxt.addEventListener('change', (e) => {
    e.preventDefault();
    pass = e.target.value;
});

$('#loginForm').submit((e) => {
    e.preventDefault();

    const data = {
        "user": user,
        "email": email,
        "password": pass
    };

    $.post("url", {
        data: data
    },
    function(d, status) {
        alert("Data: " + d + "\nStatus: " + status);
    });

});