
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

// Funkce pro zobrazení úspěšného pop-upu
function showSuccessPopup() {
    document.getElementById('popup-success').style.display = 'flex';
}

// Funkce pro zobrazení pop-upu s chybou
function showErrorPopup() {
    document.getElementById('popup-error').style.display = 'flex';
}

// Přesměrování na hlavní stránku
function redirectToHomepage() {
    window.location.href = 'homepage.html'; // Změňte na správnou URL
}

// Simulace odeslání formuláře
function handleSubmit(event) {
    event.preventDefault(); // Zabraňte výchozímu odeslání formuláře

    // Simulace výsledku odeslání
    const success = Math.random() > 0.5; // Simulace úspěchu nebo chyby (pouze pro ukázku)
    
    if (success) {
        showSuccessPopup();
    } else {
        showErrorPopup();
    }
}