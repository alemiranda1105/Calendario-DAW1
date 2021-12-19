var { user, email, pass } = "";

const userTxt = document.getElementById('user');
const emailTxt = document.getElementById('email');
const passTxt = document.getElementById('password');
const showPassword = document.getElementById('showPassword');

function storeSession(data) {
    data.password = "";
    sessionStorage.setItem('user', JSON.stringify(data));
}

function storeCookie(token) {
    document.cookie = "token=" + token;
}

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
        username: user,
        email: email,
        password: pass,
    };
    fetch(URL + "users", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        storeCookie(data.session.token);
        getUserByUsername(data.user.username).then(user => {
            storeSession(user);
            window.location.href = "/pages/HomePage/homePage.html";
        });
    });
    return false;
    
});



$('#loginForm').submit((e) => {
    e.preventDefault();

     /*CAMBIAR CUANDO EL BACKEND ESTÉ TERMINADO
       NO ES SEGURO ESTE METODO*/
    
    fetch("http://localhost:8000/users")
    .then(res => res.json())
    .then(data => {
        data = data.filter((user) => {
            return (user.username === this.user && user.password === this.pass);
        });
        if(data.length < 1) {
            throw 'Usuario y/o contraseña incorrecta';
        }
        storeSession(data);
        window.location.href = "/pages/HomePage/homePage.html";
    })
    .catch((error) => {
        const errorTxt = document.getElementById("errorTxt");
        errorTxt.innerText = error;
        errorTxt.style.display = "block";
    });
});