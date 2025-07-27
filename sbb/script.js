document.addEventListener('DOMContentLoaded', () => {
    console.log('Mahjong game loaded');

    const suits = ['char', 'pin', 'sou'];
    const honors = ['wind', 'dragon'];
    const terminals = [1, 9];
    const tileImages = {}; // For later use with image-based tiles

    let wall = [];
    let players = {
        player: { hand: [], discards: [], openMelds: [] },
        opponent1: { hand: [], discards: [], openMelds: [] },
        opponent2: { hand: [], discards: [], openMelds: [] },
        opponent3: { hand: [], discards: [], openMelds: [] },
    };

    function createTile(suit, value) {
        return { suit, value };
    }

    function getTileUnicode(tile) {
        let suitOffset = 0;
        if (tile.suit === 'pin') suitOffset = 1;
        if (tile.suit === 'sou') suitOffset = 2;
        if (tile.suit === 'wind') suitOffset = 3;
        if (tile.suit === 'dragon') suitOffset = 4;

        if (suitOffset <= 2) { // Man, Pin, Sou
            return String.fromCodePoint(0x1F007 + suitOffset * 9 + (tile.value - 1));
        } else if (suitOffset === 3) { // Winds
            return String.fromCodePoint(0x1F000 + (tile.value - 1));
        } else { // Dragons
            return String.fromCodePoint(0x1F004 + (tile.value - 1));
        }
    }

    function createTileElement(tile) {
        const tileEl = document.createElement('div');
        tileEl.classList.add('tile');
        tileEl.textContent = getTileUnicode(tile);
        tileEl.dataset.suit = tile.suit;
        tileEl.dataset.value = tile.value;
        return tileEl;
    }

    function initializeGame() {
        // 1. Create all 136 tiles
        wall = [];
        for (const suit of suits) {
            for (let i = 1; i <= 9; i++) {
                for (let j = 0; j < 4; j++) { // 4 of each numbered tile
                    wall.push(createTile(suit, i));
                }
            }
        }
        for (let i = 1; i <= 4; i++) { // Winds
            for (let j = 0; j < 4; j++) wall.push(createTile('wind', i));
        }
        for (let i = 1; i <= 3; i++) { // Dragons
            for (let j = 0; j < 4; j++) wall.push(createTile('dragon', i));
        }

        // 2. Shuffle the wall
        for (let i = wall.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wall[i], wall[j]] = [wall[j], wall[i]];
        }

        // 3. Deal initial hands (13 tiles each)
        for (let i = 0; i < 13; i++) {
            for (const playerName in players) {
                players[playerName].hand.push(wall.pop());
            }
        }

        // 4. Sort player's hand
        sortHand(players.player.hand);

        // 5. Render the game state
        renderAll();
        
        console.log('Wall remaining:', wall.length);
        console.log('Player hand:', players.player.hand);
    }

    function sortHand(hand) {
        const suitOrder = { 'char': 1, 'pin': 2, 'sou': 3, 'wind': 4, 'dragon': 5 };
        hand.sort((a, b) => {
            if (suitOrder[a.suit] !== suitOrder[b.suit]) {
                return suitOrder[a.suit] - suitOrder[b.suit];
            }
            return a.value - b.value;
        });
    }

    function renderAll() {
        renderPlayerHand();
        renderOpponentHands();
        // renderDiscards(); // To be implemented
        // updateGameInfo(); // To be implemented
    }

    function renderPlayerHand() {
        const playerHandEl = document.querySelector('#player .hand');
        playerHandEl.innerHTML = '';
        for (const tile of players.player.hand) {
            const tileEl = createTileElement(tile);
            playerHandEl.appendChild(tileEl);
        }
    }

    function renderOpponentHands() {
        for (let i = 1; i <= 3; i++) {
            const opponentHandEl = document.querySelector(`#opponent-${i} .hand`);
            opponentHandEl.innerHTML = '';
            for (let j = 0; j < players[`opponent${i}`].hand.length; j++) {
                const tileEl = document.createElement('div');
                tileEl.classList.add('tile', 'opponent-tile');
                if (i !== 2) { // Left and Right opponents
                    tileEl.classList.add(`opponent-${i}`);
                }
                opponentHandEl.appendChild(tileEl);
            }
        }
    }

    initializeGame();
});

