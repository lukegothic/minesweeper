import React, {Component} from 'react';
import {RandomInt} from './utils';
import Board from './Board';
import {MINE_ID} from './Constants';
import './Game.css';
import End from './End';

class Game extends Component {
    constructor(props) {
        super(props);
        const sizeObj = {
            w: props.settings.w,
            h: props.settings.h
        };
        this.state = {
            board: this.generateNewBoard(sizeObj, props.settings.mines),
            size: sizeObj,
            mines: props.settings.mines,
            onEndGame: props.onEndGame,
            hasGameEnded: null
        };
    }
    generateNewBoard = (size = this.state.size, mines = this.state.mines) => {
        const totalSize = size.w * size.h;
        let board = new Array(totalSize).fill(0);
        while (board.filter(cell => cell === MINE_ID).length < mines) {
            board[RandomInt(totalSize)] = MINE_ID;
        }
        return board.map((cell, id) => ({ "visible": false, "hasMine": cell === MINE_ID ? cell : this.getNeightbours(id, size).filter(nid => board[nid] === MINE_ID).length }));
    }
    getNeightbours = (id, size, andmyself = false) => {
        let nb = [];
        let rows = [id - size.w, id, id + size.w].filter(row => (row >= 0) && (row < size.h * size.w));
        let rown = Math.floor(id / size.w);
        let cols = [-1, 0, 1].filter(col => {
            return Math.floor((id + col) / size.w) === rown
        });
        rows.forEach(row => {
            cols.forEach(col => {
                let r = row + col;
                (andmyself || r !== id) && nb.push(r);
            });
        });
        return nb;
    }
    revealCell = (board, id) => {
        console.log(id);
        let cell = Object.assign(board[id], {});
        cell.visible = true;
        board[id] = cell;
        (cell.hasMine === 0) && this.getNeightbours(id, this.state.size).filter(nid => !board[nid].visible && !(board[nid].hasMine === MINE_ID)).forEach(nid => this.revealCell(board, nid));
    }
    handleCellClick = (id) => {
        let board = this.state.board.slice();
        this.revealCell(board, id);
        this.setState({
            board: board
        });
        if (this.win()) {
            this.setState({
                hasGameEnded: true
            }); 
        } else if (this.lose()) {
            this.setState({
                hasGameEnded: false
            }); 
        }       
    }
    win() {
        return !this.state.board.find(cell => !cell.visible && !(cell.hasMine === MINE_ID));
    }
    lose() {
        return this.state.board.find(cell => cell.visible && (cell.hasMine === MINE_ID));
    }
    restart = () => {
        this.setState({
            board: this.generateNewBoard(),
            hasGameEnded: null
        });
    }
    render() {
        return (
            <div className="scene game">
                <Board board={this.state.board} size={this.state.size} onCellClick={(this.state.hasGameEnded === null) && this.handleCellClick} />
                <p><button onClick={this.restart}>Restart</button></p>
                {(this.state.hasGameEnded !== null) && <End isWinner={this.state.hasGameEnded} />}
            </div>
        )
    }
}
export default Game;