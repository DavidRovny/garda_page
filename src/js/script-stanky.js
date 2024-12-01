
//FORMULAR STANKY

function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('stanek').value;
    var message = document.getElementById('message').value;

    // Regex pro email
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Regex pro české telefonní číslo (nepovinné pole)
    var phonePattern = /^(\+420)?[0-9]{9}$/;

    if (!emailPattern.test(email)) {
        alert("Prosím, zadejte platný email.");
        return false;
    }

    if (phone && !phonePattern.test(phone)) {
        alert("Prosím, zadejte platné české telefonní číslo.");
        return false;
    }

    if (message.length > 1200) {
        alert("Je to moc dlouhý, zkratě to prosím.");
        return false;
    }

    return true;
};

