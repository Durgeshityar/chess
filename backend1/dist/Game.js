"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            paylaod: {
                color: 'white',
            },
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            paylaod: {
                color: 'black',
            },
        }));
    }
    makeMove(socket, move) {
        console.log(move);
        // validation (zod) -> is it users move and is move valid
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            console.log('inside make move');
            while (!this.board.isGameOver()) {
                this.board.move(move);
            }
            console.log('move succeded');
        }
        catch (e) {
            console.log(e);
            return;
        }
        // update board -> push the game -> done by chess js
        // check if game is over
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white',
                },
            }));
            this.player2.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white',
                },
            }));
            return;
        }
        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: message_1.MOVE,
                payload: move,
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: message_1.MOVE,
                payload: move,
            }));
        }
        this.moveCount++;
        // send updated board to both the players
    }
}
exports.Game = Game;
