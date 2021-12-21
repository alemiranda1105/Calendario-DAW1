const URL = "https://calendario-daw1.herokuapp.com/api/v1/";

async function getUsers() {
    let token = getToken();
    let result;
    try{
        result = await $.ajax({
        url: `${URL}users?token=${token}`,
        type: 'GET',
        success: function(res) {
            result = res;
        },
        error: function() {
            console.error("No es posible completar la operación");
        }
    });
    return result;
    }catch(error){
        console.error(error);
    }
}

//@param id: token unico de cada user
async function getUserById(id) {
    let token = getToken();
    let result;
    try{
        result = await $.ajax({
        url: `${URL}users/${id}?token=${token}`,
        type: 'GET',
        success: function(res) {
            result = res;
        },
        error: function() {
            console.error("No es posible completar la operación");
        }
    });
    return result;
    }catch(error){
        console.error(error);
    }
}

async function getUserByUsername(username) {
    let token = getToken();
    let result;
    try{
        result = await $.ajax({
        url: `${URL}users?username=${username}&token=${token}`,
        type: 'GET',
        success: function(res) {
            result = res;
        },
        error: function() {
            console.error("No es posible completar la operación");
        }
    });
    return result;
    }catch(error){
        console.error(error);
    }
}

async function getCurrentUser() {
    let result;
    if(!sessionStorage.user || !getToken()) {
        window.location.href = "/index.html";
    }
    let user = JSON.parse(sessionStorage.user);
    let token = getToken();
    let key = user.id;
    if(key && token){
        try{
            result = await $.ajax({
            url: `${URL}users/${key}?token=${token}`,
            type: 'GET',
            success: function(res) {
                result = res;
            },
            error: function() {
                console.error("No es posible completar la operación");
            }
        });
        return result;
        }catch(error){
            console.error(error);
        }
    } else {
        // EN CASO DE QUE BORREN LA KEY, REDIRIGIR AL LOGIN
        sessionStorage.removeItem('user');
        document.cookie = 'token=;';
        window.location.href = "/index.html";
    }
}

async function getGroups() {
    let token = getToken();
    let result;
    try{
        result = await $.ajax({
        url: `${URL}groups?token=${token}`,
        type: 'GET',
        success: function(res) {
            result = res.data;
        },
        error: function() {
            console.error("No es posible completar la operación");
        }
    });
    return result;
    }catch(error){
        console.error(error);
    }
}

//@param id: identificador unico de cada grupo
async function getGroupById(id) {
    let token = getToken();
    let result;
    try{
        result = await $.ajax({
        url: `${URL}groups/${id}?token=${token}`,
        type: 'GET',
        success: function(res) {
            result = res;
        },
        error: function() {
            console.error("No es posible completar la operación");
        }
    });
    return result;
    }catch(error){
        console.error(error);
    }
}

async function getUserEvents(user) {
    let token = getToken();
    let result = [];
  
    try {
        await $.ajax({
            url: `${URL}event?owner_id=${user.id}&token=${token}`,
            type: 'GET',
            success: function(res) {
                result = res
            },
            error: function() {
                console.error("No ha sido posible completar la operación");
            }
        });
        
        result.sort((a, b) => {
            let d1 = a.date.split('-').reverse().join('');
            let d2 = b.date.split('-').reverse().join('');

            return d1.localeCompare(d2);
        });
        result.forEach(event => {
            event.uuid = uuid();
        });
        return result;
    } catch(error) {
        console.error(error);
    }
}


// Generador de IDs
function uuid() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function getToken() {
    let name = "token=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}