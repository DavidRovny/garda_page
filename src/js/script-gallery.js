// Obrázky pro každou galerii
var galleryImages = {
    1: [
        'assets/placeholder_1x1.png',
        'assets/placeholder_1x1_2.png',
        'assets/placeholder_1x1_3.png',
        'assets/placeholder_1x1_4.png',
        'assets/placeholder_1x1_5.png',
        'assets/placeholder_1x1_6.png',
        'assets/placeholder_1x1_7.png',
        'assets/placeholder_1x1_8.png',
        'assets/placeholder_1x1_9.png'
    ],
};

// Proměnné pro aktuální galerii a index
var currentGallery = null;
var currentIndex = null;

// Přepnutí na další obrázek
function nextImage(galleryId) {
    var gallery = galleryId || currentGallery;
    if (gallery !== null) {
        var nextIndex = (currentIndex + 1) % galleryImages[gallery].length;
        currentIndex = nextIndex;
        updateOverlayImage(gallery, nextIndex);
    }
}

// Přepnutí na předchozí obrázek
function prevImage(galleryId) {
    var gallery = galleryId || currentGallery;
    if (gallery !== null) {
        var prevIndex = (currentIndex - 1 + galleryImages[gallery].length) % galleryImages[gallery].length;
        currentIndex = prevIndex;
        updateOverlayImage(gallery, prevIndex);
    }
}

// Otevření overlaye
function openOverlay(galleryId, index) {
    var overlay = document.getElementById('gallery-overlay');
    overlay.style.display = 'flex';

    // Nastavení aktuální galerie a indexu
    currentGallery = galleryId;
    currentIndex = index;

    // Zobrazení aktuálního obrázku v overlay
    updateOverlayImage(galleryId, index);
}

// Aktualizace obrázku v overlay
function updateOverlayImage(galleryId, index) {
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


 // YouTube Player API Script
 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 var player;

 // Callback to initialize YouTube player
 function onYouTubeIframeAPIReady() {
     player = new YT.Player('youtube-video', {
         height: '450',
         width: '100%',
         videoId: 'qVGFDn-oT5Q', // ID videa z YouTube
         playerVars: {
             autoplay: 0,
             controls: 1,
             mute: 1,
         },
     });
 }

 // Event handlers for custom buttons
 document.getElementById('play-button').addEventListener('click', function () {
     player.playVideo();
 });

 document.getElementById('pause-button').addEventListener('click', function () {
     player.pauseVideo();
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