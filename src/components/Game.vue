<script setup>
import Board from "./Board.vue";
import {store} from "../store";

function make_empty_board(){
    let board = [];
        for (let i = 0; i < store.cell_rows; i++) {
            board[i] = [];
            for (let j = 0; j < store.cell_cols; j++) {
                board[i][j] = false;
            }
        }
        return board;
}

function make_cells(){
    let cells = [];
        for (let i = 0; i < store.cell_rows; i++) {
            for (let j = 0; j < store.cell_cols; j++) {
                if (store.board[i][j] === true) {
                    let x = j;
                    let y = i;
                    cells.push({ x, y });
                }
            }
        }
        return cells;
}

function get_ele_offset(e) {    
    const rect=e.target.getBoundingClientRect();

    const doc = document.documentElement;

    return {
        x: (rect.left + window.pageXOffset) - doc.clientLeft,
        y: (rect.top + window.pageYOffset) - doc.clientTop,
    };
}

function handle_click(e) {
        const ele_offset = get_ele_offset(e);

        const x_offset = e.clientX - ele_offset.x;
        const y_offset = e.clientY - ele_offset.y;

        const x = Math.floor(x_offset / store.cell_size);
        const y = Math.floor(y_offset / store.cell_size);
  
        if (x >= 0 && x <= store.cell_cols && y >= 0 && y <= store.cell_rows) {
            store.board[y][x] = !store.board[y][x];
        }

        store.cells=make_cells();
        console.log([x,y]);

        console.log(store.cells);
}


store.board=make_empty_board();
store.cells=make_cells();

</script>

<template>
    <div>
        <Board @board_click="handle_click" :cells="store.cells"/>
    </div>
</template>

<style>
</style>