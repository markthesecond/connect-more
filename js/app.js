/* This file is part of Connect More.

Connect More is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Connect More is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Connect More.  If not, see <https://www.gnu.org/licenses/>. */
const app = {
    players: [],
    nameInput: document.querySelector('#name'),
    nameForm: document.querySelector('form'),
    playArea: document.querySelector('#play-area'),
    nameSpace: document.querySelector('#player-names'),
    mainArea: document.querySelector('main'),
    board: undefined,
    activities: [
        'Connection Game', 'Self Destruct(!)'
    ],
    game: undefined,
    setPlayerName() {
        const newPlayer = new Player(app.nameInput.value);
        console.log(newPlayer);
        this.players.push(newPlayer);
        // if 2 players have been named
        if (this.players.length === 2) {
            this.transitionToChoosing();
        // else, set page up to get P2's name
        } else {
            this.nameInput.value = '';
            this.nameInput.setAttribute('placeholder', 'Player 2?');
        }
        this.showPlayerName(newPlayer);
    },
    // adds player names to the DOM
    showPlayerName(player) {
        const nameHeader = document.createElement('h4');
        nameHeader.className = 'player-name';
        nameHeader.textContent = player.name;
        this.nameSpace.append(nameHeader);
    },
    // sets DOM up for an activity
    transitionToChoosing() {
        this.nameForm.remove();
        // window.setTimeout(this.createCanvas.bind(app), 3000);
        this.showChoices(this.activities);
    },
    startConnectGame() {
        this.clearArea(this.playArea);
        this.game = new ConnectionGame(this.players[0],this.players[1]);
        this.board = this.game.createGameBoard(this.playArea.scrollWidth);
        this.playArea.appendChild(this.board);
        this.game.populateBoard();
    },
    showChoices(choices) {
        for (let i = 0; i < choices.length; i++) {
            const option = document.createElement('button');
            option.textContent = this.activities[i];
            option.classList.add('game-choice');
            option.setAttribute('id',this.activities[i].split(' ').join('-').toLowerCase());
            this.playArea.appendChild(option);
        }
    },
    clearArea(htmlArea) {
        while (htmlArea.lastChild) {
            htmlArea.removeChild(htmlArea.lastChild);
        }
    },
    takeVotes() {
        // lolololol this is gonna take a while
        this.clearArea(this.playArea);
        this.showChoices([this.players[0].name,this.players[1].name]);
        // triggers the width transition on main
        this.mainArea.classList.add('choosing');
    },
}

app.nameForm.addEventListener('submit', e => {
    e.preventDefault();
    app.setPlayerName();
})

app.playArea.addEventListener('click', e => {
    switch (e.target.getAttribute('id')) {
        case 'connection-game':
            app.startConnectGame();
            break
        default:
    }
})
