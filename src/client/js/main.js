

const getStartedButton = document.getElementById('getStartButton');
const Userform = document.getElementById('userForm');

getStartedButton.addEventListener("click", function(event){
    getStartedButton.className = "hideButton";
    Userform.className = "UserDetails"
});