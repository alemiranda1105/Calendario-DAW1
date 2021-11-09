const URL = "http://localhost:8080/users";
function getUsers() {
    $( document ).ready(function() {
        $.ajax({
            url: URL,
            type: 'GET',
            success: function(respuesta) {
                console.log(respuesta);
            },
            error: function() {
                console.error("No es posible completar la operación");
            }
        });
    });
}

getUsers();
