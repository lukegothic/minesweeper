import React from 'react';
import {MINE_ID} from './Constants'
const DEBUG = false;
const Cell = ({ data, cellW, onCellClick }) => {
    return (<div style={{"width": cellW}} className={`cell ${data.visible ? "revealed" : "hidden"}`} onClick={onCellClick}>{ data.visible && (data.hasMine === MINE_ID ? ":(" : (data.hasMine !== 0 ? data.hasMine : ""))}</div>) 
}
export default Cell