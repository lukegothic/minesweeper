import React from 'react';
import {Range} from './utils';
import Cell from './Cell';
const Board = ({ board, size, onCellClick }) => {
    return (
        <div>
            {Range(0, size.h - 1).map((x) => {
                return (
                    <div key={`row${x}`}>
                        {Range(0, size.w - 1).map((y) => {
                            let id = x * size.w + y;
                            return <Cell data={board[id]} onCellClick={() => onCellClick(id)} key={`cell${id}`} />
                        })}
                    </div>
                )})
            }
        </div>
    )
}
export default Board