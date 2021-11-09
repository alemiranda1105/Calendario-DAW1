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

//@param: jwt es el token unico de cada user
export async function getUser(jwt) {
    let result;
    try{
        result = await $.ajax({
        url: `${URL}users/${jwt}`,
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



