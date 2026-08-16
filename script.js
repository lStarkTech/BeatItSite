const audio = document.getElementById('audio');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const vinyl = document.getElementById('vinyl');
    const progress = document.getElementById('progress');
    const prevBtn = document.getElementById('prevBtn');

    // Icone SVG per Play e Pausa
    const playSVG = '<path d="M8 5v14l11-7z"/>';
    const pauseSVG = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';

    // Gestione Play / Pausa
    function togglePlay() {
      if (audio.paused) {
        audio.play().then(() => {
          playIcon.innerHTML = pauseSVG;
          vinyl.style.animationPlayState = 'running'; // Fa partire/riprendere la rotazione
        }).catch(err => {
          alert("Assicurati di aver inserito un file audio 'beat-it.mp3' valido nella cartella!");
        });
      } else {
        audio.pause();
        playIcon.innerHTML = playSVG;
        vinyl.style.animationPlayState = 'paused'; // Mette in pausa la rotazione esattamente dove si trova
      }
    }

    playBtn.addEventListener('click', togglePlay);

    // Aggiornamento barra di riproduzione durante la canzone
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;
      }
    });

    // Possibilità di trascinare la barra di riproduzione
    progress.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
      }
    });

    // Quando la canzone finisce, resetta tutto
    audio.addEventListener('ended', () => {
      playIcon.innerHTML = playSVG;
      vinyl.style.animationPlayState = 'paused';
      progress.value = 0;
    });

    // 1. Questo aggiorna la barra mentre la canzone va avanti da sola
    audio.addEventListener('timeupdate', () => {
        // Calcola a che percentuale siamo arrivati
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        
        // Muove il pallino
        progress.value = progressPercent;
        
        // IL PENNELLO MAGICO: dipinge la barra in tempo reale!
        progress.style.background = `linear-gradient(to right, #DA9132 ${progressPercent}%, #f1d589 ${progressPercent}%)`;
    });

    // 2. Questo aggiorna il colore anche quando sei TU a trascinare il pallino col dito
    progress.addEventListener('input', (e) => {
        // Calcola il punto in cui hai trascinato il pallino
        const seekTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = seekTime;
        
        // Dipinge la barra mentre la trascini
        progress.style.background = `linear-gradient(to right, #DA9132 ${e.target.value}%, #f1d589 ${e.target.value}%)`;
    });

    // Tasto "Indietro" per riavviare il brano
    prevBtn.addEventListener('click', () => {
      audio.currentTime = 0;
    });