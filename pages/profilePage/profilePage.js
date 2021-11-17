
let name = document.getElementById("name");
let email = document.getElementById("email");
let lista = document.getElementById("friendBody");
let divNoFriends = document.getElementById("divNoFriends");

getCurrentUser().then((user) =>{
    name.innerHTML = user.username;
    email.innerHTML = user.email;

    for(let i = 0; i<user.friends.length; i++){
        getUserById(user.friends[i]).then(friend =>{
            lista.innerHTML += ` 
                        <div class="friendComponent d-flex flex-column justify-content-center align-items-center">
                            <img class="imgFriend" src="/img/avatar.png" alt="">
                            <p onclick="view(${friend.id})" class="dataProfileTxt">${friend.username}</p>
                        </div> 
                        `
            ;
        });
    };
});

function view(id){
    localStorage.setItem('id', id);
    localStorage.setItem('url', "/pages/profilePage/profilePage.html");
    window.location.href = "/pages/friendProfilePage/friendProfilePage.html";
}
