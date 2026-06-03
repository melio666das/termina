// Lógica para alternar tema oscuro (botón flotante) 
/* =========================
   🌙 MODO OSCURO
========================= */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // cambia el icono
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});

/* =========================
   🎤 BOTÓN FLOTANTE "ESCUCHAR"
========================= */
const listenBtn = document.getElementById("listenBtn");
const playerContainer = document.getElementById("playerContainer");

listenBtn.addEventListener("click", () => {
    listenBtn.classList.add("disappearing");
    
    setTimeout(() => {
        listenBtn.style.display = "none";
        playerContainer.classList.remove("hidden");
        playerContainer.classList.add("appearing");
        playerContainer.style.animation = "slideInUp 0.5s ease";
        
        setTimeout(() => {
            playerContainer.classList.remove("appearing");
        }, 500);
    }, 300);
});

document.getElementById("closePlayer").addEventListener("click", () => {
    playerContainer.classList.add("disappearing");
    
    setTimeout(() => {
        playerContainer.classList.add("hidden");
        playerContainer.classList.remove("disappearing");
        listenBtn.style.display = "flex";
        listenBtn.classList.remove("disappearing");
    }, 300);
});

/* =========================
   🎤 MOVER REPRODUCTOR
========================= */
const player = document.getElementById("playerContainer");
let isGrabbed = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

// Detectar si es mobile
const isMobile = () => window.innerWidth <= 768;

player.addEventListener("mousedown", (e) => {
    if (e.target.closest(".player-close-btn") || e.target.closest(".mfp-controls button")) {
        return;
    }
    
    // Solo permitir movimiento en desktop
    if (isMobile()) return;
    
    isGrabbed = true;
    player.classList.add("grabbed");
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
});

player.addEventListener("touchstart", (e) => {
    if (e.target.closest(".player-close-btn") || e.target.closest(".mfp-controls button")) {
        return;
    }
    
    // Solo permitir movimiento si NO es mobile o si está en posición alterada
    if (!isMobile() || currentX !== 0 || currentY !== 0) {
        isGrabbed = true;
        player.classList.add("grabbed");
        startX = e.touches[0].clientX - currentX;
        startY = e.touches[0].clientY - currentY;
    }
});

document.addEventListener("mousemove", (e) => {
    if (!isGrabbed || isMobile()) return;
    
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    
    player.style.position = "fixed";
    player.style.transform = `translate(${currentX}px, ${currentY}px)`;
    player.style.right = "auto";
    player.style.bottom = "auto";
    player.style.top = "0";
    player.style.left = "0";
    player.style.zIndex = "10000";
});

document.addEventListener("touchmove", (e) => {
    if (!isGrabbed) return;
    
    if (isMobile() && (currentX === 0 && currentY === 0)) {
        return; // No mover en mobile si está en posición normal
    }
    
    e.preventDefault();
    
    currentX = e.touches[0].clientX - startX;
    currentY = e.touches[0].clientY - startY;
    
    player.style.position = "fixed";
    player.style.transform = `translate(${currentX}px, ${currentY}px)`;
    player.style.right = "auto";
    player.style.bottom = "auto";
    player.style.top = "0";
    player.style.left = "0";
    player.style.zIndex = "10000";
}, { passive: false });

document.addEventListener("mouseup", () => {
    isGrabbed = false;
    player.classList.remove("grabbed");
});

document.addEventListener("touchend", () => {
    isGrabbed = false;
    player.classList.remove("grabbed");
});

/* =========================
   🎮 JUEGO (igual)
========================= */
function jugar() {
  const numero = document.getElementById("numero").value;
  const resultado = document.getElementById("resultado");

  const secreto = Math.floor(Math.random() * 10) + 1;

  if (!numero || numero < 1 || numero > 10) {
    resultado.innerHTML = "⚠️ Ingresa un número del 1 al 10";
    return;
  }

  if (parseInt(numero) === secreto) {
    resultado.innerHTML = "🎉 ¡Ganaste!";
  } else {
    resultado.innerHTML = "❌ Era " + secreto;
  }
}
let audio = document.getElementById("audio");
let current = 0;
let isPlaying = false;
let isRepeat = false;
let playlistOpen = false;

const playlist = [
        {
        title: "musica 1",
        artist: "no sirve",
        src: "musica.mp3",
        cover: "musica/cover1.jpg"
    },
        {
        title: "coqueta",
        artist: "Fuerza Regida y Grupo Frontera",
        src: "coqueta.mp3",
        cover: "musica/cover2.jpg"
    },
    {
        title: "Chicago",
        artist: "Michael",
        src: "chicago.mp3",
        cover: "musica/cover3.jpg"
    },
    {
        title: "Morena",
        artist: "Los Felinos",
        src: "morena.mp3",
        cover: "musica/cover4.jpg"
    },
    {
        title: "Happy",
        artist: "Turles",
        src: "happy.mp3",
        cover: "musica/cover5.jpg"
    },
    {
        title: "Tu Falta De Querer",
        artist: "Mon Laferte",
        src: "falta.mp3",
        cover: "musica/cover6.jpg"
    },
    {
        title: "Si Tú Me Quisieras",
        artist: "Mon Laferte",
        src: "tu.mp3",
        cover: "musica/cover7.jpg"
    },
    {
        title: "Viento",
        artist: "Caifanes",
        src: "viento.mp3",
        cover: "musica/cover8.jpg"
    },
    {
        title: "Afuera",
        artist: "Caifanes",
        src: "afuera.mp3",
        cover: "musica/cover9.jpg"
    },
    {
        title: "La Célula Que Explota",
        artist: "Caifanes",
        src: "celula.mp3",
        cover: "musica/cover10.jpg"
    },
    {
        title: "Los Dioses Ocultos",
        artist: "Caifanes",
        src: "dioses.mp3",
        cover: "musica/cover11.jpg"
    },
    {
        title: "No Dejes Que...",
        artist: "Caifanes",
        src: "dejes.mp3",
        cover: "musica/cover12.jpg"
    },
    {
        title: "Tu Falta De Querer",
        artist: "Mon Laferte",
        src: "falta.mp3",
        cover: "musica/cover13.jpg"
    },{
        title: "Frances Limon",
        artist: "Enanitos Verdes",
        src: "frances.mp3",
        cover: "musica/cover14.jpg"
    },
    {
        title: "Amiga Mia",
        artist: "Michel Del Buenon",
        src: "amiga.mp3",
        cover: "musica/cover15.jpg"
    },
];

/* =========================
   LOAD TRACK
========================= */
function loadTrack(){
    const t = playlist[current];

    audio.src = t.src;
    audio.load();

    document.getElementById("title").textContent = t.title;
    document.getElementById("artist").textContent = t.artist;

    const coverEl = document.getElementById("cover");
    // reset
    coverEl.style.backgroundImage = '';
    coverEl.textContent = '🎵';

    // Preload cover image and set only on successful load; fallback to emoji on error
    if (t.cover) {
        const img = new Image();
        img.onload = () => {
            coverEl.style.backgroundImage = `url(${t.cover})`;
            coverEl.textContent = '';
        };
        img.onerror = () => {
            console.warn('Cover failed to load:', t.cover);
            coverEl.style.backgroundImage = '';
            coverEl.textContent = '🎵';
        };
        img.src = t.cover;
    } else {
        coverEl.style.backgroundImage = '';
        coverEl.textContent = '🎵';
    }

    playMusic();
}

/* =========================
   PLAY / PAUSE
========================= */
function toggleMusic(){
    if(audio.paused){
        playMusic();
    }else{
        audio.pause();
        isPlaying = false;
        updateUI();
    }
}

function playMusic(){
    audio.play();
    isPlaying = true;
    updateUI();
}

/* =========================
   NEXT / PREV
========================= */
function nextTrack(){
    current = (current + 1) % playlist.length;
    loadTrack();
}

function prevTrack(){
    current = (current - 1 + playlist.length) % playlist.length;
    loadTrack();
}

/* =========================
   REPEAT
========================= */
function toggleRepeat(){
    isRepeat = !isRepeat;
    document.getElementById("repeat").style.opacity = isRepeat ? "1" : "0.4";
}

/* =========================
   LISTA
========================= */
function toggleList(){
    playlistOpen = !playlistOpen;

    const panel = document.getElementById("playlistPanel");

    if(!playlistOpen){
        panel.classList.add("hidden");
        return;
    }

    panel.classList.remove("hidden");
    panel.innerHTML = "";

    playlist.forEach((t,i)=>{
        const btn = document.createElement("button");
        btn.textContent = `${t.title} - ${t.artist}`;

        if(i === current){
            btn.style.background = "#b26bff";
        }

        btn.onclick = () => {
            current = i;
            loadTrack();
        };

        panel.appendChild(btn);
    });
}

/* =========================
   PROGRESO
========================= */
setInterval(()=>{
    if(!audio.duration) return;

    document.getElementById("fill").style.width =
        (audio.currentTime / audio.duration) * 100 + "%";

    document.getElementById("cur").textContent = format(audio.currentTime);
    document.getElementById("dur").textContent = format(audio.duration);

},500);

function format(s){
    let m = Math.floor(s/60);
    let sec = Math.floor(s%60);
    return `${m}:${sec<10?"0":""}${sec}`;
}

/* =========================
   BARRA CLICK (ADELANTAR)
========================= */
document.getElementById("bar").addEventListener("click",(e)=>{
    const percent = e.offsetX / e.currentTarget.offsetWidth;
    audio.currentTime = percent * audio.duration;
});

/* =========================
   BOTONES
========================= */
document.getElementById("play").onclick = toggleMusic;
document.getElementById("next").onclick = nextTrack;
document.getElementById("prev").onclick = prevTrack;
document.getElementById("repeat").onclick = toggleRepeat;
document.getElementById("list").onclick = toggleList;

/* =========================
   AUTO NEXT / REPEAT
========================= */
audio.addEventListener("ended",()=>{
    if(isRepeat){
        playMusic();
    }else{
        nextTrack();
    }
});

/* =========================
   UI UPDATE (SPOTIFY PRO FIX)
========================= */
function updateUI(){

    const playBtn = document.getElementById("play");
    const cover = document.getElementById("cover");

    playBtn.textContent = isPlaying ? "⏸" : "▶";

    if(isPlaying){
        cover.classList.add("rotating");
    }else{
        cover.classList.remove("rotating");
    }

    document.getElementById("title").textContent = playlist[current].title;
    document.getElementById("artist").textContent = playlist[current].artist;
}

/* =========================
   INIT
========================= */
loadTrack();

// Asegura que haya una sección activa al cargar la página
if (!document.querySelector('.seccion.activa')) {
    const primeraSeccion = document.querySelector('.seccion');
    if (primeraSeccion) {
        primeraSeccion.classList.add('activa');
    }
}

/* =========================
   IMAGEN ROTATIVA EN INICIO
   ========================= */
const inicioImg = document.getElementById('inicioImg');
const inicioImages = [
    'https://picsum.photos/seed/paisaje1/800/400',
    'https://picsum.photos/seed/paisaje2/800/400',
    'https://picsum.photos/seed/paisaje3/800/400',
    'https://picsum.photos/seed/paisaje4/800/400'
];
let inicioIndex = 0;

function changeInicioImage(){
    if(!inicioImg) return;
    // fade out
    inicioImg.style.opacity = 0;
    setTimeout(()=>{
        inicioIndex = (inicioIndex + 1) % inicioImages.length;
        inicioImg.src = inicioImages[inicioIndex];
        // fade in
        inicioImg.style.opacity = 1;
    }, 600);
}

// Cambia cada 5 segundos
setInterval(changeInicioImage, 5000);

/* =========================
   SECCIONES
========================= */
function mostrarSeccion(seccion){
    document.querySelectorAll(".seccion").forEach(sec=>{
        sec.classList.remove("activa");
    });
    const target = document.getElementById(seccion);
    if (target) {
        target.classList.add("activa");
    }
}

function abrirSeccion(seccion){
    mostrarSeccion(seccion);
    toggleMenu(false);
}

function toggleMenu(forceOpen){
    const sectionMenu = document.getElementById('sectionMenu');
    const isOpen = sectionMenu.classList.contains('open');

    if (forceOpen === false || isOpen) {
        sectionMenu.classList.remove('open');
        return;
    }

    sectionMenu.classList.add('open');
}

const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMenu(true));
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => toggleMenu(false));
}

const sectionItems = document.querySelectorAll('#sectionMenu li');
sectionItems.forEach(item => {
    item.addEventListener('click', () => {
        toggleMenu(false);
    });
});