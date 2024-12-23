// Obrázky pro každou galerii
var galleryImages = {
    1: [
        'assets/tocnik/tocnik_gallery_19.jpg',
        'assets/tocnik/tocnik_gallery_02.jpg',
        'assets/tocnik/tocnik_gallery_10.jpg',
        'assets/tocnik/tocnik_gallery_01.jpg',
        'assets/tocnik/tocnik_gallery_11.jpg',
        'assets/tocnik/tocnik_gallery_14.jpg',
        'assets/tocnik/tocnik_gallery_08.jpg',
        'assets/tocnik/tocnik_gallery_04.jpg',
        'assets/tocnik/tocnik_gallery_07.jpg',
        'assets/tocnik/tocnik_gallery_15.jpg',
        'assets/tocnik/tocnik_gallery_18.jpg',
        'assets/tocnik/tocnik_gallery_17.jpg',
        'assets/tocnik/tocnik_gallery_16.jpg',
        'assets/tocnik/tocnik_gallery_05.jpg',
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
