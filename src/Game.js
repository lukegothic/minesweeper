import React, {Component} from 'react';
import {RandomInt} from './utils';
import Board from './Board';
import {MINE_ID} from './Constants'

class Game extends Component {
    constructor(props) {
        super(props);
        const settings = props.settings;
        const size = settings.w * settings.h;
        let board = new Array(size).fill(0);
        while (board.filter(cell => cell === MINE_ID).length < settings.mines) {
            board[RandomInt(size)] = MINE_ID;
        }
        // TODO: contar las minas que tiene proximas cada bloque
        this.state = {
            board: board.map(mine => ({ "visible": false, "hasMine": mine })),
            size: {
                w: settings.w,
                h: settings.h
            },
            onEndGame: props.onEndGame
        };
    }
    getNeightbours = (id) => {
        let nb = [];
        (id >= this.state.size.w) && nb.push(id - this.state.size.w);
        (id < (this.state.size.w * this.state.size.h) - this.state.size.w) && nb.push(id + this.state.size.w);
        (id % this.state.size.w !== 0) && nb.push(id - 1);
        ((id + 1) % this.state.size.w !== 0) && nb.push(id + 1);
        return nb;
    }
    revealCell = (board, id) => {
        let cell = Object.assign(board[id], {});
        cell.visible = true;
        board[id] = cell;
        // TODO: determinar cuando hay que revelar ayudas
        this.getNeightbours(id).filter(nid => !board[nid].visible).forEach(nid => this.revealCell(board, nid));
    }
    handleCellClick = (id) => {
        let board = this.state.board.slice();
        this.revealCell(board, id);
        this.setState({
            board: board
        });
        if (this.win()) {
            this.state.onEndGame(true);
        } else if (this.lose()) {
            this.state.onEndGame(false);
        }
    }
    win() {
        return !this.state.board.find(cell => cell.visible && !cell.hasMine);
    }
    lose() {
        return this.state.board.find(cell => cell.visible && cell.hasMine);
    }
    restart() {
        
    }
    render() {
        return (
            <div className="scene game">
                <Board board={this.state.board} size={this.state.size} onCellClick={this.handleCellClick} />
                <p><button onClick={this.restart}>Restart</button></p>
            </div>
        )
    }
}
export default Game;