<script setup>
import Board from "./Board.vue";
import { store } from "../store";
import { ref } from "vue";

function make_empty_board() {
    let board = [];
    for (let i = 0; i < store.cell_rows; i++) {
        board[i] = [];
        for (let j = 0; j < store.cell_cols; j++) {
            board[i][j] = false;
        }
    }
    return board;
}

function make_cells() {
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
    const rect = e.target.getBoundingClientRect();

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

    store.cells = make_cells();
    //console.log([x,y]);

    console.log(store.cells);
}

function run_once() {
    let new_board = make_empty_board();

    for (let y = 0; y < store.cell_rows; y++) {
        for (let x = 0; x < store.cell_cols; x++) {
            let neighbors = calculate_neighbors(store.board, x, y);
            if (store.board[y][x]) {
                if (neighbors === 2 || neighbors === 3) {
                    new_board[y][x] = true;
                } else {
                    new_board[y][x] = false;
                }
            }
            else {
                if (!store.board[y][x] && neighbors === 3) {
                    new_board[y][x] = true;
                }
            }
        }
    }

    store.board = new_board;
    store.cells = make_cells();
}

function calculate_neighbors(board, x, y) {
    let neighbors = 0;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        let y1 = y + dir[0];
        let x1 = x + dir[1];

        if (x1 >= 0 && x1 < store.cell_cols && y1 >= 0 && y1 < store.cell_rows
            && store.board[y1][x1]) {
            neighbors++;
        }
    }

    return neighbors;
}

function run_it() {
    if (store.interval < 10) store.interval = 10;
    store.is_running = true;
    game_start = setInterval(run_once, store.interval);
    //console.log('start');
}

function stop_it() {
    store.is_running = false;
    //console.log('stop');
    clearInterval(game_start);
}

function random_make() {
    if(store.percentage<0)store.percentage=0;
    if(store.percentage>1)store.percentage=1;

    let num = store.cell_cols * store.cell_rows * store.percentage;
    for (let i = 0; i < num; i++) {
        let x = Math.floor(Math.random() * store.cell_cols);
        let y = Math.floor(Math.random() * store.cell_rows);
        store.board[y][x] = true;
    }

    store.cells = make_cells();
}

function set_board(){
    if(temp_cell_cols.value<5)temp_cell_cols.value=5;
    if(temp_cell_rows.value<5)temp_cell_rows.value=5;

    if(temp_cell_cols.value>70)temp_cell_cols.value=70;
    if(temp_cell_rows.value>70)temp_cell_rows.value=70;

    store.cell_cols=temp_cell_cols.value;
    store.cell_rows=temp_cell_rows.value;
}

let game_start = null;

store.board = make_empty_board();
store.cells = make_cells();

let temp_cell_cols=ref(store.cell_cols);
let temp_cell_rows=ref(store.cell_rows);

</script>

<template>
    <div>
        <Board @board_click="handle_click" />
        <div style="text-align:center;">
            cols:<input type="number" v-model="temp_cell_cols">
            rows:<input type="number" v-model="temp_cell_rows">
            <button @click="set_board">set</button>
        </div>
        <div style="text-align:center;">interval:<input type="number" v-model="store.interval"></div>
        <div style="text-align:center;">
            <button @click="run_once">run once</button>
            <button v-if="store.is_running" @click="stop_it">stop</button>
            <button v-else="store.is_running" @click="run_it">run</button>
        </div>
        <div style="text-align:center;">
            random:<input type="number" v-model="store.percentage">
            <button @click="random_make">random make</button>
        </div>
    </div>
</template>

<style>

</style>