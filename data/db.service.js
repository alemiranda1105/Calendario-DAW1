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
