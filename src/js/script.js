//GALERIE

var galleryImages = {
    1: [
        'assets/placeholder_1x1.png',
        'assets/placeholder_1x1_2.png',
        'assets/placeholder_1x1_3.png'
    ],
    2: [
        'assets/placeholder_1x1_4.png',
        'assets/placeholder_1x1_5.png',
        'assets/placeholder_1x1_6.png'
    ],
    3: [
        'assets/placeholder_1x1_7.png',
        'assets/placeholder_1x1_8.png',
        'assets/placeholder_1x1_9.png'
    ]
};

var currentGallery = 1;
var currentIndex = {
    1: 0,
    2: 0,
    3: 0
};

function showImage(galleryId, index) {
    var galleryImage = document.getElementById('gallery-image-' + galleryId);
    var overlayImage = document.getElementById('overlay-image');
    currentIndex[galleryId] = index;

    galleryImage.src = galleryImages[galleryId][currentIndex[galleryId]];
    overlayImage.src = galleryImages[galleryId][currentIndex[galleryId]];
}

function nextImage(galleryId) {
    currentIndex[galleryId] = (currentIndex[galleryId] + 1) % galleryImages[galleryId].length;
    showImage(galleryId, currentIndex[galleryId]);
}

function prevImage(galleryId) {
    currentIndex[galleryId] = (currentIndex[galleryId] - 1 + galleryImages[galleryId].length) % galleryImages[galleryId].length;
    showImage(galleryId, currentIndex[galleryId]);
}

function openOverlay(galleryId) {
    currentGallery = galleryId;
    var overlay = document.getElementById('gallery-overlay');
    overlay.style.display = 'flex';
    showImage(galleryId, currentIndex[galleryId]);
}

function closeOverlay() {
    var overlay = document.getElementById('gallery-overlay');
    overlay.style.display = 'none';
}

// Zavření overlaye při kliknutí mimo
document.getElementById('gallery-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeOverlay();
    }
});

// Otevření overlay po kliknutí na obrázek v galerii
document.querySelectorAll('.gallery-image-container img').forEach(function (img, index) {
    img.addEventListener('click', function () {
        openOverlay(index + 1);
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


