

// Nastavení cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Použití
setCookie("userConsent", "accepted", 365);


// Načtení cookie
function getCookie(name) {
    var cookies = document.cookie.split('; ');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}


// Odstranění cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



// Kontrola a zobrazení banneru
window.onload = function() {
    if (!getCookie("userConsent")) {
        document.getElementById("cookie-banner").style.display = "block";
    }
};

function acceptCookies() {
    setCookie("userConsent", "accepted", 365);
    document.getElementById("cookie-banner").style.display = "none";
}

function rejectCookies() {
    setCookie("userConsent", "rejected", 365);
    document.getElementById("cookie-banner").style.display = "none";
}