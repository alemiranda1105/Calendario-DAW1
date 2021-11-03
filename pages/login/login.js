var { user, email, pass } = "";

const userTxt = document.getElementById('user');
const emailTxt = document.getElementById('email');
const passTxt = document.getElementById('password');
const showPassword = document.getElementById('showPassword');

const URL = "http://localhost:8000/users";

if(showPassword !== null) {
    showPassword.addEventListener('click', (e) => {
        if(passTxt.type === "password") {
            passTxt.type = "text";
        } else {
            passTxt.type = "password";
        }
    });
}

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

if(passTxt !== null) {
    passTxt.addEventListener('change', (e) => {
        e.preventDefault();
        pass = e.target.value;
    });
}

$('#signUpForm').submit((e) => {
    e.preventDefault();

    const data = {
        "user": user,
        "email": email,
        "password": pass
    };

    /*fetch("url", {
        method: 'POST',
        body: data
    })
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            const errorTxt = document.getElementById("errorTxt");
            errorTxt.innerText = data.error;
            errorTxt.style.display = "block";
        } else {
            // Crear JWT ¿?
            window.location.href = "/pages/HomePage/homePage.html";
        }
    }
    });*/
    window.location.href = "/pages/HomePage/homePage.html";
    
});

$('#loginForm').submit((e) => {
    e.preventDefault();

    const data = {
        "user": user,
        "email": email,
        "password": pass
    };

    console.log(user, pass);
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        for(const [key, value] of Object.entries(data)) {
            if(value.username === user && value.password === pass) {
                window.location.href = "/pages/HomePage/homePage.html/";
                return;
            }
        }
        throw 'Usuario y/o contraseña incorrecta';
    })
    .catch((error) => {
        const errorTxt = document.getElementById("errorTxt");
        errorTxt.innerText = error;
        errorTxt.style.display = "block";
    });
});