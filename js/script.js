//GALERIE

// Obrázky pro každou galerii
var galleryImages = {
    1: [
        'assets/placeholder_1x1.png',
        'assets/placeholder_1x1_2.png',
        'assets/placeholder_1x1_3.png',
        'assets/placeholder_1x1_4.png'
    ],
    2: [
        'assets/drakkar/drakkar_01.jpg',
        'assets/drakkar/drakkar_02.jpg',
        'assets/drakkar/drakkar_03.jpg',
        'assets/drakkar/drakkar_04.jpg'
    ],
    3: [
        'assets/sin/sin_1.jpg',
        'assets/sin/sin_2.jpg',
        'assets/sin/sin_3.jpg',
        'assets/sin/sin_4.jpg'
    ]
};

// Proměnné pro aktuální galerii a index
var currentGallery = null;
var currentIndex = null;

// Lokální indexy pro každou galerii na stránce
var galleryIndexes = {
    1: 0,
    2: 0,
    3: 0
};

// Funkce pro synchronizaci obrázků na stránce i v overlay
function updateImages(galleryId, index) {
    // Aktualizace obrázku na stránce
    var galleryImage = document.getElementById('gallery-image-' + galleryId);
    galleryImage.src = galleryImages[galleryId][index];

    // Pokud je otevřený overlay, aktualizuj i obrázek v overlay
    if (currentGallery === galleryId) {
        var overlayImage = document.getElementById('overlay-image');
        overlayImage.src = galleryImages[galleryId][index];
    }

    // Aktualizace indexů
    galleryIndexes[galleryId] = index;
    currentGallery = galleryId;
    currentIndex = index;
}

// Přepnutí na další obrázek
function nextImage(galleryId) {
    var gallery = galleryId || currentGallery;
    if (gallery !== null) {
        var nextIndex = (galleryIndexes[gallery] + 1) % galleryImages[gallery].length;
        updateImages(gallery, nextIndex);
    }
}

// Přepnutí na předchozí obrázek
function prevImage(galleryId) {
    var gallery = galleryId || currentGallery;
    if (gallery !== null) {
        var prevIndex = (galleryIndexes[gallery] - 1 + galleryImages[gallery].length) % galleryImages[gallery].length;
        updateImages(gallery, prevIndex);
    }
}

// Otevření overlaye
function openOverlay(galleryId, index) {
    var overlay = document.getElementById('gallery-overlay');
    overlay.style.display = 'flex';

    // Inicializace indexu, pokud nebyl nastaven
    if (galleryIndexes[galleryId] === undefined) {
        galleryIndexes[galleryId] = index;
    }

    // Nastavení aktuální galerie a indexu
    currentGallery = galleryId;
    currentIndex = index;

    // Zobrazení aktuálního obrázku v overlay
    var overlayImage = document.getElementById('overlay-image');
    overlayImage.src = galleryImages[galleryId][index];
}

// Zavření overlaye
function closeOverlay() {
    var overlay = document.getElementById('gallery-overlay');
    overlay.style.display = 'none';
    currentGallery = null;
    currentIndex = null;
}

// Zavření overlaye při kliknutí mimo něj
document.getElementById('gallery-overlay').addEventListener('click', function (event) {
    if (event.target === this) {
        closeOverlay();
    }
});

// Přidání událostí kliknutí na obrázky v galerii
document.querySelectorAll('.gallery-image-container img').forEach(function (img) {
    img.addEventListener('click', function () {
        var galleryId = img.id.split('-')[2]; // Extrahování ID galerie z ID obrázku
        var src = img.src.split('/').pop(); // Získání aktuálního obrázku
        var index = galleryImages[galleryId].indexOf('assets/' + src); // Získání indexu
        openOverlay(parseInt(galleryId), index);
    });
});


//NAVIGACE

function toggleNavbar() {
    var menu = document.getElementById('navbar-menu');
    menu.classList.toggle('open');
}

// Zavření menu při kliknutí mimo
document.addEventListener('click', function(event) {
    var menu = document.getElementById('navbar-menu');
    var toggleButton = document.querySelector('.navbar-toggle');

    // Kontrola, zda bylo kliknuto mimo menu a tlačítko
    if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
        menu.classList.remove('open');
    }
});

//FORMULAR

function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
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

