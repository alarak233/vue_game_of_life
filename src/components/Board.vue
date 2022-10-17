<script setup>
import {ref,computed} from 'vue'
import {store} from '../store.js';
import Cell from './Cell.vue';

const emit=defineEmits(['board_click']);

const board_width=ref(`${store.cell_size*store.cell_cols}px`);
const board_height=ref(`${store.cell_size*store.cell_rows}px`);
const board_bc_size=ref(`${store.cell_size}px ${store.cell_size}px`);

//console.log(store.cells);

const computed_cells=computed(()=>{
    return store.cells;
});

function handle_click(e){
    emit('board_click',e);
}
</script>

<template>
    <div class="Board" 
        :style="{
            'width':board_width,
            'height':board_height,
            'backgroundSize':board_bc_size,
        }"
        @click="handle_click"
    >
        <Cell v-for="cell in computed_cells" :x=cell.x :y=cell.y :key="cell.x*100+cell.y"/>
    </div>
</template>

<style>
.Board {
    position: relative;
    margin: 0px;
    background-color: black;
    background-image: linear-gradient(#333 1px, transparent 1px), 
        linear-gradient(90deg, #333 1px, transparent 1px);
}
</style>