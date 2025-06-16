class PuzzleGame {
    constructor() {
        this.board = [];
        this.moves = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.isPlaying = false;
        this.size = 3;
        
        this.boardElement = document.getElementById('puzzle-board');
        this.movesElement = document.getElementById('moves');
        this.timerElement = document.getElementById('timer');
        this.messageElement = document.getElementById('message');
        this.shuffleButton = document.getElementById('shuffle-btn');
        this.solveButton = document.getElementById('solve-btn');

        this.initializeBoard();
        this.setupEventListeners();
    }

    initializeBoard() {
        this.board = Array.from({ length: this.size * this.size - 1 }, (_, i) => i + 1);
        this.board.push(null); // Empty tile
        this.renderBoard();
    }

    setupEventListeners() {
        this.shuffleButton.addEventListener('click', () => this.startNewGame());
        this.solveButton.addEventListener('click', () => this.solvePuzzle());
    }

    startNewGame() {
        this.moves = 0;
        this.timer = 0;
        this.isPlaying = true;
        this.updateMoves();
        this.startTimer();
        this.shuffleBoard();
        this.messageElement.textContent = '';
    }

    shuffleBoard() {
        for (let i = this.board.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.board[i], this.board[j]] = [this.board[j], this.board[i]];
        }
        // Ensure the puzzle is solvable
        if (!this.isSolvable()) {
            this.shuffleBoard();
        }
        this.renderBoard();
    }

    isSolvable() {
        let inversions = 0;
        const boardWithoutEmpty = this.board.filter(tile => tile !== null);
        
        for (let i = 0; i < boardWithoutEmpty.length - 1; i++) {
            for (let j = i + 1; j < boardWithoutEmpty.length; j++) {
                if (boardWithoutEmpty[i] > boardWithoutEmpty[j]) {
                    inversions++;
                }
            }
        }
        
        return inversions % 2 === 0;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        this.board.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = `tile ${tile === null ? 'empty' : ''}`;
            tileElement.textContent = tile;
            tileElement.dataset.index = index;
            
            if (tile !== null) {
                tileElement.addEventListener('click', () => this.moveTile(index));
            }
            
            this.boardElement.appendChild(tileElement);
        });
    }

    moveTile(index) {
        if (!this.isPlaying) return;
        
        const emptyIndex = this.board.indexOf(null);
        const row = Math.floor(index / this.size);
        const emptyRow = Math.floor(emptyIndex / this.size);
        const col = index % this.size;
        const emptyCol = emptyIndex % this.size;

        if ((row === emptyRow && Math.abs(col - emptyCol) === 1) ||
            (col === emptyCol && Math.abs(row - emptyRow) === 1)) {
            [this.board[index], this.board[emptyIndex]] = [this.board[emptyIndex], this.board[index]];
            this.moves++;
            this.updateMoves();
            this.renderBoard();
            this.checkWin();
        }
    }

    updateMoves() {
        this.movesElement.textContent = this.moves;
    }

    startTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.timerInterval = setInterval(() => {
            this.timer++;
            const minutes = Math.floor(this.timer / 60);
            const seconds = this.timer % 60;
            this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    checkWin() {
        const isWin = this.board.every((tile, index) => {
            if (index === this.board.length - 1) return tile === null;
            return tile === index + 1;
        });

        if (isWin) {
            this.isPlaying = false;
            clearInterval(this.timerInterval);
            this.messageElement.textContent = `🎉 Congratulations! You solved it in ${this.moves} moves and ${this.timerElement.textContent}!`;
            this.messageElement.classList.add('celebrate');
            setTimeout(() => this.messageElement.classList.remove('celebrate'), 500);
        }
    }

    solvePuzzle() {
        if (!this.isPlaying) return;
        
        this.board = Array.from({ length: this.size * this.size - 1 }, (_, i) => i + 1);
        this.board.push(null);
        this.renderBoard();
        this.checkWin();
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new PuzzleGame();
}); 