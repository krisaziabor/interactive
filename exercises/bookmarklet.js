var style = document.createElement('style');
style.innerHTML = `
    a, sup, body, body * {
         color: transparent !important;
        background-color: black !important;
        transition: background-color 0.5s, color 0.5s;
    }
    img, video {
        filter: brightness(0) !important;
        transition: filter 0.5s;
    }
    a, sup, body *:hover {
        color: initial !important;
        background-color: white !important;
    }
    img:hover, video:hover {
        filter: none !important;
    }
`;
document.head.appendChild(style);

let scrollFactor = 1, lastUpdate = 0;
const FPS = 30, scrollMultiplier = 0.98, scrollMin = 0.02;
document.addEventListener('wheel', (event) => {
    const now = Date.now();
    event.preventDefault();
    if (now - lastUpdate >= 1000 / FPS) {
        scrollFactor = Math.max(scrollMin, scrollFactor * scrollMultiplier);
        lastUpdate = now;
    }
    window.scrollBy(0, event.deltaY * scrollFactor);
}, { passive: false });