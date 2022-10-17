import {reactive} from 'vue';

export const store=reactive({
    cell_rows:40,
    cell_cols:60,
    cell_size:20,
    board:[],
    cells:[],
    is_running:false,
    percentage:0.2,
    interval:100,
});