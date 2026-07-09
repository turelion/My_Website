/* ==========================================================================
   1. LOGIC SYSTEM: LIVE TERMINAL INTERFACE
   ========================================================================== */

// Database dei comandi logici: Stringhe di risposta mappate per la shell del terminale
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
> Ruolo: Data Analyst / Stage .
> Stack utilizzato: SQL per modellazione e query, Python (fondamenti) per scripting, Excel per data cleaning e PowerBI per visualizzazione metriche di business.
> Mindset acquisito: Lavorare in contesti agili ad alta dinamicità. Capacità di interpretare le richieste dei dati per trasformarle in logica software backend.`
};

// Selezione dei nodi DOM legati alla shell interattiva
const terminalInput = document.getElementById('terminal-input');
const logDisplay = document.getElementById('log-display');
const shortcutButtons = document.querySelectorAll('.shortcut-btn');

/**
 * Funzione di esecuzione comandi: Processa la stringa inserita dall'utente,
 * gestisce lo svuotamento o la stampa dei log formattando i ritorni a capo.
 */
function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();

    // Generazione del prompt grafico per simulare la riga di comando bash
    const commandLine = document.createElement('p');
    commandLine.className = 'output-line';
    commandLine.innerHTML = `<span class="prompt-text">sl@core:~$</span> ${cleanCmd}`;
    logDisplay.appendChild(commandLine);

    if (cleanCmd === '') {
        // Blocco preventivo: se l'input è vuoto non eseguiamo operazioni
    } else if (cleanCmd === 'clear') {
        // Svuotamento immediato della shell
        logDisplay.innerHTML = '';
    } else if (commandDatabase[cleanCmd]) {
        // Output del comando valido recuperato dal database e formattato con i tag <br>
        const responseLine = document.createElement('p');
        responseLine.className = 'output-line muted-text';
        responseLine.innerHTML = commandDatabase[cleanCmd].replace(/\n/g, '<br>');
        logDisplay.appendChild(responseLine);
    } else {
        // Fallback di errore in caso di comando sconosciuto o non mappato
        const errorLine = document.createElement('p');
        errorLine.className = 'output-line';
        errorLine.innerHTML = `Command not found: <span class="cyan-text">${cleanCmd}</span>. Type <span class="cyan-text">help</span> to see available commands.`;
        logDisplay.appendChild(errorLine);
    }

    // Auto-scroll reattivo agganciato all'altezza massima per mantenere la linea di digitazione visibile
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}

// Event Listener per intercettare il submit dell'input tramite la tastiera (Tasto Invio)
if (terminalInput) {
    terminalInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const command = this.value;
            executeCommand(command);
            this.value = ''; // Reset istantaneo del campo input dopo l'invio
        }
    });
}

// Event Listener per mappare i click sui pulsanti di scelta rapida sottostanti alla finestra
shortcutButtons.forEach(button => {
    button.addEventListener('click', function () {
        const command = this.getAttribute('data-cmd');
        executeCommand(command);
    });
});


/* ==========================================================================
   2. INTERFACE LAYER: RPG HUD STATUS & OVERLAY NAVIGATION
   ========================================================================== */

/**
 * Sistema di gestione dell'HUD: Calcola i parametri biometrici in tempo reale
 * e clona la struttura desktop già compilata per l'interfaccia responsive mobile.
 */
function initRPGAndHUD() {
    // 1. CALCOLO MATEMATICO DEI DATI (Data di nascita: 11 Giugno 1992)
    const birthDate = new Date(1992, 5, 11);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    // Correzione anagrafica: se il compleanno non è ancora passato nell'anno corrente, decrementiamo l'età
    if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    } else {
        age--;
    }

    // Individuazione dell'ultimo compleanno per calcolare la linea temporale pulita
    let lastBirthday = new Date(nextBirthday.getFullYear() - 1, birthDate.getMonth(), birthDate.getDate());

    // Algoritmo di calcolo frazionale dei giorni per determinare la percentuale di avanzamento XP
    const totalDaysInYear = (nextBirthday - lastBirthday) / (1000 * 60 * 60 * 24);
    const daysPassed = (today - lastBirthday) / (1000 * 60 * 60 * 24);
    const xpPercentage = Math.floor((daysPassed / totalDaysInYear) * 100);

    // 2. INIEZIONE DEI VALORI NEI PARAMETRI DESKTOP ORIGINALI
    const levelEl = document.getElementById('rpg-level');
    const xpPercentEl = document.getElementById('rpg-xp-percent');
    const xpBarEl = document.getElementById('rpg-xp-bar');

    if (levelEl) levelEl.innerText = age;
    if (xpPercentEl) xpPercentEl.innerText = xpPercentage;
    if (xpBarEl) xpBarEl.style.width = `${xpPercentage}%`;

    // 3. CLONAZIONE STRUTTURALE POST-COMPILAZIONE (Risolve il bug delle statistiche vuote su mobile)
    const hudHorizontal = document.querySelector('.rpg-hud-horizontal');
    const mobileHudDisplay = document.querySelector('.mobile-hud-display');

    if (hudHorizontal && mobileHudDisplay) {
        mobileHudDisplay.innerHTML = ''; // Pulizia preventiva dei nodi per evitare duplicazioni
        const clonedHud = hudHorizontal.cloneNode(true);
        
        // Sanificazione del DOM: rimuoviamo gli ID dal blocco mobile per evitare conflitti di elementi duplicati
        clonedHud.removeAttribute('id');
        clonedHud.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
        
        mobileHudDisplay.appendChild(clonedHud);
    }
}

// Inizializzazione sicura dell'interfaccia solo dopo il completo caricamento del DOM
document.addEventListener('DOMContentLoaded', initRPGAndHUD);


// 4. GESTIONE OVERLAY MENU (OPEN / CLOSE CONTROLS)
const menuTrigger = document.querySelector('.menu-trigger');
const gameOverlay = document.querySelector('.game-overlay-menu');
const overlayLinks = document.querySelectorAll('.overlay-link');
const menuText = document.querySelector('.menu-text');

if (menuTrigger && gameOverlay) {
    menuTrigger.addEventListener('click', () => {
        gameOverlay.classList.toggle('active');
        const isActive = gameOverlay.classList.contains('active');

        // label di controllo in stile HUD di gioco
        if (menuText) {
            menuText.innerText = isActive ? 'CLOSE' : 'MENU';
        }

        // Freeze protettivo dello sfondo per evitare lo scrolling della pagina principale sotto l'overlay attivo
        if (isActive) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    });
}

// Chiusura automatica dell'overlay al click su uno qualsiasi dei link di navigazione interna
overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (gameOverlay) gameOverlay.classList.remove('active');
        document.body.classList.remove('menu-open'); // Sblocco dello scorrimento del body
        if (menuText) menuText.innerText = 'MENU';
    });
});