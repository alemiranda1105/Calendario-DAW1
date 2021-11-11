/** 
*/
let name = document.getElementById("name");
let email = document.getElementById("email");
let lista = document.getElementById("friendBody");

getCurrentUser().then((user) =>{
    console.log(user.username);
    console.log(user.email);
    console.log(user.id);
    console.log(user.friends);
    name.innerHTML = user.username;
    email.innerHTML = user.email;

    for(let i = 0; i<user.friends.length; i++){
        getUserById(user.friends[i]).then(friend =>{
            lista.innerHTML += ` 
                        <div class="friendComponent d-flex flex-column justify-content-center align-items-center">
                            <img class="imgFriend" src="/img/avatar.png" alt="">
                            <p class="dataProfileTxt">${friend.username}</p>
                        </div> 
                        `
            ;
        });
    };
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