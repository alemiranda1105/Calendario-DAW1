/** 
*/
let name = document.getElementById("name");
let email = document.getElementById("email");
let lista = document.getElementById("friendBody");
let divNoFriends = document.getElementById("divNoFriends");

getCurrentUser().then((user) =>{
    name.innerHTML = user.username;
    email.innerHTML = user.email;

    if(user.friends.length > 0 ){
        
        for(let i = 0; i<user.friends.length; i++){
            getUserById(user.friends[i]).then(friend =>{
                lista.innerHTML += ` 
                            <div class="friendComponent d-flex flex-column justify-content-center align-items-center">
                                <img class="imgFriend" src="/img/avatar.png" alt="">
                                <p class="dataProfileTxt">${friend.username}</p>
                            </div> 
                            `;
            });
        };
    }else{
        divNoFriends.innerHTML = ` 
                            <div class="d-flex justify-content-center align-items-center">
                                <p class="txtNoFriends">Aún no tienes ningún amigo agregado. Empieza a agregar a tus amigos 
                                y comiencen a de manera fácil y divertida en un solo click</p>
                            </div> 
                            `;
    }
    /*
    for(let i = friendRequests.length-1; i>=0; i--){
        getUserById(friendRequests[i]).then(users =>{
            user.id = users.id;
            user.username = users.username;
            console.log(user.id, user.username);
            
            lista.innerHTML += ;

        }); 
    };*/
});