const URL = "http://localhost:8080/";

export async function getData(ruta) {
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

export async function getUsers() {
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
export async function getUserById(id) {
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

export async function getCurrentUser() {
    let result;
    let key = localStorage.getItem("key");
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
    }
}

export async function getGroups() {
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
export async function getGroupById(id) {
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

