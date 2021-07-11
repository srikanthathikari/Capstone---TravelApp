

const planYourTrip = document.getElementById('getStartButton');
const Userform = document.getElementById('userForm');
const doneButton = document.getElementById('Done');
const headerText = document.getElementById('header1Page1');

planYourTrip.addEventListener("click", function (event) {
    planYourTrip.className = "hideButton";
    Userform.className = "UserDetails"
});

function handleSubmit(event) {
    event.preventDefault();
    let nameValue = document.getElementById('name').value;
    let placeValue = document.getElementById('place').value;
    let dateValue = document.getElementById('date').value;
    headerText.textContent = `There you go ${nameValue}`;
    headerText.className = "spacerForHeader"
    Userform.style.display = "none";
}



