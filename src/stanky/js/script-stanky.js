// FORMULAR STANKY

function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var dropdown = document.getElementById('dropdown').value;
    var stanek = document.getElementById('stanek').value;
    var message = document.getElementById('message').value;

    // Regex pro email a telefonní číslo
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var phonePattern = /^(\+420)?[0-9]{9}$/;

    // Validace povinných polí
    if (!name || !email || !dropdown || !stanek) {
        alert("Prosím, vyplňte všechna povinná pole.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Prosím, zadejte platný e-mail.");
        return false;
    }

    if (phone && !phonePattern.test(phone)) {
        alert("Prosím, zadejte platné české telefonní číslo.");
        return false;
    }

    return true; // Pokud vše projde, formulář se odešle přes PHP
}