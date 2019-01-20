import React from 'react';
import {Range} from './utils';
import Cell from './Cell';
const Board = ({ board, size, onCellClick }) => {
    const cssSize = {
        h: size.h * 40,
        w: size.w * 40
    };
    return (
        <div className="board" style={{ "height": cssSize.h, "width": cssSize.w }}>
            {Range(0, size.h - 1).map((x) => {
                return (
                    <div className="row" key={`row${x}`} style={{ "height": cssSize.h / size.h }}>
                        {Range(0, size.w - 1).map((y) => {
                            let id = x * size.w + y;
                            return <Cell cellW={cssSize.w / size.w} data={board[id]} onCellClick={onCellClick ? (() => onCellClick(id)): undefined } key={`cell${id}`} />
                        })}
                    </div>
                )})
            }
        </div>
    )
}
export default Board