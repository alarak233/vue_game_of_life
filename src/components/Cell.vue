<script setup>
import {ref} from 'vue';
import {store} from '../store.js';

const props=defineProps({
    x:Number,
    y:Number,
});

const cell_left=ref(`${store.cell_size*props.x+1}px`);
const cell_top=ref(`${store.cell_size*props.y+1}px`);
const cell_size=ref(`${store.cell_size-1}px`)

</script>

<template>
    <div class="Cell"
        :style="{
            'left':cell_left,
            'top':cell_top,
            'width':cell_size,
            'height':cell_size,
    }">
    </div>
</template>

<style>
.Cell {
    background-color: white;
    position: absolute;
}
</style>