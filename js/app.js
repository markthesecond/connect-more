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
    canvas: undefined,
    choices: [
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
        // triggers the transitions on main
        this.mainArea.classList.add('playing');
        // window.setTimeout(this.createCanvas.bind(app), 3000);
        this.showChoices();
    },
    createCanvas() {
        // clear the space where the canvas will be
        while (this.playArea.lastChild) {
            this.playArea.removeChild(this.playArea.lastChild);
        }
        this.canvas = document.createElement('canvas');
        console.log('canvas made: ' + this.canvas);
        this.canvas.setAttribute('width', (this.mainArea.scrollWidth * 0.95) + 'px');
        this.canvas.setAttribute('height', (this.mainArea.scrollWidth * 0.95) + 'px');
        console.log('canvas.attributes' + this.canvas.attributes);
        this.playArea.append(this.canvas);
    },
    showChoices() {
        for (let i = 0; i < this.choices.length; i++) {
            const option = document.createElement('button');
            option.textContent = this.choices[i];
            option.classList.add('game-choice');
            option.setAttribute('id',this.choices[i].split(' ').join('-').toLowerCase());
            this.playArea.appendChild(option);
        }
    }
}

app.nameForm.addEventListener('submit', e => {
    e.preventDefault();
    app.setPlayerName();
})

app.playArea.addEventListener('click', e => {
    switch (e.target.getAttribute('id')) {
        case 'connection-game':
            console.log('jacked in');
            app.game = new ConnectionGame(app.players[0],app.players[1]);
            break;
        default:
            console.log('nevermind');
    }
})