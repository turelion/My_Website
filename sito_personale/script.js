/* ==========================================================================
   LOGICA DEL LIVE TERMINAL
   ========================================================================== */

// 1. Database dei comandi (Cosa risponde il terminale a seconda di cosa viene digitato)
const commandDatabase = {
    help: `Comandi disponibili:
  <span class="cyan-text">about</span>     - Estrae il profilo e la bio del developer.
  <span class="cyan-text">ai</span>        - Log sull'integrazione di Intelligenza Artificiale nei progetti.
  <span class="cyan-text">startup</span>   - Dettagli sull'esperienza come Data Analyst.
  <span class="cyan-text">clear</span>     - Pulisce la console.`,
    
    about: `<span class="success-text">[LOADING PROFILE]...</span>
Nome: Salvatore Leone
Ruolo Target: Full Stack Developer / Backend Specialist
Focus: Ingegnerizzazione dei processi, architetture scalabili, pulizia del codice.
Attitudine: Autonomia decisionale, forte orientamento al problem solving pratico derivato da background industriale.`,
    
    ai: `<span class="success-text">[DEVOPS LOG - AI_INTEGRATION]</span>
> Tecnologia applicata: Google Vision API integrata in ambiente Laravel.
> Task eseguiti: Sviluppo del modulo di moderazione dei contenuti. Controllo idoneità delle immagini caricate dagli utenti, oscuramento automatico dei volti (privacy) e generazione di report contestuali in formato JSON.
> Filosofia: L'IA è un moltiplicatore di potenziale. Va governata, assecondata e integrata nel codice per automatizzare compiti complessi a vantaggio del business.`,
    
    startup: `<span class="success-text">[ENVIRONMENT VARIABLES - STARTUP]</span>
> Ruolo: Data Analyst / Stage post-laurea.
> Stack utilizzato: SQL per modellazione e query, Python (fondamenti) per scripting, PowerBI per visualizzazione metriche di business.
> Mindset acquisito: Lavorare in contesti agili ad alta dinamicità. Capacità di interpretare le richieste dei dati per trasformarle in logica software backend.`
};

// 2. Selezione degli elementi DOM
const terminalInput = document.getElementById('terminal-input');
const logDisplay = document.getElementById('log-display');
const shortcutButtons = document.querySelectorAll('.shortcut-btn');

// 3. Funzione per eseguire un comando
function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    
    // Creiamo la riga del prompt che simula la digitazione effettuata
    const commandLine = document.createElement('p');
    commandLine.className = 'output-line';
    commandLine.innerHTML = `<span class="prompt-text">salvatoreleone@core:~$</span> ${cleanCmd}`;
    logDisplay.appendChild(commandLine);

    if (cleanCmd === '') {
        // Se l'utente preme invio a vuoto, non fare nulla
    } else if (cleanCmd === 'clear') {
        // Svuota il display
        logDisplay.innerHTML = '';
    } else if (commandDatabase[cleanCmd]) {
        // Se il comando esiste nel database, stampa la risposta
        const responseLine = document.createElement('p');
        responseLine.className = 'output-line muted-text';
        responseLine.innerHTML = commandDatabase[cleanCmd].replace(/\n/g, '<br>');
        logDisplay.appendChild(responseLine);
    } else {
        // Comando sconosciuto
        const errorLine = document.createElement('p');
        errorLine.className = 'output-line';
        errorLine.innerHTML = `Command not found: <span class="cyan-text">${cleanCmd}</span>. Type <span class="cyan-text">help</span> to see available commands.`;
        logDisplay.appendChild(errorLine);
    }

    // Effettua lo scroll automatico del terminale verso il basso
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// 4. Event Listener per la digitazione da tastiera (Tasto Invio)
terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = this.value;
        executeCommand(command);
        this.value = ''; // Svuota l'input dopo l'invio
    }
});

// 5. Event Listener per i pulsanti di scelta rapida (Shortcuts)
shortcutButtons.forEach(button => {
    button.addEventListener('click', function() {
        const command = this.getAttribute('data-cmd');
        executeCommand(command);
    });
});

/* ==========================================================================
   LOGICA HUD RPG (LIVELLO AUTOMATICO) & MENU MOBILE
   ========================================================================== */

// 1. SISTEMA DI CALCOLO RIGENERAZIONE LIVELLO (AUTOMATICO)
function updateRPGStatus() {
    // MODIFICA QUI: Inserisci la tua data di nascita reale (AAAA, MM [0-11], GG)
    // Nota: i mesi in JS partono da 0 (0 = Gennaio, 5 = Giugno, 6 = Luglio, ecc.)
    const birthDate = new Date(1992, 5, 11); 
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Controllo se il compleanno di quest'anno è già passato
    let lastBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        lastBirthday.setFullYear(today.getFullYear() - 1);
    }

    // Calcolo del prossimo compleanno
    let nextBirthday = new Date(lastBirthday.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());

    // Calcolo della percentuale di XP in base ai giorni trascorsi dall'ultimo compleanno
    const totalDaysInYear = (nextBirthday - lastBirthday) / (1000 * 60 * 60 * 24);
    const daysPassed = (today - lastBirthday) / (1000 * 60 * 60 * 24);
    const xpPercentage = Math.floor((daysPassed / totalDaysInYear) * 100);

    // Iniettiamo i dati calcolati nel DOM della navbar
    document.getElementById('rpg-level').innerText = age;
    document.getElementById('rpg-xp-percent').innerText = xpPercentage;
    document.getElementById('rpg-xp-bar').style.width = `${xpPercentage}%`;
}

// Eseguiamo il calcolo all'avvio
updateRPGStatus();


// 2. CLONAZIONE HUD PER MOBILE (Dentro l'overlay)
const hudHorizontal = document.querySelector('.rpg-hud-horizontal');
const mobileHudDisplay = document.querySelector('.mobile-hud-display');

if (hudHorizontal && mobileHudDisplay) {
    const clonedHud = hudHorizontal.cloneNode(true);
    mobileHudDisplay.appendChild(clonedHud);
}

// 3. GESTIONE OVERLAY MENU
const menuTrigger = document.querySelector('.menu-trigger');
const gameOverlay = document.querySelector('.game-overlay-menu');
const overlayLinks = document.querySelectorAll('.overlay-link');
const menuText = document.querySelector('.menu-text');

menuTrigger.addEventListener('click', () => {
    gameOverlay.classList.toggle('active');
    const isActive = gameOverlay.classList.contains('active');
    
    // Cambia il testo da MENU a CLOSE stile gioco
    menuText.innerText = isActive ? 'CLOSE' : 'MENU';
});

// Chiude l'overlay al click su un link
overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
        gameOverlay.classList.remove('active');
        menuText.innerText = 'MENU';
    });
});