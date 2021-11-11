const URL = "http://localhost:8000/";

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

<<<<<<< HEAD
async function getUsers() {
=======
export async function getUsers() {
>>>>>>> cb5b462c7e5031b3f298144e1a8625920ae24723
    let result;
    try{
        result = await $.ajax({
        url: `${URL}users`,
<<<<<<< HEAD
=======
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
export async function getUserById(id) {
    let result;
    try{
        result = await $.ajax({
        url: `${URL}users/${id}`,
>>>>>>> cb5b462c7e5031b3f298144e1a8625920ae24723
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

async function getCurrentUser() {
    let result;
    if(!sessionStorage.user) {
        window.location.href = "http://127.0.0.1:5500/pages/login/login.html";
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

<<<<<<< HEAD
async function getGroups() {
=======
export async function getGroups() {
>>>>>>> cb5b462c7e5031b3f298144e1a8625920ae24723
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
<<<<<<< HEAD
async function getGroupById(id) {
=======
export async function getGroupById(id) {
>>>>>>> cb5b462c7e5031b3f298144e1a8625920ae24723
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
<<<<<<< HEAD
}
=======
}

>>>>>>> cb5b462c7e5031b3f298144e1a8625920ae24723
