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
    console.log("updateImages called for gallery:", galleryId, "with index:", index);
    var galleryImage = document.getElementById('gallery-image-' + galleryId);
    if (galleryImage) {
        galleryImage.src = galleryImages[galleryId][index];
        console.log("Updated gallery image on page to:", galleryImages[galleryId][index]);
    } else {
        console.error("Gallery image element not found for ID:", galleryId);
    }

    if (currentGallery === galleryId) {
        var overlayImage = document.getElementById('overlay-image');
        overlayImage.src = galleryImages[galleryId][index];
        console.log("Updated overlay image to:", galleryImages[galleryId][index]);
    }

    galleryIndexes[galleryId] = index;
    currentGallery = galleryId;
    currentIndex = index;
}

// Přepnutí na další obrázek
function nextImage(galleryId) {
    console.log("nextImage called for gallery:", galleryId);
    var gallery = galleryId || currentGallery;
    if (gallery !== null) {
        var nextIndex = (galleryIndexes[gallery] + 1) % galleryImages[gallery].length;
        console.log("Next index:", nextIndex);
        updateImages(gallery, nextIndex);
    }
}

// Přepnutí na předchozí obrázek
function prevImage(galleryId) {
    console.log("prevImage called for gallery:", galleryId);
    var gallery = galleryId || currentGallery;
    if (gallery !== null) {
        var prevIndex = (galleryIndexes[gallery] - 1 + galleryImages[gallery].length) % galleryImages[gallery].length;
        console.log("Previous index:", prevIndex);
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
        var src = img.src; // Celá cesta k obrázku
        var index = galleryImages[galleryId].findIndex((imagePath) => {
            // Porovnáváme celé cesty
            return src.includes(imagePath);
        });

        if (index !== -1) {
            openOverlay(parseInt(galleryId), index);
        } else {
            console.error("Obrázek nebyl nalezen v poli galleryImages.");
        }
    });
});

// VIDEO
document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("my-video");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const playPauseIcon = document.getElementById("play-pause-icon");
    let isAutoplayTriggered = false;
    let isManuallyPaused = false;

    // Toggle play/pause logic
    function togglePlayPause() {
        if (video.paused || video.ended) {
            video.play();
            isManuallyPaused = false; // Reset manual pause
            playPauseIcon.className = "fas fa-pause"; // Change to pause icon
        } else {
            video.pause();
            isManuallyPaused = true; // Set manual pause
            playPauseIcon.className = "fas fa-play"; // Change to play icon
        }
    }

    // Play/Pause button functionality
    playPauseBtn.addEventListener("click", togglePlayPause);

    // Click-to-Toggle on Video
    video.addEventListener("click", togglePlayPause);

    // Handle scroll behavior (same as earlier)
    function isVideoInViewport() {
        const rect = video.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        if (isVideoInViewport()) {
            if (!isManuallyPaused && (!isAutoplayTriggered || video.paused)) {
                video.play();
                isAutoplayTriggered = true; // Mark autoplay as triggered
                playPauseIcon.className = "fas fa-pause";
            }
        } else {
            if (!video.paused) {
                video.pause();
                playPauseIcon.className = "fas fa-play";
            }
        }
    }

    window.addEventListener("scroll", handleScroll);
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

// FORMULAR OBECNY

function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;

    // Regex pro email a telefonní číslo
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var phonePattern = /^(\+420)?[0-9]{9}$/;

    // Validace povinných polí
    if (!name || !email || !message) {
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