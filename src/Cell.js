import React from 'react';
import {MINE_ID} from './Constants'

const Cell = ({ data, onCellClick }) => {
    return data.visible ? <span>{data.hasMine === MINE_ID ? "X" : data.hasMine}</span> : <button onClick={onCellClick}>&nbsp;</button>
}
export default Cell