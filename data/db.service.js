const URL = "http://localhost:3000/api/v1/";

async function getData(ruta) {
    let result;
    try{
        result = await $.ajax({
        url: `${URL}${ruta}`,
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

async function getUsers() {
    let result;
    try{
        result = await $.ajax({
        url: `${URL}users`,
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
    let result;
    try{
        result = await $.ajax({
        url: `${URL}users/${id}`,
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
    if(!sessionStorage.user) {
        window.location.href = "http://127.0.0.1:5500/pages/index/index.html";
    }
    let user = JSON.parse(sessionStorage.user)[0];
    let key = user.id;
    if(key){
        try{
            result = await $.ajax({
            url: `${URL}users/${key}`,
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
    }else {
        // EN CASO DE QUE BORREN LA KEY, REDIRIGIR AL LOGIN
        sessionStorage.removeItem('user');
    }
}

async function getGroups() {
    let result;
    try{
        result = await $.ajax({
        url: `${URL}groups`,
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

//@param id: identificador unico de cada grupo
async function getGroupById(id) {
    let result;
    try{
        result = await $.ajax({
        url: `${URL}groups/${id}`,
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
    let result = [];
    try {
        await $.ajax({
            url: `${URL}groups/`,
            type: 'GET',
            success: function(res) {
                res.forEach(g => {
                    if(g.users.filter(id => id == user.id).length == 1) {
                        g.events.forEach(event => {
                            event.group = g.name;
                            result.push(event);
                        });
                    }
                });
            },
            error: function() {
                console.error("No ha sido posible completar la operación");
            }
        });
        user.events.forEach(event => {
            result.push(event);
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
    let cookies = document.cookie;
    return cookies.split("=")[1];
}